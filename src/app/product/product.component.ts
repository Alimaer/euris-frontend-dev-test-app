import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonCol, IonItem, IonLabel } from '@ionic/angular/standalone';
import { IProduct } from '../models/product.model';
import { ProductsDataService } from '../services/products-data.service';
import { IProductData } from '../models/product-data.model';

const emptySet: IProductData = {
  reviews: [],
  price: null,
  description: null,
  title: null,
  category: null,
  employee: null
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonRow,
    IonCol,
    IonItem,
    IonLabel
  ]
})
export class ProductComponent  implements OnInit {

  @Input() set id(productId: string) {
    this.product = this.productDataService.getProduct(productId);
  }

  private productDataService = inject(ProductsDataService);

  private product: IProduct | null = null;

  constructor() { }

  get data() {
    return this.product?.data ?? emptySet;
  }

  ngOnInit() {
    console.log(this.product);
  }

}
