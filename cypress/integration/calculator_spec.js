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

  // Functionality to divide, multiply, add, and subtract 
  it('should be able to divide whole numbers', () => {
    cy.get('button').eq(10).click()
      .get('button').eq(14).click()
      .get('button').eq(5).click()
      .get('button').eq(11).click()
      .get('button').eq(20).click()
      .get('.display > :nth-child(1)').contains(5)
  });

  it('should be able to multiply three numbers', () => {
    cy.get('button').eq(7).click()
      .get('button').eq(9).click()
      .get('button').eq(11).click()
      .get('button').eq(9).click()
      .get('button').eq(12).click()
      .get('button').eq(20).click()
      .get('.display > :nth-child(1)').contains(30)
  });

  it('should be able to add decimal numbers', () => {
    cy.get('[name="9"]').click()
      .get('[name="."]').click()
      .get('[name="2"]').click()
      .get('[name=" + "]').click()
      .get('[name="5"]').click()
      .get('[name="="]').click()
      .get('.display > :nth-child(1)').contains(14.2)
  });

  it('should be able to calculate a subtraction problem', () => {
    cy.get('[name="9"]').click()
      .get('[name="1"]').click()
      .get('[name=" - "]').click()
      .get('[name="5"]').click()
      .get('[name="5"]').click()
      .get('[name="="]').click()
      .get('.display > :nth-child(1)').contains(36)
  });

});