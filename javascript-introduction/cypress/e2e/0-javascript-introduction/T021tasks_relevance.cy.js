/// <reference types="cypress" />

describe('tasks list by relevance', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/tasks.html');
        cy.reload(true); // Force-reload to prevent cache errors
    })

    it('issue21 button Ordenar exists and is correct', () => {
        cy.get("button[data-cy=sortByImportanceButton]")
        .should('have.text', 'Ordenar por relevancia');
    })

    
    it('issue21 three list items are added without order', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = "" + Math.trunc(Math.random() * 500); // as string
        const medium = "" + (Math.trunc(Math.random() * 500) + 1000); // as string
        const big = "" + (Math.trunc(Math.random() * 500) + 2000); // as string

        addThreeItems(small, medium, big);
    })

    
    it('issue21 three tasks are correctly ordered by relevance', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = "" + Math.trunc(Math.random() * 500); // as string
        const medium = "" + (Math.trunc(Math.random() * 500) + 1000); // as string
        const big = "" + (Math.trunc(Math.random() * 500) + 2000); // as string

        addThreeItems(small, medium, big);

        cy.get("button[data-cy=sortByImportanceButton]").click();

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(0)
        .should("have.text", big);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(1)
        .should("have.text", medium);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(2)
        .should("have.text", small);
    })

    it('issue21 three tasks are correctly ordered by relevance (II)', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = "" + Math.trunc(Math.random() * 500); // as string
        const medium = "" + (Math.trunc(Math.random() * 500) + 1000); // as string
        const big = "" + (Math.trunc(Math.random() * 500) + 2000); // as string

        addThreeItems(small, medium, big);

        cy.get("button[data-cy=sortByImportanceButton]").click();

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(0)
        .should("have.text", big);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(1)
        .should("have.text", medium);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(2)
        .should("have.text", small);
    })


    const addThreeItems = (small, medium, big) => {
        cy.get("input[data-cy=input1]")
        .type(small);
        cy.get("input[data-cy=input2]")
        .type(small);
        cy.get("input[data-cy=inputSubmit]")
        .click();

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 1);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .first()
        .should("have.text", small);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input1]")
        .type(big);
        cy.get("input[data-cy=input2]")
        .type(big);
        cy.get("input[data-cy=inputSubmit]")
        .click();

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 2);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .last()
        .should("have.text", big);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input1]")
        .type(medium);
        cy.get("input[data-cy=input2]")
        .type(medium);
        cy.get("input[data-cy=inputSubmit]")
        .click();

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 3);

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .last()
        .should("have.text", medium);
    } 
    
})
