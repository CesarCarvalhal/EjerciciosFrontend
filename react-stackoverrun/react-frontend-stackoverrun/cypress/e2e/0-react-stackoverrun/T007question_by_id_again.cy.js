describe('question_by_id_again', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/dashboards/1/questions/1', (req) => {
      req.reply({statusCode: 200, fixture: 'question1-d1_v2.json'})
    })
    cy.intercept('GET', '**/api/v2/dashboards/1/questions/1?*', (req) => {
      req.reply({statusCode: 200, fixture: 'question1-d1_v2.json'})
    })
    cy.intercept('GET', '**/api/v2/dashboards/2/questions/1', (req) => {
      req.reply({statusCode: 200, fixture: 'question1-d2_v2.json'})
    })
    cy.intercept('GET', '**/api/v2/dashboards/2/questions/1?*', (req) => {
      req.reply({statusCode: 200, fixture: 'question1-d2_v2.json'})
    })
  })

  it('issue7 - dashboards/1/questions/1 page has correct empty data at first', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')

    cy.get('h1[data-cy=header]')
    .should('have.text', '')
    cy.get('h3[data-cy=description]')
    .should('have.text', '')
    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 0)

    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue7 - dashboards/1/questions/1 page has correct data after load', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('h1[data-cy=header]')
    .should('have.text', 'Bucles for')
    cy.get('h3[data-cy=description]')
    .should('have.text', '¿Cómo son los bucles for en JavaScript?')
    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 6)

    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue7 - dashboards/1/questions/1 page has correct ANSWERS after load', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    cy.get('div[data-cy=answersList]')
    .find('div')
    .first()
    .find('p')
    .should('have.text', '¡Espero haber ayudado!')

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(1)
    .find('p')
    .should('have.text', 'Aquí hay algo más de documentación https://www.udacity.com/blog/2021/01/javascript-for-loop.html')

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(2)
    .find('p')
    .should('have.text', 'Existen diferentes tipos de bucles for. Los principales son el for simple (de toda la vida) y el for in')

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(3)
    .find('p')
    .should('have.text', 'Vaya... Parece que w3schools está caído. Prueba este otro https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach')

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(4)
    .find('p')
    .should('have.text', 'Aquí hay un enlace que puede ayudarte https://www.w3schools.com/js/js_loop_for.asp')

    cy.get('div[data-cy=answersList]')
    .find('div')
    .eq(5)
    .find('p')
    .should('have.text', '¿A qué te refieres exactamente preguntando eso?')

    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue7 - dashboards/1/questions/1 has correct ANSWERS CSS', () => {
    cy.visit('http://localhost:3000/dashboards/1/questions/1')
    cy.wait(1000)

    for (let i = 0; i<6; i++) {
      cy.get('div[data-cy=answersList]')
      .find('div')
      .eq(i)
      .should('have.css', 'margin', '28px')
      .should('have.css', 'padding', '5px')
      .should('have.css', 'background-color', 'rgba(221, 230, 243, 0.5)')
      .should('have.css', 'text-align', 'center')
      .should('have.css', 'border-radius', '15px')
      .should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px')
    }

    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue7 - dashboards/2/questions/1 page has correct empty data at first', () => {
    cy.visit('http://localhost:3000/dashboards/2/questions/1')

    cy.get('h1[data-cy=header]')
    .should('have.text', '')
    cy.get('h3[data-cy=description]')
    .should('have.text', '')
    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 0)

    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })

  it('issue7 - dashboards/2/questions/1 page has correct data after load', () => {
    cy.visit('http://localhost:3000/dashboards/2/questions/1')
    cy.wait(1000)

    cy.get('h1[data-cy=header]')
    .should('have.text', 'ReactNative')
    cy.get('h3[data-cy=description]')
    .should('have.text', 'He escuchado hablar de React Native... ¿Qué es?')
    cy.get('div[data-cy=answersList]')
    .find('div')
    .should('have.length', 0)

    cy.get('footer')
    .find('p[data-cy=footerCopyright]')
    .contains('©')
  })
})
