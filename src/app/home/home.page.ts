import { Component, inject } from '@angular/core';
import * as Ion from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';
import { finalize } from 'rxjs';
import { IProductList } from '../models/product-list.model';
import { IProduct } from '../models/product.model';
import { IStore } from '../models/store.model';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductComponent } from '../product/product.component';
import { ProductsCallerService } from '../services/http/products-caller.service';
import { StoreCallerService } from '../services/http/store-caller.service';
import { ProductsDataService } from '../services/products-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    Ion.IonHeader,
    Ion.IonToolbar,
    Ion.IonTitle,
    Ion.IonContent,
    Ion.IonList,
    Ion.IonSkeletonText,
    Ion.IonItem,
    Ion.IonAlert,
    Ion.IonAccordionGroup,
    Ion.IonAccordion,
    Ion.IonLabel,
    Ion.IonInfiniteScroll,
    Ion.IonInfiniteScrollContent,
    Ion.IonButton,
    Ion.IonButtons,
    Ion.IonIcon,
    ProductComponent,
    ProductCreateComponent
  ],
})
export class HomePage {

  dummyProducts = new Array(5);
  products: IProduct[] = [];
  storeName: string | null = null;
  isProductsLoading = false;
  isProductsDeleting = false;
  isStoreLoading = false;
  storeError: string | null = null;
  productsError: string | null = null;
  deleteError: string | null = null;

  private currentPage = 1;
  private productService = inject(ProductsCallerService);
  private productDataService = inject(ProductsDataService);
  private storeService = inject(StoreCallerService);

  constructor() {
    this.loadProducts();
    this.loadStore();
    addIcons({ add, close });
  }

  loadProducts(event?: Ion.InfiniteScrollCustomEvent) {

    if (!event) {
      this.isProductsLoading = true;
    }

    this.productService.getProducts().pipe(
      finalize(() => {
        this.isProductsLoading = false;
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe({
      next: (products: IProductList) => {
        this.isProductsLoading = false;
        this.productDataService.addProducts(products.list);
        this.products = this.productDataService.products;

        if (event) {
          event.target.disabled = products.list.length < 10;
        }
      },
      error: error => {
        this.isProductsLoading = false;
        this.productsError = error.message ? error.message : error;
      }
    });
  }

  loadMoreProducts(event: Ion.InfiniteScrollCustomEvent) {
    if (this.products.length < 10) {
      event.target.complete();
      return;
    }

    this.currentPage++;
    this.loadProducts(event);
  }

  loadStore(event?: Ion.InfiniteScrollCustomEvent) {
    if (!event) {
      this.isStoreLoading = true;
    }

    this.storeService.getStore().pipe(
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
      },
      error: error => {
        this.isStoreLoading = false;
        this.storeError = error.message ? error.message : error;
      }
    });
  }

  addProduct(newProduct: IProduct) {
    this.productDataService.addProducts([newProduct]);
  }

  deleteProduct(productId: string) {

    this.isProductsDeleting = true;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.productDataService.deleteProduct(productId);
      },
      error: error => {
        this.isProductsDeleting = false;
        this.deleteError = error.message ? error.message : error;
      }
    });
  }
}
