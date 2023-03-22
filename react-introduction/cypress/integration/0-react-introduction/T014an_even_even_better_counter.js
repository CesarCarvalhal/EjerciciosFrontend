/// <reference types="cypress" />

describe('an_even_even_better_counter', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue14 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue14]')
        .find('h1')
        .should('have.text', 'Ejercicio 14');
    })

    it('issue14 div contains an appropriate starting paragraph', () => {
        cy.get('div[data-cy=issue14]')
        .find('p')
        .should('have.text', 'Número: 0');
    })

    it('issue14 div contains an appropriate increase button', () => {
        cy.get('div[data-cy=issue14]')
        .find('button[data-cy=increaseButton]')
        .should('have.text', 'Contar');
    })

    it('issue14 div contains an appropriate decrease button', () => {
        cy.get('div[data-cy=issue14]')
        .find('button[data-cy=decreaseButton]')
        .should('have.text', 'Descontar');
    })

    it('issue14 div paragraph has correct value incremented by 1', () => {
        cy.get('div[data-cy=issue14]')
        .find('button[data-cy=increaseButton]')
        .click()
        
        cy.get('div[data-cy=issue14]')
        .find('p')
        .should('have.text', 'Número: 1');
    })

    it('issue14 div paragraph has correct value decremented beyond limit', () => {
        cy.get('div[data-cy=issue14]')
        .find('button[data-cy=decreaseButton]')
        .click().click().click()
        
        cy.get('div[data-cy=issue14]')
        .find('p')
        .should('have.text', 'Número: 0');
    })

    it('issue14 div paragraph has correct value incremented beyond limit', () => {
        cy.get('div[data-cy=issue14]')
        .find('button[data-cy=increaseButton]')
        .click().click().click().click().click().click().click().click().click().click().click().click()

        cy.get('div[data-cy=issue14]')
        .find('p')
        .should('have.text', 'Número: 9');
    })
})
