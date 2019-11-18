import {
  failedAuth,
  successAuth
} from '../mocks/responses';

describe('Login & Signup', () => {
  describe('User login', () => {
    beforeEach(() => {
      cy.visit('/login', {
        onBeforeLoad(win) {
          cy.spy(win, 'fetch');
        }
      });
    });
    it('should fail with invalid credential on login', () => {
      cy.get('input[name="email"]').type('jean.abayo@gmail.com');
      cy.get('input[name="password"]').type('password');
      cy.get('.login-form').submit();
      cy.get('.vue-notification-wrapper').should('be.visible');
      cy.get('.vue-notification-wrapper').children('.error');
      cy.get('.notification-content').contains('Invalid email or password');
      cy.window().its('fetch').should('be.calledWith',
        `${Cypress.env('VUE_APP_BACKEND_URL')}/users/login`);
      cy.location('pathname').should('eq', '/login');
    });
    it('should direct user to signup on click signup button', () => {
      cy.get('.basic').click();
      cy.location('pathname').should('eq', '/signup');
    });
    it('should redirect user to reset password page', () => {
      cy.get('#forget-password').click();
      cy.location('pathname').should('eq', '/users/password/reset');
    });
    it('should login user on valid credentials', () => {
      cy.get('input[name="email"]').type('ashley_marvin@veum.biz');
      cy.get('input[name="password"]').type('password');
      cy.get('.login-form').submit();
      cy.location('pathname').should('eq', '/');
    });
  });
  describe('User signup', () => {
    beforeEach(() => {
      cy.visit('/signup', {
        onBeforeLoad(win) {
          cy.spy(win, 'fetch');
        }
      });
    });

    it('should let user navigate to login', () => {
      cy.get('#to-login').click();
      cy.location('pathname').should('eq', '/login');
    });
    it('should not sign up a user on invalid credentials', () => {
      cy.get('input[name="name"]').type('Cypress Testing');
      cy.get('input[name="email"]').type('testing@cypress.com');
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="passwordConfirmation"]').type('passwordakdfj');
      cy.get('#signup-form').submit();
      cy.get('.vue-notification-wrapper').should('be.visible');
      cy.window().its('fetch').should('not.be.calledWith',
        `${Cypress.env('VUE_APP_BACKEND_URL')}/users`);
      cy.get('.notification-content').contains('Provided passwords does not match');
      cy.location('pathname').should('eq', '/signup');
    });
    it('should not sign up user if user already exist ', () => {
      cy.visit('/signup', {
        onBeforeLoad(win) {
          cy.stub(win, 'fetch')
            .withArgs(`${Cypress.env('VUE_APP_BACKEND_URL')}/users`)
            .as('signupResponse')
            .returns(failedAuth());
        }
      });
      cy.get('input[name="name"]').type('Cypress Testing');
      cy.get('input[name="email"]').type('testing@cypress.com');
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="passwordConfirmation"]').type('password');
      cy.get('#signup-form').submit();
      cy.get('.vue-notification-wrapper').should('be.visible');
      cy.get('.vue-notification-wrapper').children('.error');
      cy.window().its('fetch').should('be.calledWith',
        `${Cypress.env('VUE_APP_BACKEND_URL')}/users`);
      cy.get('.notification-content').contains('Email has already been taken');
      cy.location('pathname').should('eq', '/signup');
    });
  });
  it('should display account confirmation instruction on signup successfully', () => {
    cy.visit('/signup', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs(`${Cypress.env('VUE_APP_BACKEND_URL')}/users`)
          .as('signupResponse')
          .returns(successAuth());
      }
    });
    cy.get('#confirmation-instructions').should('not.be.visible');
    cy.get('input[name="name"]').type('Cypress Testing');
    cy.get('input[name="email"]').type('testing@cypress.com');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="passwordConfirmation"]').type('password');
    cy.get('#signup-form').submit();
    cy.get('#signup-form').should('not.be.visible');
    cy.get('#confirmation-instructions').should('be.visible');
    cy.location('pathname').should('eq', '/signup');
  });
});
