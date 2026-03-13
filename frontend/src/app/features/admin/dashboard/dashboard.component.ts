import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { FoodService } from '../../../core/services/food.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
      selector: 'app-admin-dashboard',
      standalone: true,
      imports: [CommonModule, FormsModule],
      templateUrl: './admin-dashboard.component.html',
      styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
      orderService = inject(OrderService);
      foodService = inject(FoodService);
      authService = inject(AuthService);
      router = inject(Router);

      activeTab: 'orders' | 'inventory' = 'orders';

      get orders() {
            return this.orderService.getAllOrders();
      }

      foods = this.foodService.foods;

      updateOrderStatus(orderId: number, status: string) {
            this.orderService.updateOrderStatus(orderId, status as any);
      }

      logout() {
            this.authService.logout();
            this.router.navigate(['/login']);
      }
}
