/// <reference types="cypress" />

describe('new task bug solved', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/kanban.html');
      cy.reload(true);
    })
  
    it('issue11 two tasks are generated and the second task can be moved to 2nd column', () => {
        checkTwoTasksAddedAndSecondIsCorrectlyMoved(1);
    })

    it('issue11 three tasks are generated and movements work', () => {
        checkTwoTasksAddedAndSecondIsCorrectlyMoved(2);
        checkTwoTasksAddedAndSecondIsCorrectlyMoved(3);
    })

    it('issue11 four tasks are generated and movements work', () => {
        checkTwoTasksAddedAndSecondIsCorrectlyMoved(4);
        checkTwoTasksAddedAndSecondIsCorrectlyMoved(0);
        checkTwoTasksAddedAndSecondIsCorrectlyMoved(1);
    })

    function checkTwoTasksAddedAndSecondIsCorrectlyMoved(destCol) {
        const randTitle1 = "HolaCaracola" + Math.trunc(Math.random() * 10000);
        const randTitle2 = "HolaCaracola" + Math.trunc(Math.random() * 10000);

        addTask(randTitle1, "other");
        addTask(randTitle2, "frontend");
        
        const dataTransfer = new DataTransfer();

        // Drag the note
        cy.get('div#notStartedColumn')
        .find('div')
        .contains(randTitle2)
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
        .find('div')
        .contains(randTitle2);
    }

    function addTask(title, type) {
        cy.get('input[data-cy=inputAddTaskName]')
        .type(title);

        cy.get('select[data-cy=inputAddTaskType]')
        .select(type);

        cy.get('input[data-cy=inputCreateTaskSubmit]')
        .click();

        cy.get('div#notStartedColumn')
        .find('div')
        .contains(title);
    }
})

