import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  private _products: IProduct[] = [];

  constructor() { }

  get products() {
    return this._products;
  }

  addProducts(productsToAdd: IProduct[]) {
    this._products.push(...productsToAdd);
  }

  getProduct(productId: string): IProduct | null {
    return this.products.find(product => product.id === productId) ?? null;
  }

  deleteProduct(productId: string) {
    const index = _.findIndex(this._products, prod => prod.id === productId);

    this._products.splice(index, 1);
  }
}
