import { Component, inject } from '@angular/core';
import { InfiniteScrollCustomEvent, IonAlert, IonContent, IonHeader, IonItem, IonList, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { delay, finalize } from 'rxjs';
import { IProductList } from '../models/product-list.model';
import { IProduct } from '../models/product.model';
import { IStore } from '../models/store.model';
import { ProductsCallerService } from '../services/http/products-caller.service';
import { StoreCallerService } from '../services/http/store-caller.service';
import { RouterModule } from '@angular/router';

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
    IonItem,
    IonAlert,
    RouterModule
  ],
})
export class HomePage {

  dummyProducts = new Array(5);
  products: IProduct[] = [];
  storeName: string | null = null;
  isProductsLoading = false;
  isStoreLoading = false;
  error: string | null = null;;

  private currentPage = 1;
  private productService = inject(ProductsCallerService);
  private storeService = inject(StoreCallerService);

  constructor() {
    this.loadProducts();
    this.loadStore();
  }

  loadProducts(event?: InfiniteScrollCustomEvent) {

    if (!event) {
      this.isProductsLoading = true;
    }

    this.productService.getProducts().pipe(
      delay(3000),
      finalize(() => {
        this.isProductsLoading = false;
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe({
      next: (products: IProductList) => {
        this.isProductsLoading = false;
        this.products.push(...products.list);

        if (event) {
          event.target.disabled = products.list.length < 10;
        }

        console.log(products);
      },
      error: error => {
        this.isProductsLoading = false;
        this.error = error;
      }
    });
  }

  loadStore(event?: InfiniteScrollCustomEvent) {

    if (!event) {
      this.isStoreLoading = true;
    }

    this.storeService.getStore().pipe(
      delay(3000),
      finalize(() => {
        this.isStoreLoading = false;
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe({
      next: (store: IStore) => {
        this.isStoreLoading = false;
        this.storeName = store.name;

        console.log(store);
      },
      error: error => {
        this.isStoreLoading = false;
        this.error = error;
      }
    });
  }
}
