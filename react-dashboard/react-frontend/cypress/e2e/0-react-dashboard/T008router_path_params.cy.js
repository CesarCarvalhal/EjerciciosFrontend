/// <reference types="cypress" />

describe('router_path_params', () => {
  
  it('issue8 - invoices page works OK with random number (2,5)', () => {
    const randomNumber = Math.random().toString().slice(2, 5);
      cy.visit("http://localhost:3000/invoices/" + randomNumber)
      
      cy.get('div[data-cy=issue8body]')
      .find('h2[data-cy=invoiceNumberHeader]')
      .should('have.text', 'Factura_' + randomNumber);
  })
  
  it('issue8 - invoices page works OK with random number (2,6)', () => {
    const randomNumber = Math.random().toString().slice(2, 6);
      cy.visit("http://localhost:3000/invoices/" + randomNumber)
      
      cy.get('div[data-cy=issue8body]')
      .find('h2[data-cy=invoiceNumberHeader]')
      .should('have.text', 'Factura_' + randomNumber);
  })
})
