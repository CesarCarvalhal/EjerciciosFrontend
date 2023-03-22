/// <reference types="cypress" />

describe('asteroids_beginning', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/');
      cy.reload(true);
    })
  
    it('issue12 index.html is correctly modified and asteroids.html contains canvas', () => {
        cy.get('ol[data-cy=projectsList]')
        .find('li')
        .eq(2)
        .find('a')
        .should('have.text', 'Juego de nave espacial');

        cy.get('ol[data-cy=projectsList]')
        .find('li')
        .eq(2)
        .find('a')
        .click();

        cy.get('body')
        .find('canvas#gameContainer');

        cy.request('http://localhost:8000/projects/js/asteroids.js');
    })
})
