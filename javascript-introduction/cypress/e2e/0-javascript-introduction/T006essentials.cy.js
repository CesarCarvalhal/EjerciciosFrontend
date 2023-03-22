/// <reference types="cypress" />

describe('essentials', () => {
    it('issue6 external js has been created', () => {
        cy.request('http://localhost:8000/generator.js');
    })
  
    it('issue6 deathrace header and content exists', () => {
        cy.visit('http://localhost:8000/deathrace.html');
        cy.reload(true); // Force-reload to prevent cache errors

        cy.get('h3[data-cy=pageHeader]')
        .should('have.text', 'Parrilla de salida');

        cy.get('div[data-cy=main]');
    })
})
