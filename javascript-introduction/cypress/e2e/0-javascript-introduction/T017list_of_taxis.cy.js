/// <reference types="cypress" />

describe('vehicles on html', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/taxis.html')
        cy.reload(true); // Force-reload to prevent cache errors
    })

    it('issue17 ol has been added and is empty', () => {
        cy.get("ol[data-cy=orderedListOfTaxis]");
        
        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .should("have.length", 1);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 0);
    })

    it('issue17 one list item is added', () => {
        cy.get("ol[data-cy=orderedListOfTaxis]");
        
        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const r = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r);
        cy.get("input[data-cy=input2]")
        .type(r);
        cy.get("input[data-cy=input3]")
        .type(r);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 1);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .first()
        .should("have.text", r);
    })

    it('issue17 two list items are added', () => {
        cy.get("ol[data-cy=orderedListOfTaxis]");
        
        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const r = "" + Math.trunc(Math.random() * 500); // as string
        const r2 = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r);
        cy.get("input[data-cy=input2]")
        .type(r);
        cy.get("input[data-cy=input3]")
        .type(r);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 1);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .first()
        .should("have.text", r);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(r2);
        cy.get("input[data-cy=input2]")
        .type(r);
        cy.get("input[data-cy=input3]")
        .type(r);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 2);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .last()
        .should("have.text", r2);
    })

    it('issue17 three list items are added', () => {
        cy.get("ol[data-cy=orderedListOfTaxis]");
        
        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const r = "" + Math.trunc(Math.random() * 500); // as string
        const r2 = "" + Math.trunc(Math.random() * 500); // as string
        const r3 = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r);
        cy.get("input[data-cy=input2]")
        .type(r);
        cy.get("input[data-cy=input3]")
        .type(r);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 1);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .first()
        .should("have.text", r);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(r2);
        cy.get("input[data-cy=input2]")
        .type(r);
        cy.get("input[data-cy=input3]")
        .type(r);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 2);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .last()
        .should("have.text", r2);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(r3);
        cy.get("input[data-cy=input2]")
        .type(r2);
        cy.get("input[data-cy=input3]")
        .type(r2);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 3);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .last()
        .should("have.text", r3);
    })
})
