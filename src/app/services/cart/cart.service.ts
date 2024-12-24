import { computed, Injectable, signal, Signal } from '@angular/core';
import { CartItem } from '../../models/cart';
import { ProductList } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private cartItemsCount = signal<number>(0);

  addToCart(newItem: ProductList) {
    let existingItem =
      this.cartItems() &&
      this.cartItems().find((cartItem) => cartItem.product.id == newItem.id);

    if (existingItem) {
      this.cartItems.update((items: CartItem[]) => {
        items.map((item) => {
          if (item.product.id == existingItem.product.id) item.quantity++;
        });
        return [...items];
      });
    } else
      this.cartItems.update((items) => [
        ...items,
        { product: newItem, quantity: 1 },
      ]);

    this.cartItemsCount.update((count) => count + 1);
  }

  removeQuantity(cartItem: ProductList) {
    this.cartItems.update((items: CartItem[]) => {
      items.map((item) => {
        if (item.product.id == cartItem.id) item.quantity--;
      });
      return [...items];
    });
    this.cartItemsCount.update((count) => count - 1);
  }

  getTotalPrice(): number {
    return this.cartItems().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  getTotalPrice1(): Signal<number> {
    let totalPrice = computed(() => {
      return this.cartItems().reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0);
    });
    return totalPrice;
  }

  getCartItems(): Signal<CartItem[]> {
    return this.cartItems;
  }

  getCartItemsCount(): Signal<number> {
    return this.cartItemsCount;
  }
}
