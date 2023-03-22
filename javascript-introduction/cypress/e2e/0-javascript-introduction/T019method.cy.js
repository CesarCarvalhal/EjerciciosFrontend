/// <reference types="cypress" />

describe('ordering taxis', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/taxis.html');
        cy.reload(true); // Force-reload to prevent cache errors
    })


    it('issue19 one list item is added', () => {
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

    it('issue19 three list items are added', () => {
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

    
    it('issue19 button Ordenar exists and is correct', () => {
        cy.get("button[data-cy=sortButton]")
        .should('have.text', 'Ordenar');
    })

    
    it('issue19 three taxis are correctly ordered', () => {
        cy.get("ol[data-cy=orderedListOfTaxis]");

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = "" + Math.trunc(Math.random() * 500); // as string
        const medium = "" + (Math.trunc(Math.random() * 500) + 1000); // as string
        const big = "" + (Math.trunc(Math.random() * 500) + 2000); // as string

        cy.get("input[data-cy=input1]")
        .type(small);
        cy.get("input[data-cy=input2]")
        .type(small);
        cy.get("input[data-cy=input3]")
        .type(small);
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
        .should("have.text", small);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(big);
        cy.get("input[data-cy=input2]")
        .type(big);
        cy.get("input[data-cy=input3]")
        .type(big);
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
        .should("have.text", big);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(medium);
        cy.get("input[data-cy=input2]")
        .type(medium);
        cy.get("input[data-cy=input3]")
        .type(medium);
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
        .should("have.text", medium);

        cy.get("button[data-cy=sortButton]").click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(0)
        .should("have.text", small);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(1)
        .should("have.text", medium);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(2)
        .should("have.text", big);
    })

    
    it('issue19 four taxis are correctly ordered', () => {
        cy.get("ol[data-cy=orderedListOfTaxis]");
        
        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = "" + Math.trunc(Math.random() * 500); // as string
        const medium = "" + (Math.trunc(Math.random() * 500) + 1000); // as string
        const big = "" + (Math.trunc(Math.random() * 500) + 2000); // as string
        const huge = "" + (Math.trunc(Math.random() * 500) + 3000); // as string

        cy.get("input[data-cy=input1]")
        .type(small);
        cy.get("input[data-cy=input2]")
        .type(small);
        cy.get("input[data-cy=input3]")
        .type(small);
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
        .should("have.text", small);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(big);
        cy.get("input[data-cy=input2]")
        .type(big);
        cy.get("input[data-cy=input3]")
        .type(big);
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
        .should("have.text", big);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(medium);
        cy.get("input[data-cy=input2]")
        .type(medium);
        cy.get("input[data-cy=input3]")
        .type(medium);
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
        .should("have.text", medium);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(huge);
        cy.get("input[data-cy=input2]")
        .type(huge);
        cy.get("input[data-cy=input3]")
        .type(huge);
        cy.get("input[data-cy=input4]")
        .click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .should("have.length", 4);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .last()
        .should("have.text", huge);

        cy.get("button[data-cy=sortButton]").click();

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(0)
        .should("have.text", small);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(1)
        .should("have.text", medium);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(2)
        .should("have.text", big);

        cy.get("body")
        .find("div[data-cy=main]")
        .find("ol")
        .find("li")
        .eq(3)
        .should("have.text", huge);
    })
})
