/// <reference types="cypress" />

describe('two_essential_concepts', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue6 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue6]')
        .find('h1')
        .should('have.text', 'Ejercicio 6');
    })

    it('issue6 element contains an appropriate data-cy', () => {
        cy.get('div[data-cy=issue6]')
        .find('h2')
        .should('have.attr', 'data-cy', 'welcomeElement');
    })

    it('issue6 element contains correct message', () => {
        cy.get('div[data-cy=issue6]')
        .find('h2[data-cy=welcomeElement]')
        .should('have.text', 'Hello, Charlie');
    })
})
