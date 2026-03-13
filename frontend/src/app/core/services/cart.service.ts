import { Injectable, signal, computed } from '@angular/core';
import { FoodItem } from '../../shared/models/food.model';

@Injectable({
      providedIn: 'root'
})
export class CartService {
      cartItems = signal<FoodItem[]>([]);

      cartTotal = computed(() => {
            return this.cartItems().reduce((acc, item) => acc + item.price, 0);
      });

      cartCount = computed(() => this.cartItems().length);

      addToCart(food: FoodItem) {
            this.cartItems.update(items => [...items, food]);
      }

      removeFromCart(index: number) {
            this.cartItems.update(items => {
                  const newItems = [...items];
                  newItems.splice(index, 1);
                  return newItems;
            });
      }

      clearCart() {
            this.cartItems.set([]);
      }
}
