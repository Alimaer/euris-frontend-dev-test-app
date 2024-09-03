import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';

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
}
