/// <reference types="cypress" />

describe('routes_wildcard', () => {
  
  it('issue7 - random page shows not found with correct header', () => {
      cy.visit("http://localhost:3000/asdf" + Math.random().toString().slice(2, 8))
      
      cy.get('div[data-cy=pageBody]')
      .find('h2[data-cy=pageHeader]')
      .should('have.text', 'Aquí no está');
  })
  
  it('issue7 - random page shows not found with correct text', () => {
    cy.visit("http://localhost:3000/asdf" + Math.random().toString().slice(2, 8))
    
    cy.get('div[data-cy=pageBody]')
    .find('p[data-cy=pageText]')
    .should('have.text', 'Creo que te has equivocado. Esa página no existe');
  })

  
  it('issue7 - random page shows not found with correct link', () => {
    cy.visit("http://localhost:3000/asdf" + Math.random().toString().slice(2, 8))
    
    cy.get('div[data-cy=pageBody]')
    .find('a')
    .should('have.attr', 'href', '/')
    .should('have.text', 'Inicio');
  })
})
