/// <reference types="cypress" />

describe('write_params_handling', () => {

  it('issue4 - dashboard detail page is served and has correct footerDebugInfo', () => {
    const randomNumber = Math.random().toString().slice(2, 8);
    cy.visit('http://localhost:3000/dashboards/' + randomNumber)
    
    cy.get('footer')
    .find('p[data-cy=footerDebugInfo]')
    .should('have.text', 'Estás visitando el dashboard con ID: ' + randomNumber)
  })

  it('issue4 - new question page is served and has correct footerDebugInfo', () => {
    const randomNumber = Math.random().toString().slice(2, 8);
    cy.visit('http://localhost:3000/dashboards/' + randomNumber + '/newQuestion')

    cy.get('footer')
    .find('p[data-cy=footerDebugInfo]')
    .should('have.text', 'Desde aquí puedes crear una nueva pregunta para el dashboard con ID: ' + randomNumber)
  })

  it('issue4 - question detail page is served and has correct footerDebugInfo', () => {
    const randomNumber = Math.random().toString().slice(2, 8);
    const randomNumber2 = Math.random().toString().slice(2, 8);
    cy.visit('http://localhost:3000/dashboards/' + randomNumber + '/questions/' + randomNumber2)

    cy.get('footer')
    .find('p[data-cy=footerDebugInfo]')
    .should('have.text', 'Esta es la pregunta con ID: ' + randomNumber2 + ', que pertenece al dashboard con ID: ' + randomNumber)
  })

  it('issue4 - new answer page is served and has correct footerDebugInfo', () => {
    const randomNumber = Math.random().toString().slice(2, 8);
    const randomNumber2 = Math.random().toString().slice(2, 8);
    cy.visit('http://localhost:3000/dashboards/' + randomNumber + '/questions/' + randomNumber2 + '/newAnswer')

    cy.get('footer')
    .find('p[data-cy=footerDebugInfo]')
    .should('have.text', 'Desde aquí puedes crear una nueva respuesta para la pregunta con ID: ' + randomNumber2 + ', que pertenece al dashboard con ID: ' + randomNumber)
  })
})


