import { Component, Input } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { IProductData } from 'src/app/models/product-data.model';


@Component({
  selector: 'app-product-property',
  templateUrl: './product-property.component.html',
  styleUrls: ['./product-property.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel
  ]
})
export class ProductPropertyComponent {

  @Input() label: string | null = null;
  @Input() value: string | number | null = null;
  @Input() prop: keyof IProductData;

}
