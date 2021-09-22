describe('Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should display the title of the application', () => {
    cy.get('h1').contains('cwculator')
  });

  it('should not display a random app name', () => {
    cy.get('h1').should('not.contain', 'Mel\'s Money Maker')
  });
});