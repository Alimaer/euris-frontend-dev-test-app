import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Ion from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';
import * as _ from 'lodash';
import { IProduct } from '../models/product.model';
import { ProductsCallerService } from '../services/http/products-caller.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ion.IonGrid,
    Ion.IonRow,
    Ion.IonCol,
    Ion.IonItem,
    Ion.IonLabel,
    Ion.IonList,
    Ion.IonInput,
    Ion.IonIcon,
    Ion.IonButton,
    Ion.IonModal,
    Ion.IonFooter,
    Ion.IonButtons,
    Ion.IonToolbar,
    Ion.IonContent,
    Ion.IonHeader,
    Ion.IonAlert
  ]
})
export class ProductCreateComponent {

  @ViewChild(Ion.IonModal) modal: Ion.IonModal | undefined;

  private builder = inject(FormBuilder);
  private productService = inject(ProductsCallerService);

  name = 'productCreationModal';
  error: string | null = null;
  isLoading: boolean = false;

  newProductGroup = this.builder.group({
    description: null,
    category: null,
    employee: null,
    price: null,
    title: null,
    reviews: this.builder.array([
      this.builder.control('')
    ])
  });

  constructor() {
    addIcons({ add, close });
  }

  get recensioni() {
    return this.newProductGroup.get('reviews') as FormArray;
  }

  addReview() {
    this.recensioni.push(this.builder.control(''));
  }

  removeReview(i: number) {
    this.recensioni.removeAt(i);
  }

  cancel() {
    if (this.modal)
      this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.isLoading = true;

    const newProduct: IProduct = {
      id: null,
      data: {
        ...this.newProductGroup.getRawValue(),
        reviews: _.compact(this.newProductGroup.get('reviews')?.value ?? [])
      }
    };

    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        this.isLoading = false;
        if (this.modal)
          this.modal.dismiss(this.name, 'confirm');
      },
      error: error => {
        this.error = error;
        this.isLoading = false;
      }
    });
  }

}
