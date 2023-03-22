/// <reference types="cypress" />

describe('on_content_loaded', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/');
      cy.reload(true); // Force-reload to prevent cache errors
    })
  
    it('issue5 p3 is changed', () => {
        cy.get('p[data-cy=paragraph3]')
        .should('have.text', 'Esto se ha modificado en DOMContentLoaded');
    })
})
