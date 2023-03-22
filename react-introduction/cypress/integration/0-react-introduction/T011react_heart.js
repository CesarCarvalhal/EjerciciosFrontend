/// <reference types="cypress" />

describe('react_heart', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue11 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue11]')
        .find('h1')
        .should('have.text', 'Ejercicio 11');
    })

    it('issue11 div contains an appropriate starting paragraph', () => {
        cy.get('div[data-cy=issue11]')
        .find('p')
        .should('have.text', 'Número: 0');
    })

    it('issue11 div contains an appropriate button', () => {
        cy.get('div[data-cy=issue11]')
        .find('button[data-cy=issue11button]')
        .should('have.text', 'Contar');
    })

    it('issue11 div paragraph has correct value incremented by 1', () => {
        cy.get('div[data-cy=issue11]')
        .find('button[data-cy=issue11button]')
        .click()
        
        cy.get('div[data-cy=issue11]')
        .find('p')
        .should('have.text', 'Número: 1');
    })

    it('issue11 div paragraph has correct value incremented by 3', () => {
        cy.get('div[data-cy=issue11]')
        .find('button[data-cy=issue11button]')
        .click().click().click()
        
        cy.get('div[data-cy=issue11]')
        .find('p')
        .should('have.text', 'Número: 3');
    })
})
