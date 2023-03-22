/// <reference types="cypress" />

describe('draggable note', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/kanban.html');
      cy.reload(true);
    })
  
    it('issue6 task0 was added and is correct', () => {
        cy.get('div.kanbanColumn')
        .first()
        .find('div[id=task0]')
        .should('have.attr', 'draggable', 'true');

        cy.get('div[id=task0]')
        .should('have.css', 'background-color', 'rgb(250, 250, 7)');

        cy.get('div[id=task0]')
        .contains('Detección de colisiones entre dos objetos 2D en JS');
    })
})
