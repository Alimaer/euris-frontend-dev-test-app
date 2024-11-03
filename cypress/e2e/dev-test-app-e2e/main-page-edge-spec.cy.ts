import { BASE_URL, STORE_ID } from "src/app/app.constants";
import { IStore } from "src/app/models/store.model";

const fake_store: IStore = {
  name: 'FAKE STORE',
  category: 'FAKE CATEGORY',
  employees: [
    'FAKE EMPLOYEE'
  ]
}

describe('main page test suite', () => {

  it('visualize error message after store call', () => {
    cy.intercept(
      'GET',
      `${BASE_URL}/stores/${STORE_ID}`,
      { statusCode: 500 }
    );

    cy.visit('/');

    cy.get('.alert-wrapper').should('exist');
  });

  it('visualize error message after products call', () => {
    cy.intercept(
      'GET',
      `${BASE_URL}/stores/${STORE_ID}/products?page=1&elements=10`,
      { statusCode: 500 }
    );

    cy.visit('/');

    cy.get('.alert-wrapper').should('exist');
  });

});