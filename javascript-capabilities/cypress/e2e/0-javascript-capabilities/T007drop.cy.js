/// <reference types="cypress" />

describe('draggable note', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/kanban.html');
      cy.reload(true);
    })
  
    it('issue7 task0 can be freely moved to any column', () => {
        checkTaskCanBeMovedFromToColumn(0, 1);
        checkTaskCanBeMovedFromToColumn(1, 2);
        checkTaskCanBeMovedFromToColumn(2, 3);
        checkTaskCanBeMovedFromToColumn(3, 4);
        checkTaskCanBeMovedFromToColumn(4, 0);
    })

    function checkTaskCanBeMovedFromToColumn(sourceCol, destCol) {
        const dataTransfer = new DataTransfer();

        // Note is not in destination column at the beginning
        cy.get('div.kanbanColumn')
        .eq(destCol)
        .find('div[id=task0]')
        .should('not.exist');

        // Find and drag the note
        cy.get('div.kanbanColumn')
        .eq(sourceCol)
        .find('div[id=task0]')
        .trigger('dragstart', {
            dataTransfer
        });

        // Drop it
        cy.get('div.kanbanColumn')
        .eq(destCol)
        .trigger('drop', {
            dataTransfer
        });

        // Now assert that note is in destination
        cy.get('div.kanbanColumn')
        .eq(destCol)
        .find('div[id=task0]');

        // ...and no longer in source
        cy.get('div.kanbanColumn')
        .eq(sourceCol)
        .find('div[id=task0]')
        .should('not.exist');
    }
})

