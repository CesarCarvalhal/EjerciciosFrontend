describe('a_bar_to_rule_them_all', () => {
  const randomDashboardId = parseInt(Math.random()*1000)
  const randomQuestionId = parseInt(Math.random()*1000)

  beforeEach(() => {
    cy.server()
    cy.route('GET', '**/api/v2/dashboards', 'fixture:dashboardsList_v2.json')
    cy.route('GET', '**/api/v2/dashboards/'+randomDashboardId+'/questions/' + randomQuestionId, 'fixture:question1-d1_v2.json')
    cy.route('GET', '**/api/v2/dashboards/'+randomDashboardId, 'fixture:dashboard1_v2.json')
  })

  it('issue21 - Bar is present in all pages except wildcard', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')

    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')

    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId)
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/newQuestion')
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId)
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')
    
    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId+'/newAnswer')
    cy.get('[data-cy=topBar]')
    .should('contain.text','¡Hola!')

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/thisDoesNotExist/'+randomQuestionId)
    cy.get('[data-cy=topBar]')
    .should('not.exist')
  })

  it('issue21 - Bar has correct CSS', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })
    
    
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })

    cy.visit('http://localhost:3000/register')
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId)
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/newQuestion')
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })

    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId)
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })
    
    cy.visit('http://localhost:3000/dashboards/'+randomDashboardId+'/questions/'+randomQuestionId+'/newAnswer')
    cy.get('[data-cy=topBar]')
    .should('have.css','padding-top', '10px')
    .should('have.css', 'height', '70px')
    cy.get('[data-cy=topBar]')
    .first()
    .then(($topBar) => {
      const cssBackground = $topBar.css('background');
      expect(cssBackground).to.contain('linear-gradient(90deg, rgb(189, 219, 252) 0%, rgb(142, 142, 230) 35%, rgb(96, 172, 187) 100%)')
    })
  })
})
