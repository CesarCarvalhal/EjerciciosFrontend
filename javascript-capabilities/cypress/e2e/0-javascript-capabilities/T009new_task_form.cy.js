/// <reference types="cypress" />

describe('new task form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/kanban.html');
      cy.reload(true);
    })
  
    it('issue9 new task form is created and contains correct amount of children', () => {
        cy.get('div[data-cy=pageToolsBarContainer]')
        .find('div[data-cy=fullscreenButtonContainer]')
        .next()
        .should('have.attr', 'data-cy', 'newTaskContainer')

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('label')
        .should('have.length', 1);

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('input')
        .should('have.length', 2);

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select')
        .should('have.length', 1);
    })

    it('issue9 new task form label is correct', () => {
        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('label')
        .find('b')
        .contains('Crear tarea:');
    })

    it('issue9 new task form inputs are correct', () => {
        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('input[data-cy=inputAddTaskName]')
        .should('have.attr', 'placeholder', 'Funcionalidad de fullscreen')
        .should('have.attr', 'type', 'text')
        .should('have.attr', 'name', 'inputTaskName');

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select[data-cy=inputAddTaskType]')
        .should('have.attr', 'name', 'inputTaskType');

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select[data-cy=inputAddTaskType]')
        .find('option')
        .should('have.length', 4);

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select[data-cy=inputAddTaskType]')
        .find('option')
        .eq(0)
        .should('have.attr', 'value', 'other')
        .contains('Otro');

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select[data-cy=inputAddTaskType]')
        .find('option')
        .eq(1)
        .should('have.attr', 'value', 'backend')
        .contains('Backend');

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select[data-cy=inputAddTaskType]')
        .find('option')
        .eq(2)
        .should('have.attr', 'value', 'frontend')
        .contains('Frontend');

        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('select[data-cy=inputAddTaskType]')
        .find('option')
        .eq(3)
        .should('have.attr', 'value', 'urgent')
        .contains('Urgente');
        
        cy.get('div[data-cy=newTaskContainer]')
        .find('form[data-cy=formNewTask]')
        .find('input[data-cy=inputCreateTaskSubmit]')
        .should('have.attr', 'type', 'submit')
        .contains('Crear tarea');
    })

    it('issue9 top bar css was added', () => {
        cy.get('div[data-cy=pageToolsBarContainer]')
        .should('have.css', 'background-color', 'rgb(229, 255, 241)')
    })
})
