import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsDataService } from '../services/products-data.service';
import { IProduct } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductComponent  implements OnInit {

  @Input() set id(productId: string) {
    this.product = this.productDataService.getProduct(productId);
  }

  private productDataService = inject(ProductsDataService);

  product: IProduct | null = null;

  constructor() { }

  ngOnInit() {
  }

}
