import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FoodItem } from '../../shared/models/food.model';
import { Category } from '../../shared/models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
      providedIn: 'root'
})
export class FoodService {

      // Mock Categories
      private categories: Category[] = [
            { id: 1, name: 'Burgers' },
            { id: 2, name: 'Pizza' },
            { id: 3, name: 'Healthy' },
            { id: 4, name: 'Desserts' },
            { id: 5, name: 'Drinks' }
      ];

      // Mock Food Items
      foods: FoodItem[] = [
            { id: 1, name: 'Classic Cheeseburger', description: 'Juicy beef patty with cheese.', price: 12.99, categoryId: 1, imageUrl: 'burger.png', isAvailable: true },
            { id: 2, name: 'Pepperoni Pizza', description: 'Large pizza with pepperoni.', price: 18.50, categoryId: 2, imageUrl: 'pizza.png', isAvailable: true },
            { id: 3, name: 'Vegan Salad Bowl', description: 'Healthy mix of greens and nuts.', price: 10.00, categoryId: 3, imageUrl: 'salad.png', isAvailable: true },
            { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate layered cake.', price: 6.50, categoryId: 4, imageUrl: 'cake.png', isAvailable: true },
            { id: 5, name: 'Cola Beverage', description: 'Chilled refreshing cola.', price: 2.50, categoryId: 5, imageUrl: 'cola.png', isAvailable: true }
      ];

      constructor() { }

      getCategories(): Observable<Category[]> {
            return of(this.categories);
      }

      getFoodItems(categoryId?: number): Observable<FoodItem[]> {
            if (categoryId) {
                  return of(this.foods.filter(f => f.categoryId === categoryId));
            }
            return of(this.foods);
      }

      getFoodById(id: number): Observable<FoodItem | undefined> {
            return of(this.foods.find(f => f.id === id));
      }
}
