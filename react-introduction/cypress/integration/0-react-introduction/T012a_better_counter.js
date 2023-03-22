/// <reference types="cypress" />

describe('a_better_counter', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue12 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue12]')
        .find('h1')
        .should('have.text', 'Ejercicio 12');
    })

    it('issue12 div contains an appropriate starting paragraph', () => {
        cy.get('div[data-cy=issue12]')
        .find('p')
        .should('have.text', 'Número: 0');
    })

    it('issue12 div contains an appropriate increase button', () => {
        cy.get('div[data-cy=issue12]')
        .find('button[data-cy=increaseButton]')
        .should('have.text', 'Contar');
    })

    it('issue12 div contains an appropriate decrease button', () => {
        cy.get('div[data-cy=issue12]')
        .find('button[data-cy=decreaseButton]')
        .should('have.text', 'Descontar');
    })

    it('issue12 div paragraph has correct value incremented by 1', () => {
        cy.get('div[data-cy=issue12]')
        .find('button[data-cy=increaseButton]')
        .click()
        
        cy.get('div[data-cy=issue12]')
        .find('p')
        .should('have.text', 'Número: 1');
    })

    it('issue12 div paragraph has correct value decremented by 1', () => {
        cy.get('div[data-cy=issue12]')
        .find('button[data-cy=decreaseButton]')
        .click()
        
        cy.get('div[data-cy=issue12]')
        .find('p')
        .should('have.text', 'Número: -1');
    })

    it('issue12 div paragraph has correct value decremented by 4 and incremented by 2', () => {
        cy.get('div[data-cy=issue12]')
        .find('button[data-cy=decreaseButton]')
        .click().click().click().click()

        cy.get('div[data-cy=issue12]')
        .find('button[data-cy=increaseButton]')
        .click().click()

        cy.get('div[data-cy=issue12]')
        .find('p')
        .should('have.text', 'Número: -2');
    })
})
