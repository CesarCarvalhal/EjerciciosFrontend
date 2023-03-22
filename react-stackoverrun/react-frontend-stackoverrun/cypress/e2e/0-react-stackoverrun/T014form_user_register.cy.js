describe('form_user_register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('issue14 - register form has correct hierarchy and header', () => {
    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputUsername]')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputPassword]')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputPasswordConfirm]')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputSubmit]')

    cy.get('div')
    .find('h1[data-cy=pageHeader]')
    .should('have.text', 'Crea tu cuenta')
  })

  it('issue14 - register form has correct text, types and placeholders', () => {
    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputUsername]')
    .should('have.attr', 'type', 'text')
    .should('have.attr', 'placeholder', 'my.name')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputPassword]')
    .should('have.attr', 'type', 'password')
    .should('have.attr', 'placeholder', 'Contraseña')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputPasswordConfirm]')
    .should('have.attr', 'type', 'password')
    .should('have.attr', 'placeholder', 'Confirmar contraseña')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputSubmit]')
    .should('have.attr', 'value', 'Registro')
  })

  it('issue - register form page has correct CSS', () => {
    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputUsername]')
    .should('have.css', 'height', '47px')
    .should('have.css', 'background-color', 'rgba(57, 57, 57, 0.08)')
    .should('have.css', 'border-radius', '12px')
    .should('have.css', 'margin', '5px')
    .should('have.css', 'padding', '0px 21px')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputPassword]')
    .should('have.css', 'height', '47px')
    .should('have.css', 'background-color', 'rgba(57, 57, 57, 0.08)')
    .should('have.css', 'border-radius', '12px')
    .should('have.css', 'margin', '5px')
    .should('have.css', 'padding', '0px 21px')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputPasswordConfirm]')
    .should('have.css', 'height', '47px')
    .should('have.css', 'background-color', 'rgba(57, 57, 57, 0.08)')
    .should('have.css', 'border-radius', '12px')
    .should('have.css', 'margin', '5px')
    .should('have.css', 'padding', '0px 21px')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .find('input[data-cy=inputSubmit]')
    .should('have.css', 'height', '47px')
    .should('have.css', 'background-color', 'rgba(57, 57, 57, 0.08)')
    .should('have.css', 'border-radius', '12px')
    .should('have.css', 'margin', '5px')
    .should('have.css', 'padding', '0px 21px')

    cy.get('div')
    .find('form[data-cy=registerForm]')
    .should('have.css', 'text-align', 'center')
  })
})
