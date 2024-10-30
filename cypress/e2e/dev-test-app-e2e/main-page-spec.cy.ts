import { BASE_URL, STORE_ID } from "src/app/app.constants";
import { IProductList } from "src/app/models/product-list.model";
import { IProduct } from "src/app/models/product.model";
import { IStore } from "src/app/models/store.model";

const fake_store: IStore = {
  name: 'FAKE STORE',
  category: 'FAKE CATEGORY',
  employees: [
    'FAKE EMPLOYEE'
  ]
}

const fake_products_list: IProductList = {
  list: [
    {
      id: 'a',
      data: {
        price: 10,
        employee: 'fake_employee-1',
        category: 'fake_category_1',
        title: 'fake_title_1',
        description: 'fake_description_1',
        reviews: [
          'fake_review_1'
        ]
      }
    },
    {
      id: 'b',
      data: {
        price: 11,
        employee: 'fake_employee_2',
        category: 'fake_category_2',
        title: 'fake_title_2',
        description: 'fake_description_2',
        reviews: [
          'fake_review_2'
        ]
      }
    },
    {
      id: 'c',
      data: {
        price: 12,
        employee: 'fake_employee_3',
        category: 'fake_category_3',
        title: 'fake_title_3',
        description: 'fake_description_3',
        reviews: [
          'fake_review_3'
        ]
      }
    }
  ]
}

describe('main page test suite', () => {

  beforeEach(() => {
    cy.intercept(`${BASE_URL}/stores/${STORE_ID}`, fake_store).as('storeCall');
    cy.intercept(`${BASE_URL}/stores/${STORE_ID}/products?page=1&elements=10`, req => {
      delete req.headers['if-none-match'];

      req.reply({
        body: fake_products_list
      });
      
    }).as('productCall');
    cy.visit('/');
  });

  it('main page access', () => {
    cy.url().should("include", "8100")
  });

  it('main page objects visualization', () => {
    cy.dataCy('home-header');
    cy.dataCy('home-content');
  });

  it('intercept store call and verify data visualization', () => {
    cy.wait('@storeCall').then(() => {
      cy.dataCy('home-header-toolbar').contains(fake_store.name).should('exist');
    });
  });

  it('intercept product call and verify data visualization', () => {
    cy.wait('@productCall').then(() => {
      cy.dataCy('home-content-product-title').should('have.length', 3);
    });
  });
});