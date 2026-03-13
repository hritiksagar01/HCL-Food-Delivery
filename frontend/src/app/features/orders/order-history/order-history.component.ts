import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../shared/models/order.model';

@Component({
      selector: 'app-order-history',
      standalone: true,
      imports: [CommonModule],
      templateUrl: './order-history.component.html',
      styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
      orderService = inject(OrderService);
      authService = inject(AuthService);

      orders = signal<Order[]>([]);

      ngOnInit() {
            const userId = this.authService.currentUser()?.id;
            if (userId) {
                  this.orderService.getUserOrders(userId).subscribe(res => {
                        this.orders.set(res);
                  });
            }
      }
}
