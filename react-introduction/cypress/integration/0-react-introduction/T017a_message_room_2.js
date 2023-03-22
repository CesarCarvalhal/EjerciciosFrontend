/// <reference types="cypress" />

describe('a_chat_room_1', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('issue17 div contains an appropriate h1', () => {
        cy.get('div[data-cy=issue17]')
        .find('h1')
        .should('have.text', 'Ejercicio 17');
    })

    it('issue17 div ul has appropriate length', () => {
        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .should('have.length', 0);
    })

    it('issue17 div form has appropriate input placeholder', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .should('have.attr', 'placeholder', 'Nuevo mensaje');
    })

    it('issue17 div form  has appropriate button text', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .should('have.text', 'Enviar');
    })

    it('issue17 div has appropriate paragraph', () => {
        cy.get('div[data-cy=issue17]')
        .find('p[data-cy=issue17paragraph]')
        .should('have.text', 'Cantidad de mensajes: 0');
    })

    it('issue17 form adds 1 element correctly', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .type('HOLA CARACOLA');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .should('have.length', 1);

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .first()
        .should('have.text', 'HOLA CARACOLA');
    })

    it('issue17 form adds 2 elements correctly', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .type('HOLA CARACOLAS');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .should('have.length', 1);

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .first()
        .should('have.text', 'HOLA CARACOLAS');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .type('HOLA CARACOLOS');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .should('have.length', 2);

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .last()
        .should('have.text', 'HOLA CARACOLOS');
    })

    it('issue17 paragraph gets correctly updated once', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .type('PRUEBA');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();

        cy.get('div[data-cy=issue17]')
        .find('p[data-cy=issue17paragraph]')
        .should('have.text', 'Cantidad de mensajes: 1');
    })

    it('issue17 paragraph gets correctly updated twice', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .type('PRUEBA');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('input[data-cy=issue17input]')
        .type('PRUEBA');

        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();
        
        cy.get('div[data-cy=issue17]')
        .find('p[data-cy=issue17paragraph]')
        .should('have.text', 'Cantidad de mensajes: 2');
    })

    it('issue17 empty elements cannot be added', () => {
        cy.get('div[data-cy=issue17]')
        .find('form[data-cy=form3644]')
        .find('button[data-cy=issue17button]')
        .click();

        cy.get('div[data-cy=issue17]')
        .find('ul')
        .find('li')
        .should('have.length', 0);
    })
})
