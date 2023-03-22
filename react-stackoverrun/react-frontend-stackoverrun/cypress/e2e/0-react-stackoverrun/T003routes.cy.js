/// <reference types="cypress" />

describe('routes', () => {

  it('issue3 - main page is served and has footer', () => {
    cy.visit('http://localhost:3000/')
    
    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue3 - dashboard detail page is served and has footer', () => {
    cy.visit('http://localhost:3000/dashboards/' + Math.random().toString().slice(2, 8))
    
    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue3 - new question page is served and has footer', () => {
    cy.visit('http://localhost:3000/dashboards/' + Math.random().toString().slice(2, 8) + '/newQuestion')
    
    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue3 - question detail page is served and has footer', () => {
    cy.visit('http://localhost:3000/dashboards/' + Math.random().toString().slice(2, 8) + '/questions/' + Math.random().toString().slice(2, 8))
    
    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue3 - question detail page is served and has footer', () => {
    cy.visit('http://localhost:3000/dashboards/' + Math.random().toString().slice(2, 8) + '/questions/' + Math.random().toString().slice(2, 8) + '/newAnswer')
    
    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })
})

