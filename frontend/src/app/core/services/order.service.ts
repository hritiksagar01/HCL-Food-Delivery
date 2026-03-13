import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { OrderItem } from '../../shared/models/order-item.model';

export interface FullOrderInfo {
      order: Order;
      items: OrderItem[];
}

@Injectable({
      providedIn: 'root'
})
export class OrderService {

      private mockOrders: FullOrderInfo[] = [];
      private nextOrderId = 1;

      // Signal for live order tracking 
      activeOrder = signal<FullOrderInfo | null>(null);

      constructor() { }

      placeOrder(userId: number, items: any[], totalAmount: number): Observable<Order> {
            const newOrder: Order = {
                  id: this.nextOrderId++,
                  userId,
                  totalAmount,
                  status: 'Pending',
                  createdAt: new Date().toISOString()
            };

            const orderItems: OrderItem[] = items.map((item, index) => ({
                  id: index + 1,
                  orderId: newOrder.id,
                  foodItemId: item.id,
                  quantity: 1, // Simplified for now since cart just adds single items
                  price: item.price
            }));

            const fullOrder = { order: newOrder, items: orderItems };
            this.mockOrders.push(fullOrder);
            this.activeOrder.set(fullOrder);

            // Simulate real-time status updates for the hackathon demo
            this.simulateOrderProgress(newOrder.id);

            return of(newOrder);
      }

      getUserOrders(userId: number): Observable<Order[]> {
            const orders = this.mockOrders
                  .filter(o => o.order.userId === userId)
                  .map(o => o.order);
            return of(orders);
      }

      getOrderDetails(orderId: number): Observable<FullOrderInfo | undefined> {
            return of(this.mockOrders.find(o => o.order.id === orderId));
      }

      // Admin functions
      getAllOrders(): Order[] {
            return this.mockOrders.map(o => o.order);
      }

      updateOrderStatus(orderId: number, status: 'Pending' | 'Preparing' | 'OutForDelivery' | 'Delivered') {
            const orderInfo = this.mockOrders.find(o => o.order.id === orderId);
            if (orderInfo) {
                  orderInfo.order.status = status;
                  if (this.activeOrder()?.order.id === orderId) {
                        this.activeOrder.set({ ...orderInfo });
                  }
            }
      }

      private simulateOrderProgress(orderId: number) {
            const statuses: Array<'Preparing' | 'OutForDelivery' | 'Delivered'> = ['Preparing', 'OutForDelivery', 'Delivered'];

            statuses.forEach((status, index) => {
                  setTimeout(() => {
                        const orderInfo = this.mockOrders.find(o => o.order.id === orderId);
                        if (orderInfo) {
                              orderInfo.order.status = status;
                              if (this.activeOrder()?.order.id === orderId) {
                                    this.activeOrder.set({ ...orderInfo }); // Trigger signal update
                              }
                        }
                  }, (index + 1) * 5000); // Update status every 5 seconds for demonstration
            });
      }
}
