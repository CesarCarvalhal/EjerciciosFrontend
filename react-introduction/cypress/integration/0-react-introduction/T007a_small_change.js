/// <reference types="cypress" />

describe('a_small_change', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue7 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue7]')
        .find('h1')
        .should('have.text', 'Ejercicio 7');
    })

    it('issue7 div contains 1 welcome element', () => {
        cy.get('div[data-cy=issue7]')
        .find('[data-cy=welcomeElement]')
        .should('have.length', 1);
    })

    it('issue7 div contains 1 welcome stranger element', () => {
        cy.get('div[data-cy=issue7]')
        .find('[data-cy=welcomeStranger]')
        .should('have.length', 1);
    })

    it('issue7 div contains an appropriate content', () => {
        cy.get('div[data-cy=issue7]')
        .find('[data-cy=welcomeElement]')
        .should('have.text', 'Hello, Bart');
    })

    it('issue7 div contains an appropriate content', () => {
        cy.get('div[data-cy=issue7]')
        .find('[data-cy=welcomeStranger]')
        .last()
        .should('have.text', 'Hello, stranger!');
    })
})
  
