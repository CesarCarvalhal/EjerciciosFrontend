describe('searching', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/2**', (req) => {
      if (req.query['search'] == 'React Native') {
        req.reply({statusCode: 200, fixture: 'dashboard2-searchR1_v2.json' })
      } else if (req.query['search'] == 'Papelera') {
        req.reply({statusCode: 200, fixture: 'dashboard2-searchR0_v2.json' })
      } else {
        req.reply({statusCode: 200, fixture: 'dashboard2_v2.json' })
      }
    })
  })

  it('issue11 - dashboard 2 form has correct placeholder and submit text', () => {
    cy.visit('http://localhost:3000/dashboards/2')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=inputSearch]')
    .should('have.attr', 'placeholder', 'programación')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=submitInput]')
    .should('have.attr', 'value', 'Buscar')
  })

  it('issue11 - dashboard 2 has correct amount of results when searching React Native', () => {
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 7);

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=inputSearch]')
    .type('React Native')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=submitInput]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 1);
  })

  it('issue11 - dashboard 2 has correct results content when searching React Native', () => {
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 7);

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=inputSearch]')
    .type('React Native')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=submitInput]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 1);

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .first()
    .find('h3')
    .should('have.text', 'ReactNative')

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .first()
    .find('p')
    .should('have.text', 'He escuchado hablar de React Native... ¿Qué es?')
  })

  it('issue11 - dashboard 2 has correct amount of results when searching Papelera', () => {
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 7);

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=inputSearch]')
    .type('Papelera')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=submitInput]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 0);
  })

  it('issue11 - dashboard 2 has correct amount of results after searching twice', () => {
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 7);

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=inputSearch]')
    .type('Papelera')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=submitInput]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 0);

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=inputSearch]')
    .clear()
    .type('React Native')

    cy.get('form[data-cy=searchForm]')
    .find('input[data-cy=submitInput]')
    .click()

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 1);
  })
})

