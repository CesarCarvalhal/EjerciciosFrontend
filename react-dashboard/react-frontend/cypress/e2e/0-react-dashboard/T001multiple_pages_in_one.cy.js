/// <reference types="cypress" />

describe('multiple_pages_in_one', () => {
  
    it('issue1 - main page content is correct', () => {
        cy.visit("http://localhost:3000")
        
        cy.get('h2[data-cy=pageHeader]')
        .should('have.text', 'Principal');
    })

    it('issue1 - about page content is correct', () => {
        cy.visit("http://localhost:3000/about")
        
        cy.get('h2[data-cy=pageHeader]')
        .should('have.text', 'Otra información');
    })
})
