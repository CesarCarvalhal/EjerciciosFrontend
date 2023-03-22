/// <reference types="cypress" />

describe('infinite scroll', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/projects/nameGenerator.html');
      cy.reload(true);
    })
  
    it('issue4 paragraph exists and amount is initially correct', () => {
        cy.get('p[data-cy=textLoadingMoreNames]')
        .should('have.text', 'Produciendo más...');

        cy.get('ol[data-cy=listOfRandomNames]')
        .find('li')
        .should('have.length.lte', 60);
    })

    it('issue4 amount of names gets correctly updated', () => {
        cy.get('ol[data-cy=listOfRandomNames]')
        .find('li')
        .should('have.length.lte', 60)
        .then($p => {
            cy.scrollTo(0, 1000);

            cy.get('ol[data-cy=listOfRandomNames]')
            .find('li')
            .should('have.length.gt', $p.length)
            .should('have.length.lte', $p.length + 120)

            // Check all names are valid
            for (let i = 0; i < 30; i++) {
                cy.get('ol[data-cy=listOfRandomNames]')
                .find('li')
                .eq(i)
                .then($li => {
                    const name = $li.text();
                    assertStringIsValidRandomName(name);
                })
            }
        });
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
