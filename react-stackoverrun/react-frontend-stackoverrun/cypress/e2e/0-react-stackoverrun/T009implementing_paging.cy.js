describe('implementing_paging', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/1/questions/1?**', (req) => {
      if ((req.query['page_size'] == 5) && (req.query['older_than'] == 1234)) {
        req.reply({statusCode: 200, fixture: 'question1-d1-size5-page2_v2.json' })
      } else if ((req.query['page_size'] == 5) && (req.query['older_than'] == 5555)) {
        req.alias = "correctSecondPageRequest"
        req.reply({statusCode: 200, fixture: 'question1-d1-empty_v2.json' })
      } else if (req.query['page_size'] == 5) {
        req.reply({statusCode: 200, fixture: 'question1-d1-size5_v2.json' })
      } else {
        req.reply({statusCode: 400 }) // Developer has sent a wrong request!
      }
    })
  })

  it('issue9 - dashboards/1/questions/1 page has correct load button', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('button[data-cy=moreItemsButton]')
    .should('have.text', 'Cargar más')
  })

  it('issue9 -dashboards/1/questions/1 page has correct amount of answers after click', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)

    cy.get('button[data-cy=moreItemsButton]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 6)
  })

  it('issue9 - dashboards/1/questions/1 page has correct answer 1 content after click', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)

    cy.get('button[data-cy=moreItemsButton]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(5)
    .find('p')
    .should('have.text', '¿A qué te refieres exactamente preguntando eso?')
  })

  it('issue9 - dashboards/1/questions/1 page has correct previous answer content after click', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)

    cy.get('button[data-cy=moreItemsButton]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(4)
    .find('p')
    .should('have.text', 'Aquí hay un enlace que puede ayudarte https://www.w3schools.com/js/js_loop_for.asp')
  })

  it('issue9 - dashboards/1/questions/1 page correctly sends load more request in 2nd page', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 5)

    cy.get('button[data-cy=moreItemsButton]')
    .click()

    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 6)

    cy.get('button[data-cy=moreItemsButton]')
    .click()

    cy.wait('@correctSecondPageRequest')
  })
})
