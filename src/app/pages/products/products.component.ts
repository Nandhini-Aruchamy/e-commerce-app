import {
  Component,
  inject,
  ChangeDetectionStrategy,
  PLATFORM_ID,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductsService } from '../../services/products/products.service';
import { ProductList } from '../../models/product';
import { of, Subject, takeUntil } from 'rxjs';
import { ProductBoxComponent } from './product-box/product-box.component';
import { CartService } from '../../services/cart/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatGridListModule, ProductBoxComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  productService = inject(ProductsService);
  cartService = inject(CartService);
  platform_id = inject(PLATFORM_ID);

  productList = toSignal(this.productService.getAllProducts());

  constructor() {
    console.log(this.platform_id);
    if (this.platform_id == 'browser')
      console.log(sessionStorage.getItem('loggedinUser'));
  }

  onAddToCart(product: ProductList) {
    this.cartService.addToCart(product);
  }

  // ngDoCheck() {
  //   console.count('product CD');
  // }
  // ngAfterContentChecked() {
  //   console.count('product render');
  // }

  // ngOnDestroy(): void {
  //   this.unSubscribe.next();
  //   this.unSubscribe.complete();
  // }
}
