import { BASE_URL, STORE_ID } from "src/app/app.constants";
import { IProductData } from "src/app/models/product-data.model";
import { IProduct } from "src/app/models/product.model";

const properties: (keyof Omit<IProductData, 'reviews'>)[] = [
  'description',
  'price',
  'employee',
  'category'
];

const testProduct: IProduct = {
  id: 'TEST_ID',
  data: {
    price: 10,
    employee: 'TEXT_EMPLOYEE',
    category: 'TEXT_CATEGORY',
    title: 'TEST_TITLE',
    description: 'TEST_DESCRIPTION',
    reviews: [
      'TEST_REVIEW',
      'TEST_ADDITIONAL_REVIEW'
    ]
  }
}

function testProductVisualization(product: IProduct, altProductId: string | null = null) {
  const productId = altProductId ? altProductId : product.id;
  const accordion = cy.get(`#${productId}`);

  accordion.click();

  Cypress._.forEach(properties, prop => {
    const attribute = Cypress._.join(['product', prop], '-');
    const property = product.data[prop];

    if (property) {
      cy.dataCy(attribute).contains(property).should('exist');
    }
  });

  Cypress._.forEach(product.data.reviews, review => {
    cy.dataCy('product-reviews').contains(review).should('exist');
  });
}

function testProductCreation(product: IProduct) {
  cy.get('#open-modal').click();

    cy.get('#ion-overlay-1').should('be.visible');

    cy.dataCy('input-title').click().type(product.data.title!);
    cy.dataCy('input-description').click().type(product.data.description!);
    cy.dataCy('input-category').click().type(product.data.category!);
    cy.dataCy('input-employee').click().type(product.data.employee!);
    cy.dataCy('input-price').click().type(product.data.price!.toString());
    cy.dataCy('input-review-0').click().type(product.data.reviews[0]);

    cy.dataCy('add-review').click();

    cy.dataCy('input-review-1').click().type(product.data.reviews[1]);

    cy.dataCy('confirm-create').click();
}

describe('main page test suite', () => {

  beforeEach(() => {
    cy.intercept(`${BASE_URL}/stores/${STORE_ID}`).as('storeCall');

    cy.intercept(`${BASE_URL}/stores/${STORE_ID}/products?page=1&elements=10`, req => {
      delete req.headers['if-none-match'];
    }).as('productListCall');

    cy.intercept('POST', `${BASE_URL}/stores/${STORE_ID}/products`).as('productCall');

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
    cy.wait('@productListCall').then(intercept => {

      const products: IProduct[] = intercept.response?.body.list;

      const titleElements = cy.dataCy('home-content-product-title');

      products.forEach(element => {
        titleElements.should('include.text', element.data.title);
      });

    });
  });

  it('verify product content visualization', () => {
    cy.wait('@productListCall').then(intercept => {
      const products: IProduct[] = intercept.response?.body.list;
      testProductVisualization(products[0])
    });
  });

  it('verify product creation', () => {
    testProductCreation(testProduct);

    cy.wait('@productCall').then(intercept => {

      expect(intercept.response).to.exist;

      cy.get('#ion-overlay-1').should('not.be.visible');
      cy.dataCy('home-content-product-title').should('include.text', testProduct.data.title!);

      if (intercept.response) {
        expect(intercept.response.statusCode).to.eq(200);
        testProductVisualization(testProduct, intercept.response.body);

        cy.dataCy(`delete-${intercept.response.body}`).click();
        cy.dataCy('home-content-product-title').should('not.include.text', testProduct.data.title!);
      }
    });
  });

});