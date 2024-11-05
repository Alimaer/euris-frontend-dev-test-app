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
    cy.intercept(`${BASE_URL}/stores/${STORE_ID}`).as('storeCall');
    cy.intercept(`${BASE_URL}/stores/${STORE_ID}/products?page=1&elements=10`, req => {
      delete req.headers['if-none-match'];

      /* req.reply({
        body: fake_products_list
      }); */

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
    cy.wait('@storeCall').then(intercepted => {

      const store = intercepted.response?.body ?? null;

      if (!!store?.name)
        cy.dataCy('home-header-toolbar').contains(store.name).should('exist');
    });
  });

  it('intercept product call and verify data visualization', () => {
    cy.wait('@productCall').then(intercept => {

      const products: IProduct[] = intercept.response?.body.list;

      const titleElements = cy.dataCy('home-content-product-title');

      products.forEach(element => {
        titleElements.should('include.text', element.data.title);
      });

    });
  });

  it('verify product content visualization', () => {
    cy.wait('@productCall').then(intercept => {

      const products: IProduct[] = intercept.response?.body.list;

      const testProduct = products[0];
      const accordion = cy.get(`#${testProduct.id}`);

      accordion.click();

      cy.dataCy('product-Descrizione').contains(testProduct.data.description!).should('exist');
      cy.dataCy('product-Prezzo').contains(testProduct.data.price!).should('exist');
      cy.dataCy('product-Impiegato').contains(testProduct.data.employee!).should('exist');
      cy.dataCy('product-Categoria').contains(testProduct.data.category!).should('exist');
      cy.dataCy('product-Recensione').contains(testProduct.data.reviews[0]!).should('exist');

    });
  });

  it('verify product creation', () => {
    cy.get('#open-modal').click();

    cy.get('#ion-overlay-1').should('be.visible');

    cy.get('#ion-input-0').type('NEW TITLE');
    cy.get('#ion-input-1').type('NEW DESCRIPTION');
    cy.get('#ion-input-2').type('NEW PRICE');
    cy.get('#ion-input-3').type('NEW CATEGORY');
    cy.get('#ion-input-4').type('NEW EMPLOYEE');
    cy.get('#ion-input-5').type('NEW REVIEW');

  })


});