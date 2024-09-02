import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, STORE_ID } from 'src/app/app.constants';
import { IProductList } from 'src/app/models/product-list.model';

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