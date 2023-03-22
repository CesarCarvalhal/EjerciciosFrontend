/// <reference types="cypress" />

describe('taxis form', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/deathrace.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/taxis.html', {
            onBeforeLoad(win) {
            // Stub your functions here
            cy.stub(win.console, 'log').as('consoleLog')
          },
        })
    })

    it('issue16 external js has been created', () => {
        cy.request('http://localhost:8000/taxiAdmin.js')
    })

    it('issue16 html non-form tags are correct', () => {
        cy.get("body")
        .find("h4[data-cy=pageHeader]")
        .should("have.text", "Taxis")

        cy.get("body")
        .find("div[data-cy=main]")
    })

    it('issue16 html form tags are correct', () => {
        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input1]")
        .should("have.attr", "type", "text")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input1]")
        .should("have.attr", "name", "inputName")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input1]")
        .should("have.attr", "placeholder", "Nombre")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input2]")
        .should("have.attr", "type", "number")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input2]")
        .should("have.attr", "name", "inputKms")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input2]")
        .should("have.attr", "placeholder", "Kms")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input3]")
        .should("have.attr", "type", "number")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input3]")
        .should("have.attr", "name", "inputTravelCount")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input3]")
        .should("have.attr", "placeholder", "Viajes")

        cy.get("body")
        .find("form[data-cy=taxiForm]")
        .find("input[data-cy=input4]")
        .should("have.attr", "type", "submit")
    })

    
    it('issue16 console log is correct after insertion', () => {
        const r1 = "" + Math.trunc(Math.random() * 500); // as string
        const r2 = "" + Math.trunc(Math.random() * 500); // as string
        const r3 = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r1);

        cy.get("input[data-cy=input2]")
        .type(r2);

        cy.get("input[data-cy=input3]")
        .type(r3);

        cy.get("input[data-cy=input4]")
        .click();

       
        cy.get('@consoleLog').should('be.calledWith', "Añadidos datos de taxista:");
        cy.get('@consoleLog').should('be.calledWith', r1);
        cy.get('@consoleLog').should('be.calledWith', r2);
        cy.get('@consoleLog').should('be.calledWith', r3);
    })
})

