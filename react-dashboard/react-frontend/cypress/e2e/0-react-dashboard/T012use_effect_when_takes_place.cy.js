/// <reference types="cypress" />

describe('use_effect_when_takes_place', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/examples')
  })

  it('issue12 - examples page div button increments amount by 3 correctly', () => {
    cy.get('div[data-cy=issue3div]')
    .find('button[data-cy=issue3button]')
    .click().click().click();

    cy.get('div[data-cy=issue3div]')
    .find('p')
    .then(($p) => {
      expect($p.text().slice(-1)).to.be.equals('3');
    })
  })

  it('issue12 new button exists with correct text', () => {
      cy.get('button[data-cy=issue12button]')
      .should('have.text', 'Cambiar color');
  })

  it('issue12 new button alternates header color correctly once', () => {
    cy.get('[data-cy=pageHeader]')
    .then(($header) => {
      const oldColor = $header.css('color')
      expect(oldColor == 'rgb(0, 0, 0)' || oldColor == 'rgb(243, 0, 0)');
      cy.get('[data-cy=issue12button]').click();
      cy.get('[data-cy=pageHeader]').first().should('not.have.css', 'color', oldColor);
    })
  })

  it('issue12 new button alternates header color correctly twice', () => {
    cy.get('[data-cy=pageHeader]')
    .then(($header) => {
      const oldColor = $header.css('color')
      expect(oldColor == 'rgb(0, 0, 0)' || oldColor == 'rgb(243, 0, 0)');
      cy.get('[data-cy=issue12button]').click().click();
      cy.get('[data-cy=pageHeader]').first().should('have.css', 'color', oldColor);
    })
  })

  it('issue12 title is initially correct', () => {
    cy.title().should('be.equals', 'Has clicado 0 veces')
  })

  it('issue12 title is NOT updated without hitting new button', () => {
    const randomNumber = Math.floor(Math.random() * (30) + 1);
    cy.title().should('be.equals', 'Has clicado 0 veces')
    for (let i = 0; i < randomNumber; i++) {
      cy.get('button[data-cy=issue3button]').click()
    }
    cy.title().should('not.be', 'Has clicado ' + randomNumber + ' veces')
  })
  
  it('issue12 title is updated after hitting new button', () => {
    const randomNumber = Math.floor(Math.random() * (30) + 1);
    cy.title().should('be.equals', 'Has clicado 0 veces')
    for (let i = 0; i < randomNumber; i++) {
      cy.get('button[data-cy=issue3button]').click()
    }
    cy.get('[data-cy=issue12button]').click();
    cy.title().should('be.equals', 'Has clicado ' + randomNumber + ' veces')
  })
})

