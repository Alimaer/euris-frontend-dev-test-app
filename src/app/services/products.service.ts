import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL, STORE_ID } from '../app.constants';
import { IProductList } from '../models/product-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(page = 1, number = 10): Observable<IProductList> {
    return this.http.get<IProductList>(
      `${BASE_URL}/stores/${STORE_ID}/products?page=${page}&elements=${number}`
    );
  }
}
