import { Component, Input } from '@angular/core';
import { IonCol, IonItem, IonLabel } from '@ionic/angular/standalone';


@Component({
  selector: 'app-product-property',
  templateUrl: './product-property.component.html',
  styleUrls: ['./product-property.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonItem,
    IonLabel
  ]
})
export class ProductPropertyComponent {

  @Input() label: string | null = null;
  @Input() value: string | number | null = null;

}
