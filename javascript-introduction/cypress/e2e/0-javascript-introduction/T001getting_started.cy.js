/// <reference types="cypress" />

describe('getting_started', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/');
      cy.reload(true); // Force-reload to prevent cache errors
    })
  
    it('issue1 header is changed', () => {
        cy.get('h1[data-cy=pageHeader]')
        .should('have.text', 'Aquí estamos');
    })
})
