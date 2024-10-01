import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonButton, IonIcon } from '@ionic/angular/standalone';
import { IProductData } from '../models/product-data.model';
import { IProduct } from '../models/product.model';
import { ProductPropertyComponent } from './components/product-property/product-property.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

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
    IonButton,
    IonIcon,
    ProductPropertyComponent
  ]
})
export class ProductComponent {

  @Input() product: IProduct = {
    id: '',
    data: emptySet
  }

  constructor() {
    addIcons({ close });
  }

  get data() {
    return this.product?.data ?? emptySet;
  }

}
