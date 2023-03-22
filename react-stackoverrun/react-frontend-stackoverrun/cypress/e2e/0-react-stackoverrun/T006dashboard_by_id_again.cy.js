describe('dashboard_by_id_again', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/1', (req) => {
      req.reply({statusCode: 200, fixture: 'dashboard1_v2.json'})
    })
    cy.intercept('GET', '**/api/v2/dashboards/1?*', (req) => {
      req.reply({statusCode: 200, fixture: 'dashboard1_v2.json'})
    })
    cy.intercept('GET', '**/api/v2/dashboards/2', (req) => {
      req.reply({statusCode: 200, fixture: 'dashboard2_v2.json'})
    })
    cy.intercept('GET', '**/api/v2/dashboards/2?*', (req) => {
      req.reply({statusCode: 200, fixture: 'dashboard2_v2.json'})
    })
  })

  it('issue6 - dashboard 1 page has correct empty data at first', () => {
    cy.visit('http://localhost:3000/dashboards/1')

    cy.get('h1[data-cy=header]')
    .should('have.text', '')
    cy.get('h3[data-cy=description]')
    .should('have.text', '')
    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 0)
  })

  it('issue6 - dashboard 1 page has correct data after load', () => {
    cy.visit('http://localhost:3000/dashboards/1')
    cy.wait(1000)

    cy.get('h1[data-cy=header]')
    .should('have.text', 'Mundo JavaScript')
    cy.get('h3[data-cy=description]')
    .should('have.text', '¿Cómo se formatea una fecha? ¿Qué es eso de la sintaxis async-await? ¿Esto es compatible con versiones anteriores? El hueco para amantes de JavaScript y personas con dudas sobre programación en este mundo')
    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 1)
  })

  it('issue6 - dashboard 1 page has correct QUESTION after load', () => {
    cy.visit('http://localhost:3000/dashboards/1')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .first()
    .find('h3')
    .should('have.text', 'Bucles for')

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .first()
    .find('p')
    .should('have.text', '¿Cómo son los bucles for en JavaScript?')
  })

  it('issue6 - dashboard 1 page has correct QUESTION CSS', () => {
    cy.visit('http://localhost:3000/dashboards/1')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .first()
    .should('have.css', 'margin', '28px')
    .should('have.css', 'padding', '5px')
    .should('have.css', 'background-color', 'rgba(221, 230, 243, 0.5)')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'border-radius', '15px')
    .should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px')
  })

  it('issue6 - dashboard 2 page has correct empty data at first', () => {
    cy.visit('http://localhost:3000/dashboards/2')

    cy.get('h1[data-cy=header]')
    .should('have.text', '')
    cy.get('h3[data-cy=description]')
    .should('have.text', '')
    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 0)
  })

  it('issue6 - dashboard 2 page has correct data after load', () => {
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    cy.get('h1[data-cy=header]')
    .should('have.text', 'React')
    cy.get('h3[data-cy=description]')
    .should('have.text', 'Para preguntar sobre cuestiones de React y su uso')
    cy.get('div[data-cy=questionsList]')
    .find('div')
    .should('have.length', 7)
  })

  it('issue6 - dashboard 2 page has correct QUESTION correctly navigates when clicked', () => {
    cy.visit('http://localhost:3000/dashboards/2')
    cy.wait(1000)

    cy.get('div[data-cy=questionsList]')
    .find('div')
    .eq(5)
    .click()

    cy.url()
    .should('be.equal', 'http://localhost:3000/dashboards/2/questions/13')  })
})
