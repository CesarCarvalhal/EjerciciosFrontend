describe('a_new_session', () => {
  const randomOkName = "okName" + parseInt(Math.random()*1000);
  const randomKoName = "koName" + parseInt(Math.random()*1000);
  const randomPass = 'a' + parseInt(Math.random()*1000);
  const randomIncorrectPass = 'b' + parseInt(Math.random()*1000);
  const randomToken = 'c' + parseInt(Math.random()*1000);
  const randomSessId = 'd' + parseInt(Math.random()*1000);

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
    cy.visit('http://localhost:3000/login')
  })

  it('issue18 - login response feedback paragraphs exist with correct text, CSS, and initially hidden', () => {
    cy.get('p[data-cy=errorWrongPassword]')
    .should('have.text', 'Contraseña introducida inválida')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.css', 'color', 'rgb(165, 60, 60)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'font-weight', '700')
    .should('have.css', 'font-size', '19px')

    cy.get('p[data-cy=errorUserNotFound]')
    .should('have.text', 'No se ha encontrado una cuenta de usuario para ese nombre')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.css', 'color', 'rgb(165, 60, 60)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'font-weight', '700')
    .should('have.css', 'font-size', '19px')
  })

  it('issue18 - login form sends correct random POST', () => {
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
  })

  it('issue18 - login form correctly navigates', () => {
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
    
    cy.url().should('be.equal', 'http://localhost:3000/')
  })

  it('issue18 - login form correctly persists session token', () => {
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
    cy.wait(500)

    cy.getLocalStorage('sessionToken')
    .then(($sessionToken => {
      expect($sessionToken).equal(randomToken)
    }))
  })

  it('issue18 - login form correctly persists session id', () => {
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
    cy.wait(500)

    cy.getLocalStorage('sessionId')
    .then(($sessionId => {
      expect($sessionId).equal(randomSessId)
    }))
  })

  it('issue18 - after wrong password login, p wrongPassword is NOT hidden', () => {
    cy.get('input[data-cy=inputUsername]')
    .type(randomOkName)

    cy.get('input[data-cy=inputPassword]')
    .type(randomIncorrectPass)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait(1000)

    cy.get('p[data-cy=errorWrongPassword]')
    .should('not.have.attr', 'hidden', 'hidden')
    .should('have.text', 'Contraseña introducida inválida')

    cy.get('p[data-cy=errorUserNotFound]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', 'No se ha encontrado una cuenta de usuario para ese nombre')
  })

  it('issue18 - after not found user login, p userNotFound is NOT hidden', () => {
    cy.get('input[data-cy=inputUsername]')
    .type(randomKoName)

    cy.get('input[data-cy=inputPassword]')
    .type(randomPass)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait(1000)

    cy.get('p[data-cy=errorWrongPassword]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', 'Contraseña introducida inválida')

    cy.get('p[data-cy=errorUserNotFound]')
    .should('not.have.attr', 'hidden', 'hidden')
    .should('have.text', 'No se ha encontrado una cuenta de usuario para ese nombre')
  })
})
