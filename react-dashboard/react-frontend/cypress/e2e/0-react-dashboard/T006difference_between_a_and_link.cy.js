/// <reference types="cypress" />

describe('difference_between_a_and_link', () => {
  
  it('issue6 - main page content has footer with section 1 links and header', () => {
      cy.visit("http://localhost:3000")
      
      cy.get('footer')
      .find('div.footer-section')
      .first()
      .find('ul')
      .find('li')
      .should('have.length', 2);

      cy.get('footer')
      .find('div.footer-section')
      .first()
      .find('ul')
      .find('li')
      .first()
      .find('a')
      .should('have.text', 'Acerca de')
      .should('have.attr', 'href', '/about');

      cy.get('footer')
      .find('div.footer-section')
      .first()
      .find('ul')
      .find('li')
      .last()
      .find('a')
      .should('have.text', 'Ejemplos')
      .should('have.attr', 'href', '/examples');

      cy.get('footer')
      .find('div.footer-section')
      .first()
      .find('h3')
      .should('have.text', 'Enlaces Link');
  })

  it('issue6 - main page content has footer with section 1 links and header', () => {
    cy.visit("http://localhost:3000")
    
    cy.get('footer')
    .find('div.footer-section')
    .last()
    .find('ul')
    .find('li')
    .should('have.length', 2);

    cy.get('footer')
    .find('div.footer-section')
    .last()
    .find('ul')
    .find('li')
    .first()
    .find('a')
    .should('have.text', 'Acerca de')
    .should('have.attr', 'href', '/about');

    cy.get('footer')
    .find('div.footer-section')
    .last()
    .find('ul')
    .find('li')
    .last()
    .find('a')
    .should('have.text', 'Ejemplos')
    .should('have.attr', 'href', '/examples');

    cy.get('footer')
    .find('div.footer-section')
    .last()
    .find('h3')
    .should('have.text', 'Enlaces a href');
  })

  it('issue6 - main page footer has correct css', () => {
    cy.visit("http://localhost:3000")
  
    cy.get('footer')
    .should('have.css', 'padding', '24px')
   .should('have.css', 'background-color', 'rgb(200, 200, 200)')
    .should('have.css', 'color', 'rgb(90, 90, 238)')
   .should('have.css', 'overflow', 'auto');
  })

  it('issue6 - main page footer sections have correct css', () => {
    cy.visit("http://localhost:3000")
  
    cy.get('footer')
    .find('div.footer-section')
    .should('have.css', 'padding-left', '50px')
    .should('have.css', 'float', 'left');
  })

  it('issue6 - about page has correct return link', () => {
    cy.visit("http://localhost:3000/about")
  
    cy.get('h4[data-cy=issue6link]')
    .find('a')
    .should('have.text', 'Regresar a principal')
    .should('have.attr', 'href', '/');
  })

  it('issue6 - examples page has correct return link', () => {
    cy.visit("http://localhost:3000/examples")
  
    cy.get('h4[data-cy=issue6link]')
    .find('a')
    .should('have.text', 'Regresar a principal')
    .should('have.attr', 'href', '/');
  })
})
