import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, STORE_ID } from 'src/app/app.constants';
import { IProductData } from 'src/app/models/product-data.model';
import { IProductList } from 'src/app/models/product-list.model';
import { IProduct } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsCallerService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(page = 1, number = 10): Observable<IProductList> {
    return this.http.get<IProductList>(
      `${BASE_URL}/stores/${STORE_ID}/products?page=${page}&elements=${number}`
    );
  }

  addProduct(product: IProductData): Observable<any> {
    return this.http.post(
      `${BASE_URL}/stores/${STORE_ID}/products`,
      product
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/stores/${STORE_ID}/products/${productId}`
    );
  }
}
