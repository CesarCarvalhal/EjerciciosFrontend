describe('logout_button', () => {
  const randomOkName = "okName" + parseInt(Math.random()*1000);
  const randomKoName = "koName" + parseInt(Math.random()*1000);
  const randomPass = 'a' + parseInt(Math.random()*1000);
  const randomIncorrectPass = 'b' + parseInt(Math.random()*1000);
  const randomToken = 'c' + parseInt(Math.random()*1000);
  const randomSessId = parseInt(Math.random()*1000);

  beforeEach(() => {
    cy.server()
    cy.route('GET', '**/api/v2/dashboards', 'fixture:dashboardsList_v2.json')
    cy.intercept('POST', '**/api/v2/sessions', (req) => {
      const { body } = req
      if (
        body.hasOwnProperty("username") &&
        body.hasOwnProperty("password")
      ) {
        if (
          (body.username == randomOkName) &&
          (body.password == randomPass)
         ) {
            req.reply(200, {created: true, session_id: randomSessId, session_token: randomToken}, [])
          } else if (body.username == randomKoName) {
            req.reply({statusCode: 404, fixture: 'error.json'})
          } else if (body.password == randomIncorrectPass) {
            req.reply({statusCode: 401, fixture: 'error.json'})
          } else {
            // incorrect request according to typed characters
            throw 'Incorrect request'
          }
      } else {
        // incorrect request due to missing parameters
            throw 'Incorrect request'
      }
    }).as("onePost")

    cy.intercept('DELETE', '**/api/v2/sessions/'+randomSessId, (req) => {
      if (req.headers['session-token'] === randomToken) {
        req.reply({statusCode: 200, fixture: 'created.json'})
      } else {
        throw 'Wrong request, it looks'
      }
    }).as("oneDelete")
  })

  it('issue22 - TopBar has correct main message and logged out message initially', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=headerHello]')
    .should('contain.text','¡Hola! Quizá quieras ir a la página principal')

    cy.get('[data-cy=topBar]')
    .find('p[data-cy=loginInfo]')
    .should('contain.text', 'Parece que no estás logueado | Login | Registro')
    .should('not.have.attr', 'hidden')

    cy.get('[data-cy=topBar]')
    .find('p[data-cy=logoutInfo]')
    .should('contain.text', 'Has iniciado sesión. ¿Quieres desloguearte?')
    .should('have.attr', 'hidden')
  })

  it('issue22 - TopBar has correct main message and logged out message after login', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[data-cy=inputUsername]')
    .type(randomOkName)

    cy.get('input[data-cy=inputPassword]')
    .type(randomPass)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait('@onePost')
    .its('request.body')
    .then(($reqBody) => {
      expect($reqBody.username).to.eq(randomOkName)
      expect($reqBody.password).to.eq(randomPass)
    })

    cy.wait(1000)

    cy.get('[data-cy=headerHello]')
    .should('contain.text','¡Hola! Quizá quieras ir a la página principal')

    cy.get('[data-cy=topBar]')
    .find('p[data-cy=loginInfo]')
    .should('contain.text', 'Parece que no estás logueado | Login | Registro')
    .should('have.attr', 'hidden')

    cy.get('[data-cy=topBar]')
    .find('p[data-cy=logoutInfo]')
    .should('contain.text', 'Has iniciado sesión. ¿Quieres desloguearte?')
    .should('not.have.attr', 'hidden')
  })

  it('issue22 - TopBar has correct main message and logged in message when tokenSession is persisted initially', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);
      win.localStorage.setItem('sessionId', randomSessId);
      
      cy.visit('http://localhost:3000/')
      cy.wait(500)
      cy.get('[data-cy=headerHello]')
      .should('contain.text','¡Hola! Quizá quieras ir a la página principal')

      cy.get('[data-cy=topBar]')
      .find('p[data-cy=loginInfo]')
      .should('contain.text', 'Parece que no estás logueado | Login | Registro')
      .should('have.attr', 'hidden')

      cy.get('[data-cy=topBar]')
      .find('p[data-cy=logoutInfo]')
      .should('contain.text', 'Has iniciado sesión. ¿Quieres desloguearte?')
      .should('not.have.attr', 'hidden')
    })
  })

  it('issue22 - TopBar has correct main message and logged in message after logout', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);
      win.localStorage.setItem('sessionId', randomSessId);
      
      cy.visit('http://localhost:3000/')
      cy.wait(500)
      cy.get('[data-cy=topBar]')
      .find('a[href*="#"]')
      .click()

      cy.wait(500)
      
      cy.get('[data-cy=topBar]')
      .find('p[data-cy=loginInfo]')
      .should('contain.text', 'Parece que no estás logueado | Login | Registro')
      .should('not.have.attr', 'hidden')

      cy.get('[data-cy=topBar]')
      .find('p[data-cy=logoutInfo]')
      .should('contain.text', 'Has iniciado sesión. ¿Quieres desloguearte?')
      .should('have.attr', 'hidden')
    })
  })

  it('issue22 - TopBar correctly sends DELETE on logout', () => {
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
      win.localStorage.setItem('sessionToken', randomToken);
      win.localStorage.setItem('sessionId', randomSessId);
      
      cy.visit('http://localhost:3000/')
      cy.wait(500)
      cy.get('[data-cy=topBar]')
      .find('a[href*="#"]')
      .click()

      cy.wait('@oneDelete')
      .its('request')
      .then(($req) => {
        const headers = $req.headers;
        expect(headers['session-token']).to.eq(randomToken);
      });
    })
  })
})
