describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should render all of the buttons of the calculator', () => {
    cy.get('button').should('be.visible', 'have.length', 21)
      .get('.clear').contains('Clear')
      .get('[name="7"]').contains('7')
      .get('[name=" / "]').contains('/')
      .get('[name="0"]').contains('0')
      .get('[name="+/-"]').contains('+/-')
  });

  // Functionality to divide, multiply, add, and subtract 
  it('should be able to divide whole numbers', () => {
    cy.get('[name="1"]').click()
      .get('[name="0"]').click()
      .get('[name=" / "]').click()
      .get('[name="2"]').click()
      .get('[name="="]').click()
      .get('.display > :nth-child(1)').contains(5)
  });

  it('should be able to multiply three numbers', () => {
    cy.get('[name="5"]').click()
      .get('[name=" * "]').click()
      .get('[name="2"]').click()
      .get('[name=" * "]').click()
      .get('[name="3"]').click()
      .get('[name="="]').click()
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