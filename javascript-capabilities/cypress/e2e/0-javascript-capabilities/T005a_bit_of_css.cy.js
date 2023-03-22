/// <reference types="cypress" />

describe('initial kanban board', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/');
      cy.reload(true);
    })
  
    it('issue5 index.html is correctly modified', () => {
        cy.get('ol[data-cy=projectsList]')
        .find('li')
        .eq(1)
        .find('a')
        .should('have.text', 'Tablero kanban');
    })

    it('issue5 kanban.html has initial 5 column titles correct', () => {
        cy.get('ol[data-cy=projectsList]')
        .find('li')
        .eq(1)
        .find('a')
        .click();

        cy.get('div.kanbanColumn')
        .first()
        .should('have.class', 'column1');
        cy.get('div.kanbanColumn')
        .eq(1)
        .should('have.class', 'column2');
        cy.get('div.kanbanColumn')
        .eq(2)
        .should('have.class', 'column3');
        cy.get('div.kanbanColumn')
        .eq(3)
        .should('have.class', 'column4');
        cy.get('div.kanbanColumn')
        .eq(4)
        .should('have.class', 'column5');
        
        cy.get('div.kanbanColumn')
        .first()
        .find('h3')
        .should('have.text', 'Por hacer');
        cy.get('div.kanbanColumn')
        .eq(1)
        .find('h3')
        .should('have.text', 'Diseño');
        cy.get('div.kanbanColumn')
        .eq(2)
        .find('h3')
        .should('have.text', 'Implementación');
        cy.get('div.kanbanColumn')
        .eq(3)
        .find('h3')
        .should('have.text', 'Tests');
        cy.get('div.kanbanColumn')
        .eq(4)
        .find('h3')
        .should('have.text', 'Acabado');
  })

  it('issue5 kanban.html has initial 5 column styles correct', () => {
    cy.request('http://localhost:8000/projects/css/kanban.css');
    
    cy.get('ol[data-cy=projectsList]')
    .find('li')
    .eq(1)
    .find('a')
    .click();

    cy.get('div.kanbanColumn')
    .first()
    .should('have.css', 'background-color', 'rgb(255, 185, 185)')
    .should('have.css', 'float', 'left');
    cy.get('div.kanbanColumn')
    .eq(1)
    .should('have.css', 'background-color', 'rgb(255, 185, 242)')
    .should('have.css', 'float', 'left');
    cy.get('div.kanbanColumn')
    .eq(2)
    .should('have.css', 'background-color', 'rgb(255, 230, 181)')
    .should('have.css', 'float', 'left');
    cy.get('div.kanbanColumn')
    .eq(3)
    .should('have.css', 'background-color', 'rgb(244, 255, 181)')
    .should('have.css', 'float', 'left');
    cy.get('div.kanbanColumn')
    .eq(4)
    .should('have.css', 'background-color', 'rgb(239, 255, 181)')
    .should('have.css', 'float', 'left');
  })
})
