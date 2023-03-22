/// <reference types="cypress" />

describe('introducing_hooks', () => {
  
  it('issue3 - main page content is now a div', () => {
      cy.visit("http://localhost:3000")
      
      cy.get('div[data-cy=issue3body]');
  })

  it('issue3 - main page content is now a div, and h2 is still there', () => {
    cy.visit("http://localhost:3000")
    
    cy.get('div[data-cy=issue3body]')
    .find('h2[data-cy=pageHeader]');
  })

  it('issue3 - about page content is now a div', () => {
    cy.visit("http://localhost:3000/about")
  
    cy.get('div[data-cy=issue3body]');
  })

  it('issue3 - about page content is now a div, and h2 is still there', () => {
    cy.visit("http://localhost:3000/about")

    cy.get('div[data-cy=issue3body]')
    .find('h2[data-cy=pageHeader]');
  })

  it('issue3 - examples page contains a new div with correct header', () => {
    cy.visit("http://localhost:3000/examples")

    cy.get('div[data-cy=issue3div]')
    .find('h1')
    .should('have.text', 'Ejercicio 3');
  })

  it('issue3 - examples page div has correct text label', () => {
    cy.visit("http://localhost:3000/examples")

    cy.get('div[data-cy=issue3div]')
    .find('p')
    .should('have.text', 'Número: 0');
  })

  it('issue3 - examples page div button increments amount by 4 correctly', () => {
    cy.visit("http://localhost:3000/examples")

    cy.get('div[data-cy=issue3div]')
    .find('button[data-cy=issue3button]')
    .click().click().click().click();

    cy.get('div[data-cy=issue3div]')
    .find('p')
    .should('have.text', 'Número: 4');
  })
})
