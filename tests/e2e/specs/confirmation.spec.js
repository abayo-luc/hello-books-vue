import {
  updatePassword
} from '../mocks/responses';

describe('Account Confirmation', () => {
  it('should show error on invalid token', () => {
    cy.visit('/users/confirmation?token=qwerty-234567', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(
            `${Cypress.env('VUE_APP_BACKEND_URL')}/users/confirmation?token=qwerty-234567`
          )
          .as('resetResponse')
          .returns(updatePassword.failed);
      }
    });
    cy.get('.vue-notification-wrapper').children('.warn');
    cy.get('.notification-content').contains('Invalid or expired token');
    cy.get('#confirmation-error').contains('Invalid or expired token');
  });
});
