/// <reference types="cypress" />

describe('a_simple_table', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue3 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue3]')
        .find('h1')
        .should('have.text', 'Ejercicio 3');
    })

    it('issue3 div contains a table with correct first header', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('thead')
        .find('tr')
        .first()
        .find('th')
        .first()
        .should('have.text', 'Oferta de empleo');
    })

    it('issue3 div contains a table with correct second header', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('thead')
        .find('tr')
        .first()
        .find('th')
        .last()
        .should('have.text', 'Salario anual');
    })

    it('issue3 div contains correct first row job position name', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .first()
        .should('have.text', 'Desarrollador React');
    })

    it('issue3 div contains correct first row salary', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .find('td')
        .last()
        .should('have.text', '63913');
    })
    
    it('issue3 div contains correct second job position name', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .first()
        .should('have.text', 'Desarrollador iOS');
    })

    it('issue3 div contains correct second row salary', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('tbody')
        .find('tr')
        .eq(1)
        .find('td')
        .last()
        .should('have.text', '43948');
    })
    
    it('issue3 div contains correct third row job position name', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('tbody')
        .find('tr')
        .last()
        .find('td')
        .first()
        .should('have.text', 'Desarrollador Android');
    })

    it('issue3 div contains correct third row salary', () => {
        cy.get('div[data-cy=issue3]')
        .find('table')
        .find('tbody')
        .find('tr')
        .last()
        .find('td')
        .last()
        .should('have.text', '35313');
    })
})
  
