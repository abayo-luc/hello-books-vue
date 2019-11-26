import {
  updatePassword
} from '../mocks/responses';

describe('Password Update', () => {
  it('should allow user to navigate to login', () => {
    cy.visit('/users/password?token=qwerty-234567');
    cy.get('#auth-link').click();
    cy.location('pathname').should('eq', '/login');
  });
  it('should not update password if there is validation errors', () => {
    cy.visit('/users/password?token=qwerty-234567');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="passwordConfirmation"]').type('password12345');
    cy.get('#update-password-form').submit();
    cy.get('.vue-notification-wrapper').should('be.visible');
    cy.get('.vue-notification-wrapper').children('.error');
  });
  it('should not update password if there is validation errors', () => {
    cy.visit('/users/password?token=qwerty-234567', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(
            `${Cypress.env('VUE_APP_BACKEND_URL')}/users/password?token=qwerty-234567`
          )
          .as('resetResponse')
          .returns(updatePassword.failed);
      }
    });
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="passwordConfirmation"]').type('password');
    cy.get('#update-password-form').submit();
    cy.get('.vue-notification-wrapper').should('be.visible');
    cy.get('.vue-notification-wrapper').children('.error');
    cy.get('.notification-content').contains('Invalid or expired token');
  });
  it('should update password and login the user', () => {
    cy.visit('/users/password?token=qwerty-234567', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(
            `${Cypress.env('VUE_APP_BACKEND_URL')}/users/password?token=qwerty-234567`
          )
          .as('resetResponse')
          .returns(updatePassword.success);
      }
    });
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="passwordConfirmation"]').type('password');
    cy.get('#update-password-form').submit();
    cy.get('.vue-notification-wrapper').should('be.visible');
    cy.get('.vue-notification-wrapper').children('.success');
    cy.get('.notification-content').contains('Password update successfully');
    cy.location('pathname').should('eq', '/login');
  });
});
