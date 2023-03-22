/// <reference types="cypress" />

describe('a_chat_room_1', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/', {
          // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
          onBeforeLoad(win) {
              cy.stub(win.console, 'log').as('consoleLog')
            }
        })
    })
  
    it('issue16 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue16]')
        .find('h1')
        .should('have.text', 'Ejercicio 16');
    })

    it('issue16 div ul has appropriate length', () => {
        cy.get('div[data-cy=issue16]')
        .find('ul')
        .find('li')
        .should('have.length', 2);
    })

    it('issue16 div ul has appropriate first element', () => {
        cy.get('div[data-cy=issue16]')
        .find('ul')
        .find('li')
        .first()
        .should('have.text', 'Aquí estamos');
    })

    it('issue16 div ul has appropriate second element', () => {
        cy.get('div[data-cy=issue16]')
        .find('ul')
        .find('li')
        .last()
        .should('have.text', 'Seremos la bomba');
    })
})
