describe('was_register_ok', () => {
  const randomOkName = "okName" + Math.random(999);
  const randomKoName = "koName" + Math.random(999);
  const randomPass = 'a' + Math.random(999);
  const randomOtherPass = 'b' + Math.random(999);

  beforeEach(() => {
    cy.intercept('POST', '**/api/v2/users', (req) => {
      const { body } = req
      if (
        body.hasOwnProperty("username") &&
        body.hasOwnProperty("password") &&
        body.hasOwnProperty("passwordConfirm")
      ) {
        if (
          (body.username == randomOkName) &&
          (body.password == randomPass) &&
          (body.passwordConfirm == randomPass)
         ) {
            req.reply({statusCode: 200, fixture: 'created.json'})
          } else if (
          (body.username == randomOkName) &&
          (body.password == randomPass) &&
          (body.passwordConfirm == randomOtherPass)
          ) {
            req.reply({statusCode: 400, fixture: 'error.json'})
          } else if (
            (body.username == randomKoName) &&
            (body.password == randomPass) &&
            (body.passwordConfirm == randomPass)) {
            req.reply({statusCode: 409, fixture: 'error.json'})
          } else {
            // incorrect request according to typed characters
            req.reply({statusCode: 500, fixture: 'error.json'})
          }
      } else {
        // incorrect request due to missing parameters
        req.reply({statusCode: 500, fixture: 'error.json'})
      }
    })
    cy.visit('http://localhost:3000/register')
  })

  it('issue16 - register response feedback paragraphs exist with correct text, CSS, and initially hidden', () => {
    cy.get('p[data-cy=successText]')
    .should('have.text', '¡Te has registrado con éxito!')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.css', 'color', 'rgb(165, 50, 50)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'font-weight', '700')
    .should('have.css', 'font-size', '19px')

    cy.get('p[data-cy=errorPasswords]')
    .should('have.text', 'No se ha registrado el usuario, quizá porque las contraseñas no coincidían')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.css', 'color', 'rgb(165, 50, 50)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'font-weight', '700')
    .should('have.css', 'font-size', '19px')

    cy.get('p[data-cy=errorAlreadyRegistered]')
    .should('have.text', 'La petición ha fallado porque ya existe un usuario con ese nombre')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.css', 'color', 'rgb(165, 50, 50)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'font-weight', '700')
    .should('have.css', 'font-size', '19px')
  })

  it('issue16 - after correct registration, p success is NOT hidden', () => {
    cy.get('input[data-cy=inputUsername]')
    .type(randomOkName)

    cy.get('input[data-cy=inputPassword]')
    .type(randomPass)

    cy.get('input[data-cy=inputPasswordConfirm]')
    .type(randomPass)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait(1000)

    cy.get('p[data-cy=successText]')
    .should('not.have.attr', 'hidden', 'hidden')
    .should('have.text', '¡Te has registrado con éxito!')

    cy.get('p[data-cy=errorPasswords]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', 'No se ha registrado el usuario, quizá porque las contraseñas no coincidían')

    cy.get('p[data-cy=errorAlreadyRegistered]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', 'La petición ha fallado porque ya existe un usuario con ese nombre')
  })

  it('issue16 - after no-matching passwords registration, p errorPasswords is NOT hidden', () => {
    cy.get('input[data-cy=inputUsername]')
    .type(randomOkName)

    cy.get('input[data-cy=inputPassword]')
    .type(randomPass)

    cy.get('input[data-cy=inputPasswordConfirm]')
    .type(randomOtherPass)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait(1000)

    cy.get('p[data-cy=successText]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', '¡Te has registrado con éxito!')

    cy.get('p[data-cy=errorPasswords]')
    .should('not.have.attr', 'hidden', 'hidden')
    .should('have.text', 'No se ha registrado el usuario, quizá porque las contraseñas no coincidían')

    cy.get('p[data-cy=errorAlreadyRegistered]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', 'La petición ha fallado porque ya existe un usuario con ese nombre')
  })

  it('issue16 - after already-taken-username registration, p alreadyRegistered is NOT hidden', () => {
    cy.get('input[data-cy=inputUsername]')
    .type(randomKoName)

    cy.get('input[data-cy=inputPassword]')
    .type(randomPass)

    cy.get('input[data-cy=inputPasswordConfirm]')
    .type(randomPass)

    cy.get('input[data-cy=inputSubmit]')
    .click()

    cy.wait(1000)

    cy.get('p[data-cy=successText]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', '¡Te has registrado con éxito!')

    cy.get('p[data-cy=errorPasswords]')
    .should('have.attr', 'hidden', 'hidden')
    .should('have.text', 'No se ha registrado el usuario, quizá porque las contraseñas no coincidían')

    cy.get('p[data-cy=errorAlreadyRegistered]')
    .should('not.have.attr', 'hidden', 'hidden')
    .should('have.text', 'La petición ha fallado porque ya existe un usuario con ese nombre')
  })
})
