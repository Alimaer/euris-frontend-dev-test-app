import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
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
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    ProductPropertyComponent
  ]
})
export class ProductComponent implements OnInit {

  @Input() set id(productId: string) {
    this.product = this.productDataService.getProduct(productId);
  }

  private productDataService = inject(ProductsDataService);

  private product: IProduct | null = null;

  constructor() {
    addIcons({ add });
  }

  get data() {
    return this.product?.data ?? emptySet;
  }

  ngOnInit() {
    console.log(this.product);
  }

}
