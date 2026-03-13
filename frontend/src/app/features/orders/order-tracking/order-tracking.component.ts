import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';

@Component({
      selector: 'app-order-tracking',
      standalone: true,
      imports: [CommonModule, RouterModule],
      templateUrl: './order-tracking.component.html',
      styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent {
      orderService = inject(OrderService);
}
