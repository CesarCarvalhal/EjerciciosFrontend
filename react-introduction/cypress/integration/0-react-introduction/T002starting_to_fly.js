/// <reference types="cypress" />

describe('starting_to_fly', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue2 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue2]')
        .find('h1')
        .should('have.text', 'Ejercicio 2');
    })

    it('issue2 div contains an appropriate p with title', () => {
        cy.get('div[data-cy=issue2]')
        .find('p')
        .should('have.text', '3 interesantes presidentes de EE.UU.');
    })

    it('issue2 div list has appropriate length', () => {
        cy.get('div[data-cy=issue2]')
        .find('ul')
        .find('li')
        .should('have.length', 3);
    })

    it('issue2 div list contains an appropriate first element', () => {
        cy.get('[data-cy=issue2list]')
        .find('li')
        .first()
        .should('have.text', 'John Adams');
    })

    it('issue2 div list contains an appropriate second element', () => {
        cy.get('[data-cy=issue2list]')
        .find('li')
        .eq(1)
        .should('have.text', 'Martin Van Buren');
    })

    it('issue2 div list contains an appropriate third element', () => {
        cy.get('[data-cy=issue2list]')
        .find('li')
        .last()
        .should('have.text', 'Grover Cleveland');
    })
})
  
