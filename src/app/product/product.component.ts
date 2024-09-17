import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, save } from 'ionicons/icons';
import { IProductData } from '../models/product-data.model';
import { IProduct } from '../models/product.model';
import { ProductsDataService } from '../services/products-data.service';
import { ProductPropertyComponent } from './components/product-property/product-property.component';

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
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonInput,
    ProductPropertyComponent
  ]
})
export class ProductComponent implements OnInit {

  @Input() set id(productId: string) {
    this.product = this.productDataService.getProduct(productId);
  }

  private productDataService = inject(ProductsDataService);

  private product: IProduct | null = null;

  isWriting = false;

  review: string | null = null;

  constructor() {
    addIcons({ add, save });
  }

  get data() {
    return this.product?.data ?? emptySet;
  }

  ngOnInit() {
    console.log(this.product);
  }

  addReview() {
    this.isWriting = true;
  }

  saveReview() {
    console.log(this.review);
    this.review = null;
    this.isWriting = false;
  }

}
