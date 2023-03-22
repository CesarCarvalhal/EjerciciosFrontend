/// <reference types="cypress" />

describe('a_simple_not_found_start', () => {
  
  it('issue1 - not found page is served in a random location and has correct h1', () => {
      cy.visit("http://localhost:3000/" + Math.random().toString().slice(2, 8))
      
      cy.get('div[data-cy=pageBody]')
      .find('h1[data-cy=pageHeader]')
      .should('have.text', 'Uh!');
  })

  it('issue1 - not found page is served in a random location and has correct p', () => {
    cy.visit("http://localhost:3000/" + Math.random().toString().slice(2, 8))
    
    cy.get('div[data-cy=pageBody]')
    .find('p[data-cy=simpleMessage]')
    .should('have.text', 'Parece que estás perdido');
  })

it('issue1 - not found page is served in a random location and has correct Link', () => {
  cy.visit("http://localhost:3000/" + Math.random().toString().slice(2, 8))
  
  cy.get('div[data-cy=pageBody]')
  .find('a')
  .should('have.attr', 'href', '/')
  .should('have.text', 'Página principal')
  .click();

  cy.url()
  .should('eq', 'http://localhost:3000/')
  })
})
