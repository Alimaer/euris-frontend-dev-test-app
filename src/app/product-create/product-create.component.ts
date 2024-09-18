import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonList,
    IonInput,
    IonIcon,
    IonButton
  ]
})
export class ProductCreateComponent {

  private builder = inject(FormBuilder);

  newProductGroup = this.builder.group({
    descrizione: null,
    categoria: null,
    impiegato: null,
    prezzo: null,
    recensioni: this.builder.array([
      this.builder.control('')
    ])
  });

  constructor() {
    addIcons({ add, close });
  }

  get recensioni() {
    return this.newProductGroup.get('recensioni') as FormArray;
  }

  addReview() {
    this.recensioni.push(this.builder.control(''));
  }

  removeReview(i: number) {
    this.recensioni.removeAt(i);
  }

}
