/// <reference types="cypress" />

describe('adding_to_list', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/');
      cy.reload(true);
    })
  
    it('issue1 index.html is correctly modified', () => {
        cy.get('h1[data-cy=pageHeader]')
        .should('have.text', 'Proyectos de JavaScript');

        cy.get('ol[data-cy=projectsList]')
        .find('li')
        .first()
        .find('a')
        .should('have.text', 'Generador de nombres');
    })

    it('issue1 nameGenerator.html is correctly modified', () => {
      cy.get('ol[data-cy=projectsList]')
      .find('li')
      .first()
      .find('a')
      .click();

      cy.get('h1[data-cy=pageHeader]')
      .should('have.text', 'Aquí hay ideas para nicknames');

      cy.get('h1[data-cy=pageHeader]')
      .find('i')
      .should('have.text', 'nicknames');
  })
})
