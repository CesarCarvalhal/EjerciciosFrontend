/// <reference types="cypress" />

describe('style_changer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/examples')
  })


  it('issue5 div exists and h1 is appropriate', () => {
      cy.get('div[data-cy=issue5div]')
      .find('h1')
      .should('have.text', 'Ejercicio 5');
  })
  
  it('issue5 div contains a p with valid text', () => {
      cy.get('div[data-cy=issue5div]')
      .find('p[data-cy=issue5text]')
      .should('have.text', 'Los arácnidos son parte del reino animal');
  })

  it('issue5 div contains a button with valid text', () => {
    cy.get('div[data-cy=issue5div]')
    .find('button[data-cy=issue5button]')
    .should('have.text', 'Otro estilo');
  })

  it('issue5 div button changes font weight appropriately 1 time', () => {
    cy.get('div[data-cy=issue5div]')
    .find('p[data-cy=issue5text]')
    .first()
    .then(($p) => {
      const oldFontWeight = $p.css('font-weight');

      cy.get('div[data-cy=issue5div]')
      .find('button[data-cy=issue5button]')
      .click();
      
      cy.get('p[data-cy=issue5text]').first().should('have.not.css', 'font-weight', oldFontWeight);
    })
  })

  
  it('issue5 div button changes font weight appropriately 2 times', () => {
    cy.get('div[data-cy=issue5div]')
    .find('p[data-cy=issue5text]')
    .first()
    .then(($p) => {
      const oldFontWeight = $p.css('font-weight');

      cy.get('div[data-cy=issue5div]')
      .find('button[data-cy=issue5button]')
      .click();
      
      cy.get('p[data-cy=issue5text]').first().should('have.not.css', 'font-weight', oldFontWeight);
    })

    cy.get('div[data-cy=issue5div]')
    .find('p[data-cy=issue5text]')
    .first()
    .then(($p) => {
      const oldFontWeight = $p.css('font-weight');

      cy.get('div[data-cy=issue5div]')
      .find('button[data-cy=issue5button]')
      .click();
      
      cy.get('p[data-cy=issue5text]').first().should('have.not.css', 'font-weight', oldFontWeight);
    })
  })

  
  it('issue5 div button changes font weight appropriately 3 times', () => {
    cy.get('div[data-cy=issue5div]')
    .find('p[data-cy=issue5text]')
    .first()
    .then(($p) => {
      const oldFontWeight = $p.css('font-weight');

      cy.get('div[data-cy=issue5div]')
      .find('button[data-cy=issue5button]')
      .click();
      
      cy.get('p[data-cy=issue5text]').first().should('have.not.css', 'font-weight', oldFontWeight);
    })

    cy.get('div[data-cy=issue5div]')
    .find('p[data-cy=issue5text]')
    .first()
    .then(($p) => {
      const oldFontWeight = $p.css('font-weight');

      cy.get('div[data-cy=issue5div]')
      .find('button[data-cy=issue5button]')
      .click();
      
      cy.get('p[data-cy=issue5text]').first().should('have.not.css', 'font-weight', oldFontWeight);
    })

    cy.get('div[data-cy=issue5div]')
    .find('p[data-cy=issue5text]')
    .first()
    .then(($p) => {
      const oldFontWeight = $p.css('font-weight');

      cy.get('div[data-cy=issue5div]')
      .find('button[data-cy=issue5button]')
      .click();
      
      cy.get('p[data-cy=issue5text]').first().should('have.not.css', 'font-weight', oldFontWeight);
    })
  })
})


