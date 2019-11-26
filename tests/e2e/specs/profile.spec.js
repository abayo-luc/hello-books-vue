import {
  getUser
} from '../mocks/responses';

describe('Profile Page', () => {
  describe('Unauthorized User', () => {
    beforeEach(() => {
      cy.visit('/profile');
    });
    it('should redirect user to login', () => {
      cy.location('pathname').should('eq', '/login');
    });
  });
  describe('Authorized User', () => {
    beforeEach(() => {
      window.localStorage.setItem(Cypress.env('VUE_APP_TOKEN_STORAGE_KEY'),
        'qwerty-12345');
      cy.visit('/profile', {
        onBeforeLoad(win) {
          const s = cy.stub(win, 'fetch');
          s.withArgs(
            `${Cypress.env('VUE_APP_BACKEND_URL')}/users/current`
          ).as('getCurrentUser').returns(getUser.success);
          s.withArgs(`${Cypress.env('VUE_APP_BACKEND_URL')}/profiles/update`).as(
            'updateProfile'
          ).returns(getUser.update);
        }
      });
    });
    it('should display profile page', () => {
      cy.location('pathname').should('eq', '/profile');
      cy.get('.personal-info').children('.section .title').children('h3').contains(
        'Personal Information'
      );
      cy.get('.account-information').children('.title').children('h3')
        .contains(
          'Account Information'
        );
    });
    it('should toggle profile editing', () => {
      cy.get('#profile-editing').should('not.be.visible');
      cy.get('#toggle-edit-btn').click();
      cy.get('#profile-editing').should('be.visible');
      cy.get('#toggle-edit-btn').click();
      cy.get('#profile-editing').should('not.be.visible');
    });
    it('should edit user profile', () => {
      cy.get('#toggle-edit-btn').click();
      cy.get('input[name="name"]').type('Cypress Testing');
      cy.get('input[name="phone_number"]').type('0789277275');
      cy.get('#edit_profile').submit();
      cy.get('#profile-editing').should('not.be.visible');
      cy.get('.vue-notification-wrapper').should('be.visible');
      cy.get('.vue-notification-wrapper').children('.success');
    });
  });
});
