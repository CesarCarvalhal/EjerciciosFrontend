describe('publish_answer', () => {
  const randomDashboardId = parseInt(Math.random()*1000)
  const randomQuestionId = parseInt(Math.random()*1000)
  const randomAnswer = "this is my answer - " + parseInt(Math.random()*1000);
  const randomToken = "token" + parseInt(Math.random()*1000);

  beforeEach(() => {
    cy.server()
    cy.route('GET', '**/api/v2/dashboards/**/questions/**', 'fixture:question1-d1_v2.json')
    cy.intercept('POST', '**/api/v2/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId +'/answers', (req) => {
      const { body } = req
      if (
        body.hasOwnProperty("description")
      ) {
        if (body.description === randomAnswer) {
          if (req.headers['session-token'] === randomToken) {
            req.reply({statusCode: 201, fixture: 'created.json'})
          } else {
            req.reply({statusCode: 401, fixture: 'error.json'})
          }
      } else {
        // incorrect request due to description not matching what was typed
        throw "Request not correct"
      }
    } else {
      // incorrect request due to missing description
      throw "Request not correct"
    }
    }).as("onePost")
  })

  it('issue20 - Link exists in QuestionDetail and redirects to correct URL', () => {
    const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId
    cy.visit(url)

    cy.get('a[data-cy=publishAnswerLink]')
    .click()

    cy.url()
    .should('be.equal', url + '/newAnswer')
  })

  it('issue20 - answer form has correct submit button, disabled initially if user is logged out. loggedOutWarning displays correct message too', () => {
    const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId+'/newAnswer'
    cy.visit(url)

    cy.get('[data-cy=inputAnswer]')
    .type(randomAnswer)

    cy.get('[data-cy=submitButton]')
    .should('have.attr', 'disabled')

    cy.get('[data-cy=loginWarning]')
    .should('not.have.attr', 'hidden')

    cy.get('[data-cy=loginWarning]')
    .should('have.text', '¿Por qué no haces login?');
  })

  it('issue20 - submit button is enabled and warning paragraph hidden when user is logged in', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);

      const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId+'/newAnswer'
      cy.visit(url)
  
      cy.get('[data-cy=inputAnswer]')
      .type(randomAnswer)
  
      cy.get('[data-cy=submitButton]')
      .should('not.have.attr', 'disabled')
  
      cy.get('[data-cy=loginWarning]')
      .should('have.attr', 'hidden')
  
      cy.get('[data-cy=loginWarning]')
      .should('have.text', '¿Por qué no haces login?');
      })
  })

  it('issue20 - answer form has correct submit button that sends a properly formed POST with Header when user is logged in', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);

      const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId+'/newAnswer'
      cy.visit(url)
  
      cy.get('[data-cy=inputAnswer]')
      .type(randomAnswer)
  
      cy.get('[data-cy=submitButton]')
      .click()

      cy.wait('@onePost')
      .its('request')
      .then(($req) => {
        const reqBody = $req.body;
        const headers = $req.headers;
        expect(reqBody.description).to.eq(randomAnswer);
        expect(headers['session-token']).to.eq(randomToken);
      });
    })
  })

  it('issue20 - new answer screen correctly displays an alert when response is KO', () => {
    const badToken = "badToken"+randomToken;
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', badToken);

      const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId+'/newAnswer'
      cy.visit(url)
  
      cy.get('[data-cy=inputAnswer]')
      .type(randomAnswer)
  
      cy.get('[data-cy=submitButton]')
      .click()

      cy.wait('@onePost')
      .its('request')
      .then(($req) => {
        const reqBody = $req.body;
        const headers = $req.headers;
        expect(reqBody.description).to.eq(randomAnswer);
        expect(headers['session-token']).to.eq(badToken);
      });

      cy.wait(1000)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Se produjo un error')
      })
    })
  })

  it('issue20 - new answer screen correctly redirects when answer is OK', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);

      cy.visit(url+'/newAnswer')
  
      cy.get('[data-cy=inputAnswer]')
      .type(randomAnswer)
  
      cy.get('[data-cy=submitButton]')
      .click()

      cy.wait('@onePost')
      .its('request')
      .then(($req) => {
        const reqBody = $req.body;
        const headers = $req.headers;
        expect(reqBody.description).to.eq(randomAnswer);
        expect(headers['session-token']).to.eq(randomToken);
      });

      cy.wait(1000)

      cy.url()
      .should('be.equal', url)
    })
  })
})
