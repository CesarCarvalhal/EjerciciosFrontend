/// <reference types="cypress" />

describe('understanding_environment', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue1 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue1]')
        .find('h1')
        .should('have.text', 'Ejercicio 1');
    })

    it('issue1 div contains an appropriate div with starting message', () => {
        cy.get('div[data-cy=issue1]')
        .find('div[data-cy=issue1div]')
        .should('have.text', 'Aquí estamos');
    })
})
