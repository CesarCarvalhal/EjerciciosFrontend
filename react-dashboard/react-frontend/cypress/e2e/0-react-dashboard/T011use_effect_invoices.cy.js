/// <reference types="cypress" />

describe('use_effect_invoices', () => {
  it('issue11 invoices page has correct title', () => {
    const randomNumber = Math.random().toString().slice(2, 8);
      cy.visit("http://localhost:3000/invoices/" + randomNumber)

    cy.title()
    .should('be.equals', 'F'+randomNumber);
  })
});
