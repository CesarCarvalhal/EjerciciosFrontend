/// <reference types="cypress" />

describe('three_is_more_than_one', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/examples')
    })
  
  
    it('issue2 div exists', () => {
        cy.get('div');
    })
    
    it('issue2 - examples page contains appropriate header', () => {
        cy.get('div')
        .find('h2[data-cy=pageHeader]')
        .should('have.text', 'Ejemplos');
    })
})
