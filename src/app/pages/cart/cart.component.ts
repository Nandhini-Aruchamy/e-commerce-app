import { Component, inject, signal, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);

  displayedColumns = ['image', 'title', 'price', 'quantity', 'total'];
  dataSource: Signal<CartItem[]> = this.cartService.getCartItems();
  tp: Signal<number> = this.cartService.getTotalPrice1() || signal(0);

  onAddQuantity(item: CartItem) {
    this.cartService.addToCart(item.product);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeQuantity(item.product);
  }

  getTotalCost(): number {
    return this.cartService.getTotalPrice();
  }
}
