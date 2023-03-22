/// <reference types="cypress" />

describe('new_webpage', () => {
    it('issue2 HTML is served', () => {
        cy.visit('http://localhost:8000/issue2.html');
        cy.reload(true); // Force-reload to prevent cache errors

        cy.get('h1[data-cy=issue2header]')
        .should('have.text', 'Ferrari');
    })
    
    it('issue2 link has been created in index.html', () => {
        cy.visit('http://localhost:8000/');
        cy.reload(true); // Force-reload to prevent cache errors

        cy.get('body')
        .find('a[data-cy=issue2link]')
        .should('have.text', 'Marca de vehículos')
        .should('have.attr', 'href', '/issue2.html');
    })
})
