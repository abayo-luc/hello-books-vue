// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('should visit home page', () => {
    cy.visit('/');
  });
  it('should visit authors page', () => {
    cy.visit('/authors');
    cy.contains('h1', 'This is the Author\'s page');
  });
});
