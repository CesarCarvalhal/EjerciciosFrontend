/// <reference types="cypress" />

describe('the_best_counter', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue15 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue15]')
        .find('h1')
        .should('have.text', 'Ejercicio 15');
    })

    it('issue15 div contains an appropriate starting paragraph', () => {
        cy.get('div[data-cy=issue15]')
        .find('p')
        .should('have.text', 'Número: 0');
    })

    it('issue15 div contains an appropriate increase button', () => {
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=increaseButton]')
        .should('have.text', 'Contar');
    })

    it('issue15 div contains an appropriate decrease button', () => {
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=decreaseButton]')
        .should('have.text', 'Descontar');
    })

    it('issue15 div paragraph has decrease button initially disabled', () => {
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=decreaseButton]')
        .should('be.disabled')
    })

    it('issue15 div paragraph has increase button initially enabled', () => {
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=increaseButton]')
        .should('not.be.disabled')
    })

    it('issue15 div paragraph has correct value incremented by 1', () => {
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=increaseButton]')
        .click()
        
        cy.get('div[data-cy=issue15]')
        .find('p')
        .should('have.text', 'Número: 1');
    })

    it('issue15 div paragraph has correct value incremented by 1, and both buttons are enabled', () => {
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=increaseButton]')
        .click()
        
        cy.get('div[data-cy=issue15]')
        .find('p')
        .should('have.text', 'Número: 1');

        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=increaseButton]')
        .should('not.be.disabled')

        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=decreaseButton]')
        .should('not.be.disabled')
    })

    it('issue15 div paragraph has correct value incremented up to limit, and increase button is disabled', () => {
        for (let i = 0; i < 9; i++) {
           cy.get('div[data-cy=issue15]')
           .find('button[data-cy=increaseButton]')
           .click()
        }

        cy.get('div[data-cy=issue15]')
        .find('p')
        .should('have.text', 'Número: 9');
        
        cy.get('div[data-cy=issue15]')
        .find('button[data-cy=increaseButton]')
        .should('be.disabled')
    })
})
