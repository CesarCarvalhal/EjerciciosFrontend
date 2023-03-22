/// <reference types="cypress" />

describe('fullscreen', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/projects/kanban.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/projects/kanban.html', {
            onBeforeLoad(win) {
            // Stub your functions here
            cy.stub(win.console, 'log').as('consoleLog')
          },
        })
    })

    it('issue8 button is there', () => {
        cy.get('div[data-cy=pageToolsBarContainer]')
        .find('div[data-cy=fullscreenButtonContainer]')
        .should('have.css', 'float', 'right');

        cy.get('div[data-cy=pageToolsBarContainer]')
        .find('div[data-cy=fullscreenButtonContainer]')
        .find('button[data-cy=fullscreenButton]')
        .should('have.text', 'Pantalla completa')
    })

    it('issue8 button triggers function', () => {
        cy.once('uncaught:exception', () => false); // Ignore fullscreen requested -> false, which is expected during automated test

        cy.get('div[data-cy=pageToolsBarContainer]')
        .find('div[data-cy=fullscreenButtonContainer]')
        .find('button[data-cy=fullscreenButton]')
        .click();

        cy.get('@consoleLog').should('be.calledWith', "Fullscreen has been requested");
    })
})
