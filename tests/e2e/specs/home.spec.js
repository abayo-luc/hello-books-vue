import {
  getUser,
  getBooks
} from '../mocks/responses';

describe('Home Page', () => {
  describe('Non Authenticated Users', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.spy(win, 'fetch');
        }
      });
    });
    it('should return to login if not authenticated', () => {
      cy.location('pathname').should('eq', '/login');
    });
  });
  describe('Authenticated User', () => {
    beforeEach(() => {
      window.localStorage.setItem(Cypress.env('VUE_APP_TOKEN_STORAGE_KEY'),
        'qwerty-12345');
      cy.visit('/', {
        onBeforeLoad(win) {
          const s = cy.stub(win, 'fetch');

          s.withArgs(
            `${Cypress.env('VUE_APP_BACKEND_URL')}/users/current`
          ).as('getCurrentUser')
            .returns(getUser.success);
          s.withArgs(
            `${Cypress.env('VUE_APP_BACKEND_URL')}/books?limit=30&page=1`
          )
            .as('getAllBooks')
            .returns(getBooks.success);
        }
      });
    });
    it('should be able to see home page', () => {
      cy.location('pathname').should('eq', '/');
      cy.get('.book-card').should('have.length', 30);
      cy.get('#app-brand').contains('HelloBooks');
      cy.get('.top-nav').children('.search-input', '.dropdown');
    });
    it('should toggle dropdown menu', () => {
      cy.get('.dropdown-content').should('not.be.visible');
      cy.get('.dropdown').children('#nav-dropdown').click();
      cy.get('.dropdown-content').should('be.visible');
      cy.get('.dropdown').children('#nav-dropdown').click();
      cy.get('.dropdown-content').should('not.be.visible');
    });
    it('should toggle dropdown and navigate to profile', () => {
      cy.get('.dropdown-content').should('not.be.visible');
      cy.get('.dropdown').children('#nav-dropdown').click();
      cy.get('.dropdown-content').should('be.visible');
      cy.get('#profile-link').click();
      cy.location('pathname').should('eq', '/profile');
    });
    it('should logout user', () => {
      cy.get('.dropdown').children('#nav-dropdown').click();
      cy.get('.sign_out').children('.simple').click();
      cy.location('pathname').should('eq', '/login');
    });
  });
});
