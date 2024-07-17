import { Component, inject } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonHeader, IonList, IonSkeletonText, IonTitle, IonToolbar, IonItem } from '@ionic/angular/standalone';
import { delay, finalize } from 'rxjs';
import { IProductList } from '../models/product-list.model';
import { IProduct } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonSkeletonText,
    IonItem
  ],
})
export class HomePage {

  dummyProducts = new Array(5);
  products: IProduct[] = [];
  isLoading = false;

  private currentPage = 1;
  private productService = inject(ProductsService);

  constructor() {
    this.loadProducts();
  }

  

  loadProducts(event?: InfiniteScrollCustomEvent) {

    if(!event) {
      this.isLoading = true;
    }

    this.productService.getProducts().pipe(
      delay(3000),
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe({
      next: (products: IProductList) => {
        this.isLoading = false;
        this.products.push(...products.list);

        if(event) {
          event.target.disabled = products.list.length < 10;
        }

        console.log(products);
      },
      error: error => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }
}
