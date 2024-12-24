import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadge,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartService = inject(CartService);
  get test() {
    console.count('header getter');
    return 'getter';
  }
  cartItemCount = this.cartService.getCartItemsCount();
}
