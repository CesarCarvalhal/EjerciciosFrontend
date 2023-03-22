/// <reference types="cypress" />

describe('a_simple_image', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue5 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue5]')
        .find('h1')
        .should('have.text', 'Ejercicio 5');
    })

    it('issue5 div contains a figure with correct image content', () => {
        cy.get('div[data-cy=issue5]')
        .find('img')
        .should('have.attr', 'src', 'https://raw.githubusercontent.com/rubenmv0/fp/main/t-rex.jpg');
    })
})
  
