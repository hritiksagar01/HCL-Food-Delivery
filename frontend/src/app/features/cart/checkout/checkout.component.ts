import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
      selector: 'app-checkout',
      standalone: true,
      imports: [CommonModule],
      templateUrl: './checkout.component.html',
      styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
      cartService = inject(CartService);
      orderService = inject(OrderService);
      authService = inject(AuthService);
      router = inject(Router);

      isProcessing = false;

      placeOrder() {
            // For MVP, user must be logged in. Mock a user if not authenticated
            if (!this.authService.isAuthenticated()) {
                  this.authService.login('guest@demo.com');
            }

            const userId = this.authService.currentUser()?.id || 1;

            this.isProcessing = true;

            // Simulate placing order
            setTimeout(() => {
                  this.orderService.placeOrder(
                        userId,
                        this.cartService.cartItems(),
                        this.cartService.cartTotal()
                  ).subscribe(order => {
                        this.cartService.clearCart();
                        this.isProcessing = false;
                        this.router.navigate(['/orders', 'tracking']);
                  });
            }, 1000);
      }
}
