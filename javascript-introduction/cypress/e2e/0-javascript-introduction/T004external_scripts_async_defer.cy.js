/// <reference types="cypress" />

describe('external_scripts_async_defer', () => {
    it('issue4 external js has been created', () => {
        cy.request('http://localhost:8000/small.js');
    })
  
    it('issue4 p2 is changed', () => {
        cy.visit('http://localhost:8000/index.html');
        cy.reload(true); // Force-reload to prevent cache errors

        cy.get('p[data-cy=paragraph2]')
        .should('have.text', 'Alterado con un script externo');
    })
})
