describe('publish_question', () => {
  const randomDashboardId = parseInt(Math.random()*1000)
  const randomQuestion = "this is my question - " + parseInt(Math.random()*1000);
  const randomQuestionTitle = "title" + parseInt(Math.random()*1000);
  const randomToken = "token" + parseInt(Math.random()*1000);

  beforeEach(() => {
    cy.server()
    cy.route('GET', '**/api/v2/dashboards/**', 'fixture:dashboard1_v2.json')
    cy.intercept('POST', '**/api/v2/dashboards/'+randomDashboardId+'/questions', (req) => {
      const { body } = req
      if (
        body.hasOwnProperty("description") &&
        body.hasOwnProperty("title")
      ) {
        if ((body.description === randomQuestion) && (body.title === randomQuestionTitle)) {
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

  it('issue19 - Link exists in DashboardDetail and redirects to correct URL', () => {
    const url = 'http://localhost:3000/dashboards/'+randomDashboardId;
    cy.visit(url)

    cy.get('a[data-cy=publishQuestionLink]')
    .click()

    cy.url()
    .should('be.equal', url + '/newQuestion')
  })

  it('issue19 - question form has correct submit button, disabled initially if user is logged out. loginWarning displays correct message too', () => {
    const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/newQuestion'
    cy.visit(url)

    cy.get('[data-cy=inputQuestionDescription]')
    .type(randomQuestion)

    cy.get('[data-cy=inputQuestionTitle]')
    .type(randomQuestionTitle)

    cy.get('[data-cy=submitButton]')
    .should('have.attr', 'disabled')

    cy.get('[data-cy=loginWarning]')
    .should('not.have.attr', 'hidden')

    cy.get('[data-cy=loginWarning]')
    .should('have.text', 'Debes loguearte');
  })

  it('issue19 - submit button is enabled and warning paragraph hidden when user is logged in', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);

      const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/newQuestion'
      cy.visit(url)
  
      cy.get('[data-cy=inputQuestionDescription]')
      .type(randomQuestion)
  
      cy.get('[data-cy=inputQuestionTitle]')
      .type(randomQuestionTitle)
  
      cy.get('[data-cy=submitButton]')
      .should('not.have.attr', 'disabled')
  
      cy.get('[data-cy=loginWarning]')
      .should('have.attr', 'hidden')
  
      cy.get('[data-cy=loginWarning]')
      .should('have.text', 'Debes loguearte');
      })
  })

  it('issue19 - question form has correct submit button that sends a properly formed POST with Header when user is logged in', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);

      const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/newQuestion'
      cy.visit(url)
  
      cy.get('[data-cy=inputQuestionDescription]')
      .type(randomQuestion)
  
      cy.get('[data-cy=inputQuestionTitle]')
      .type(randomQuestionTitle)
  
      cy.get('[data-cy=submitButton]')
      .click()

      cy.wait('@onePost')
      .its('request')
      .then(($req) => {
        const reqBody = $req.body;
        const headers = $req.headers;
        expect(reqBody.description).to.eq(randomQuestion);
        expect(reqBody.title).to.eq(randomQuestionTitle)
        expect(headers['session-token']).to.eq(randomToken);
      });
    })
  })

  it('issue19 - new question screen correctly displays an alert when response is KO', () => {
    const badToken = "badToken"+randomToken;
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', badToken);

      const url = 'http://localhost:3000/dashboards/'+randomDashboardId+'/newQuestion'
      cy.visit(url)
  
      cy.get('[data-cy=inputQuestionDescription]')
      .type(randomQuestion)
  
      cy.get('[data-cy=inputQuestionTitle]')
      .type(randomQuestionTitle)
  
      cy.get('[data-cy=submitButton]')
      .click()

      cy.wait('@onePost')
      .its('request')
      .then(($req) => {
        const reqBody = $req.body;
        const headers = $req.headers;
        expect(reqBody.description).to.eq(randomQuestion);
        expect(reqBody.title).to.eq(randomQuestionTitle)
        expect(headers['session-token']).to.eq(badToken);
      });

      cy.wait(1000)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Se produjo un error')
      })
    })
  })

  it('issue19 - new question screen correctly redirects when answer is OK', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    const url = 'http://localhost:3000/dashboards/'+randomDashboardId
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);

      cy.visit(url+'/newQuestion')
  
      cy.get('[data-cy=inputQuestionDescription]')
      .type(randomQuestion)
  
      cy.get('[data-cy=inputQuestionTitle]')
      .type(randomQuestionTitle)
  
      cy.get('[data-cy=submitButton]')
      .click()

      cy.wait('@onePost')
      .its('request')
      .then(($req) => {
        const reqBody = $req.body;
        const headers = $req.headers;
        expect(reqBody.description).to.eq(randomQuestion);
        expect(reqBody.title).to.eq(randomQuestionTitle)
        expect(headers['session-token']).to.eq(randomToken);
      });

      cy.wait(1000)

      cy.url()
      .should('be.equal', url)
    })
  })
})
