/// <reference types="cypress" />

describe('use_effect', () => {
  it('issue10 main page has correct title', () => {
    cy.visit("http://localhost:3000/")

    cy.title()
    .should('be.equals', 'Main page');
  })
});
