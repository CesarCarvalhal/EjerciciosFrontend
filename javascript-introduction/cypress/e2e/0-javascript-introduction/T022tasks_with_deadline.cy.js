/// <reference types="cypress" />

describe('tasks list by deadline', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/tasks.html');
        cy.reload(true); // Force-reload to prevent cache errors
    })

    it('issue22 button Ordenar exists and is correct', () => {
        cy.get("button[data-cy=sortByDeadlineButton]")
        .should('have.text', 'Ordenar por fecha');
    })

    
    it('issue22 three list items are added without order', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = (Math.trunc(Math.random() * 10) + 1980) + "-01-01";
        const medium = (Math.trunc(Math.random() * 10) + 1991) + "-01-01";
        const big = (Math.trunc(Math.random() * 10) + 2005) + "-01-01";

        addThreeItems(small, medium, big);
    })

    
    it('issue22 three tasks are correctly ordered by deadline', () => {
        testThreeItemsOrdering();
    })

    it('issue22 three tasks are correctly ordered by deadline (II)', () => {
        testThreeItemsOrdering();
    })

    it('issue22 three tasks are correctly ordered by deadline (III)', () => {
        testThreeItemsOrdering();
    })

    const addThreeItems = (small, medium, big) => {
        cy.get("input[data-cy=input1]")
        .type(small);
        cy.get("input[data-cy=input2]")
        .type(0);
        cy.get("input[data-cy=input3]")
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
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(big);
        cy.get("input[data-cy=input2]")
        .type(100);
        cy.get("input[data-cy=input3]")
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
        cy.get("input[data-cy=input3]").clear();
        cy.get("input[data-cy=input1]")
        .type(medium);
        cy.get("input[data-cy=input2]")
        .type(50);
        cy.get("input[data-cy=input3]")
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

    const testThreeItemsOrdering = () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const small = (Math.trunc(Math.random() * 10) + 1980) + "-01-01";
        const medium = (Math.trunc(Math.random() * 10) + 1991) + "-01-01";
        const big = (Math.trunc(Math.random() * 10) + 2005) + "-01-01";

        addThreeItems(small, medium, big);

        cy.get("button[data-cy=sortByDeadlineButton]").click();

        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .eq(0)
        .should("have.text", small);

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
        .should("have.text", big);
    }
})
