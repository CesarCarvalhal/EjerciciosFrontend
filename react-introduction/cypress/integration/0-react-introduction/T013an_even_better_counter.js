/// <reference types="cypress" />

describe('an_even_better_counter', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue13 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue13]')
        .find('h1')
        .should('have.text', 'Ejercicio 13');
    })

    it('issue13 div contains an appropriate starting paragraph', () => {
        cy.get('div[data-cy=issue13]')
        .find('p')
        .should('have.text', 'Número: 127');
    })

    it('issue13 div contains an appropriate increase button', () => {
        cy.get('div[data-cy=issue13]')
        .find('button[data-cy=increaseButton]')
        .should('have.text', 'Contar');
    })

    it('issue13 div contains an appropriate decrease button', () => {
        cy.get('div[data-cy=issue13]')
        .find('button[data-cy=decreaseButton]')
        .should('have.text', 'Descontar');
    })

    it('issue13 div paragraph has correct value incremented by 1', () => {
        cy.get('div[data-cy=issue13]')
        .find('button[data-cy=increaseButton]')
        .click()
        
        cy.get('div[data-cy=issue13]')
        .find('p')
        .should('have.text', 'Número: ' + (127+1));
    })

    it('issue13 div paragraph has correct value decremented by 1', () => {
        cy.get('div[data-cy=issue13]')
        .find('button[data-cy=decreaseButton]')
        .click()
        
        cy.get('div[data-cy=issue13]')
        .find('p')
        .should('have.text', 'Número: ' + (127-1));
    })

    it('issue13 div paragraph has correct value decremented by 4 and incremented by 2', () => {
        cy.get('div[data-cy=issue13]')
        .find('button[data-cy=decreaseButton]')
        .click().click().click().click()

        cy.get('div[data-cy=issue13]')
        .find('button[data-cy=increaseButton]')
        .click().click()

        cy.get('div[data-cy=issue13]')
        .find('p')
        .should('have.text', 'Número: ' + (127-2));
    })
})
