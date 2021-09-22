describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should render all of the buttons of the calculator', () => {
    cy.get('button').should('be.visible', 'have.length', 21)
      .get('button').eq(0).contains('Clear')
      .get('button').eq(2).contains('7')
      .get('button').eq(5).contains('/')
      .get('button').eq(14).contains('0')
      .get('button').eq(19).contains('+/-')
  });

  it.only('should be able to divide', () => {
    cy.get('button').eq(10).click()
      .get('button').eq(14).click()
      .get('button').eq(5).click()
      .get('button').eq(11).click()
      .get('button').eq(20).click()
  })

});