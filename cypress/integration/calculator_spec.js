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

  // Functionality to divide, multiply, add, and subtract without parentheses 
  it('should be able to divide whole numbers', () => {
    cy.get('[name="1"]').click()
      .get('[name="0"]').click()
      .get('[name=" / "]').click()
      .get('[name="2"]').click()
      .get('[name="="]').click()
      .get('.display > :nth-child(1)').contains(5)
  });

  it.only('should display an error trying to calculate invalid inputs', ()=> {
    cy.get('[name="9"]').click()
      .get('[name=" + "]').click()
      .get('[name=" - "]').click()
      .get('[name="6"]').click()
      .get('[name="="]').click()
      .get('.error').should('have.text','Syntax error')
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

  it('should calculate numbers following the order of operations', () => {
    cy.get('[name="2"]').click()
      .get('[name=" + "]').click()
      .get('[name="3"]').click()
      .get('[name=" * "]').click()
      .get('[name="7"]').click()
      .get('[name="="]').click()
      .get('.display > :nth-child(1)').contains(23)
  });

  it('should consider parentheses when calculating', () => {
    cy.get('[name="8"]').click()
    .get('[name=" + "]').click()
    .get('[name="("]').click()
    .get('[name="2"]').click()
    .get('[name=" * "]').click()
    .get('[name=")"]').click()
    .get('[name="5"]').click()
    .get('[name="="]').click()
    .get('.display > :nth-child(1)').contains(18)
  });

  it('should be able to make a positive input negative after clicking button', () => {
    cy.get('[name="2"]').click()
    .get('[name="+/-"]').click()
    .get('[name=" + "]').click()
    .get('[name="6"]').click()
    .get('[name="="]').click()
    .get('.display > :nth-child(1)').contains(4)
  });

  it('should show an error trying to make an operator negative or positive',() => {
    cy.get('[name="9"]').click()
      cy.get('[name=" + "]').click()
      .get('[name="+/-"]').click()
      .get('[name="+/-"]').click()
      .get('.error').should('have.text','Syntax error')
  });

  it('should clear out the display after clicking the clear button', () => {
    cy.get('[name="4"]').click()
      .get('[name="3"]').click()
      .get('[name="1"]').click()
      .get('[name="1"]').click()
      .get('[name="0"]').click()
      .get('.clear').click()
      .get('.display').should('have.text', '')
  });

  it('should remove only the last input after clicking the c button', () => {
    cy.get('[name="6"]').click()
      .get('[name=" * "]').click()
      .get('[name="6"]').click()
      .get('[name="6"]').click()
      .get('[name="back"]').click()
      .get('[name="="]').click()
      .get('.display > :nth-child(1)').contains(36)
  });
});