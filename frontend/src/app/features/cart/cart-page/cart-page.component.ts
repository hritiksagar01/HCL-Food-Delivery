import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
      selector: 'app-cart-page',
      standalone: true,
      imports: [CommonModule, RouterModule],
      templateUrl: './cart-page.component.html',
      styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
      cartService = inject(CartService);

      removeItem(index: number) {
            this.cartService.removeFromCart(index);
      }

      clearCart() {
            this.cartService.clearCart();
      }
}
