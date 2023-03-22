describe('intro_rest_apis', () => {
  beforeEach(() => {
    /* Thanks, buddy: https://testersdock.com/cypress-mock-api/ */
    cy.server()
    cy.route('GET', '**/api/v1/dashboards', 'fixture:dashboardsList.json')
    cy.visit('http://localhost:3000/examples')
  })

  it('issue15 - examples page div has correct header', () => {
    cy.get('div[data-cy=issue15div]')
    .find('h1')
    .should('have.text', 'Ejercicio 15')
  })

  it('issue15 - examples page has correct initial message', () => {
    cy.get('div[data-cy=issue15div]')
    .find('p')
    .should('have.text', 'Se han recuperado 0 dashboards')
    
  })

  it('issue15 - examples page has correct message after load', () => {
    cy.get('div[data-cy=issue15div]')
    .find('p')
    .should('have.text', 'Se han recuperado 5 dashboards');
  })
})
