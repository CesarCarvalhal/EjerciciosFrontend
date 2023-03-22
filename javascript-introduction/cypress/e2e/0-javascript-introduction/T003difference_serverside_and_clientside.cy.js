/// <reference types="cypress" />

describe('difference_serverside_and_clientside', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/');
      cy.reload(true); // Force-reload to prevent cache errors
    })
  
    it('issue3 p1 is changed', () => {
        cy.get('p[data-cy=paragraph1]')
        .should('have.text', 'Este mensaje ha sido puesto aquí con JavaScript');
    })
})
