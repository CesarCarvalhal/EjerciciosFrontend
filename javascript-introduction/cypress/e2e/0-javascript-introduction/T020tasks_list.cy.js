/// <reference types="cypress" />

describe('tasks list', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/tasks.html');
        cy.reload(true);
    })


    it('issue20 header and div are correct', () => {
        cy.get("body")
        .find("h1[data-cy=pageHeader]")
        .should("have.text", "Tareas");


        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .should("have.length", 1);
    })

    
    it('issue20 html form tags are correct', () => {
        cy.get("body")
        .find("form[data-cy=taskForm]")
        .find("input[data-cy=input1]")
        .should("have.attr", "type", "text")

        cy.get("body")
        .find("form[data-cy=taskForm]")
        .find("input[data-cy=input1]")
        .should("have.attr", "placeholder", "Desc. Tarea")

        cy.get("body")
        .find("form[data-cy=taskForm]")
        .find("input[data-cy=input2]")
        .should("have.attr", "type", "number")

        cy.get("body")
        .find("form[data-cy=taskForm]")
        .find("input[data-cy=input2]")
        .should("have.attr", "placeholder", "Importancia")

        cy.get("body")
        .find("form[data-cy=taskForm]")
        .find("input[data-cy=inputSubmit]")
        .should("have.attr", "type", "submit")
    })

    it('issue20 one list item is added', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const r = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r);
        cy.get("input[data-cy=input2]")
        .type(r);
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
        .should("have.text", r);
    })

    it('issue20 two list items are added', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
        .find("ol")
        .find("li")
        .should("have.length", 0);

        const r = "" + Math.trunc(Math.random() * 500); // as string
        const r2 = "" + Math.trunc(Math.random() * 500); // as string

        cy.get("input[data-cy=input1]")
        .type(r);
        cy.get("input[data-cy=input2]")
        .type(r);
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
        .should("have.text", r);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input1]")
        .type(r2);
        cy.get("input[data-cy=input2]")
        .type(r);
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
        .should("have.text", r2);
    })

    it('issue20 three list items are added', () => {
        cy.get("body")
        .find("div[data-cy=mainDiv]")
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
        .should("have.text", r);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input1]")
        .type(r2);
        cy.get("input[data-cy=input2]")
        .type(r);
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
        .should("have.text", r2);

        cy.get("input[data-cy=input1]").clear();
        cy.get("input[data-cy=input2]").clear();
        cy.get("input[data-cy=input1]")
        .type(r3);
        cy.get("input[data-cy=input2]")
        .type(r);
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
        .should("have.text", r3);
    })

    it('issue20 a href exists in index.html', () => {
        cy.visit('http://localhost:8000/');
        cy.reload(true);

        cy.get("a[data-cy=linkTasks]")
        .should("have.attr", "href", "/tasks.html");

        cy.get("a[data-cy=linkTasks]")
        .should("have.text", "Gestor de tareas");
        
        cy.get("a[data-cy=linkTasks]")
        .click();
    })
})

