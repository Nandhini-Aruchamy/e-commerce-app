import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProductList } from '../../../models/product';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CurrencyPipe],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBoxComponent {
  @Input() product: ProductList | undefined;
  @Output() addToCart = new EventEmitter<ProductList>();
  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
