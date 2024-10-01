import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Ion from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';
import * as _ from 'lodash';
import { IProduct } from '../models/product.model';
import { ProductsCallerService } from '../services/http/products-caller.service';
import { IProductData } from '../models/product-data.model';


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

  @Output() productCreated = new EventEmitter();

  private builder = inject(FormBuilder);
  private productService = inject(ProductsCallerService);

  name = 'productCreationModal';
  error: string | null = null;
  isLoading: boolean = false;

  newProductGroup = new FormGroup({
    description: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
    employee: new FormControl<string | null>(null),
    title: new FormControl<string | null>(null),
    price: new FormControl<number | null>(null),
    reviews: new FormArray([
      new FormControl<string | null>(null)
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

    const newProductData: IProductData = {
        ...this.newProductGroup.getRawValue(),
        price: _.toInteger(this.newProductGroup.get('price')?.value),
        reviews: _.compact(this.newProductGroup.get('reviews')?.value ?? [])
    };

    this.productService.addProduct(newProductData).subscribe({
      next: () => {
        this.isLoading = false;
        if (this.modal)
          this.modal.dismiss(this.name, 'confirm');

        this.productCreated.emit();
      },
      error: error => {
        this.error = error.message ? error.message : error;
        this.isLoading = false;
      }
    });
  }

}
