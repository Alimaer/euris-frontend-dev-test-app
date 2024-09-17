import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/angular/standalone';
import { IProductData } from '../models/product-data.model';
import { IProduct } from '../models/product.model';
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
    IonItem,
    IonLabel,
    IonList,
    ProductPropertyComponent
  ]
})
export class ProductComponent {

  @Input() product: IProduct = {
    id: '',
    data: emptySet
  }

  get data() {
    return this.product?.data ?? emptySet;
  }

}
