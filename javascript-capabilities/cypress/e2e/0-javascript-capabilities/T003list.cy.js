/// <reference types="cypress" />

describe('generating random name', () => {
    let parameter1;
    beforeEach(() => {
        cy.visit('http://localhost:8000/projects/nameGenerator.html');
        cy.reload(true); // Force-reload to prevent cache errors
    })

    it('issue3 list has been added', () => {
        cy.get('body')
        .find('ol[data-cy=listOfRandomNames]')
        .should('have.attr', 'id', 'randomNamesList');
    })
  
    it('issue3 list elements are correct', () => {
        for (let i = 0; i < 30; i++) {
            cy.get('ol[data-cy=listOfRandomNames]')
            .find('li')
            .eq(i)
            .then($li => {
                const name = $li.text();
                assertStringIsValidRandomName(name);
            })
        }
    })

    function assertStringIsValidRandomName(string) {
        let containsChoice1 = false;
        for (const c of ['Mega', 'Turbo', 'Hiper', 'Super', 'Great', 'Big', 'Small', 'Nitro', 'Shadow', 'Random']) {
            if (string.includes(c)) {
                containsChoice1 = true;
            }
        }
        expect(containsChoice1).to.be.eq(true);
        let containsChoice2 = false;
        for (const c of ['Dog', 'Cat', 'Lizard', 'Croco', 'Coconut', 'Apple', 'Demon', 'Car', 'Tree', 'Light', 'JavaScript']) {
            if (string.includes(c)) {
                containsChoice2 = true;
            }
        }
        expect(containsChoice2).to.be.eq(true);
        const number = parseInt(string.substring(string.length - 5));
        expect(number).to.be.gte(10518);
        expect(number).to.be.lte(10518 + 64);
    }
  })
