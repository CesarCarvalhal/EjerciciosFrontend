/// <reference types="cypress" />

describe('a_simple_menu', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue4 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue4]')
        .find('h1')
        .should('have.text', 'Ejercicio 4');
    })

    it('issue4 div first menu item has correct name', () => {
        cy.get('div[data-cy=issue4]')
        .find('menu')
        .find('li')
        .first()
        .find('a')
        .should('have.text', 'Buscador principal');
    })

    it('issue4 div second menu item has correct name', () => {
        cy.get('div[data-cy=issue4]')
        .find('menu')
        .find('li')
        .eq(1)
        .find('a')
        .should('have.text', 'Buscador alternativo');
    })

    it('issue4 div first menu item has correct name', () => {
        cy.get('div[data-cy=issue4]')
        .find('menu')
        .find('li')
        .first()
        .find('a')
        .should('have.attr', 'href', 'https://www.google.es');
    })

    it('issue4 div second menu item has correct name', () => {
        cy.get('div[data-cy=issue4]')
        .find('menu')
        .find('li')
        .eq(1)
        .find('a')
        .should('have.attr', 'href', 'https://www.yandex.com');
    })
})
  
