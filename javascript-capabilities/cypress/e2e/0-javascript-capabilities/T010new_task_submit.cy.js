/// <reference types="cypress" />

describe('new task form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/kanban.html');
      cy.reload(true);
    })
    
    it('issue10 new task with red color is created', () => {
        assertAddedNoteTypeAndBackground('urgent', 'rgb(237, 0, 0)');
    })

    it('issue10 new task with green color is created', () => {
        assertAddedNoteTypeAndBackground('backend', 'rgb(0, 191, 109)');
    })

    it('issue10 new task with blue color is created', () => {
        assertAddedNoteTypeAndBackground('frontend', 'rgb(61, 151, 255)');
    })
    
    it('issue10 alert is shown when min characters are not met', () => {
        const stub = cy.stub()  
        cy.on ('window:alert', stub)

        let text = "";
        for (let i = 1; i < 7; i++) {
            text = text + "a";
        }
        cy.get('input[data-cy=inputAddTaskName]')
        .type(text);

        cy.get('input[data-cy=inputCreateTaskSubmit]')
        .click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('El título de tu tarea debe tener por lo menos 7 caracteres');
        });

        cy.get('input[data-cy=inputAddTaskName]')
        .type("a");

        cy.get('input[data-cy=inputCreateTaskSubmit]')
        .click().then(() => {
            expect(stub.getCall(1)).to.not.exist;
        });
    })
    
    function assertAddedNoteTypeAndBackground(type, backgroundColor) {
        const randName = "HolaCaracola" + Math.trunc(Math.random() * 10000);

        cy.get('input[data-cy=inputAddTaskName]')
        .type(randName);

        cy.get('select[data-cy=inputAddTaskType]')
        .select(type);

        cy.get('input[data-cy=inputCreateTaskSubmit]')
        .click();

        cy.get('div#notStartedColumn')
        .find('div')
        .contains(randName)
        .should('have.css', 'background-color', backgroundColor);

        // assert that only the initial note and the added one are there
        cy.get('div#notStartedColumn')
        .find('div')
        .should('have.length', 2);
    }
})
