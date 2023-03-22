/// <reference types="cypress" />

describe('vehicles', () => {
    // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-spy-on-console-log
    beforeEach(() => {
        cy.visit('http://localhost:8000/deathrace.html');
        cy.reload(true); // Force-reload to prevent cache errors
        cy.visit('http://localhost:8000/deathrace.html', {
            onBeforeLoad(win) {
            // Stub your functions here
            cy.stub(win.console, 'log').as('consoleLog')
          },
        })
    })


    it('issue10 console log is correct for simple for..of', () => {
        for (const runner of runners) {
            cy.get('@consoleLog').should('be.calledWith', runner);
        }
    })

    it('issue10 console log is correct for complex for..of', () => {
        cy.get('@consoleLog').should('be.calledWith', "Información de la parrilla en el array de objetos");
        for (const runner of runners) {
            cy.get('@consoleLog').should('be.calledWith', "Conductor: " + runner.name + "; Vehículo: " + runner.car);
        }
    })

    const runners = [
        {
            "name": "Manson",
            "car": "Peugeot 208"
        },
        {
            "name": "Fury",
            "car": "Volkswagen Golf"
        },
        {
            "name": "Storm",
            "car": "Dacia Sandero"
        },
        {
            "name": "Kelloggs",
            "car": "Renault Clio"
        },
        {
            "name": "Scarecrow",
            "car": "Tesla Model 3"
        },
        {
            "name": "Number",
            "car": "Hyundai Tucson"
        },
        {
            "name": "Bull",
            "car": "Fiat Panda"
        },
    ]
})

