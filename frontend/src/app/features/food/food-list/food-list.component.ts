import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../../core/services/food.service';
import { CartService } from '../../../core/services/cart.service';
import { Category } from '../../../shared/models/category.model';
import { FoodItem } from '../../../shared/models/food.model';
import { FoodCardComponent } from '../../../shared/components/food-card/food-card.component';
import { CategoryFilterComponent } from '../../../shared/components/category-filter/category-filter.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
      selector: 'app-food-list',
      standalone: true,
      imports: [CommonModule, FoodCardComponent, CategoryFilterComponent, LoadingSpinnerComponent],
      templateUrl: './food-list.component.html',
      styleUrl: './food-list.component.scss'
})
export class FoodListComponent implements OnInit {
      foodService = inject(FoodService);
      cartService = inject(CartService);

      categories = signal<Category[]>([]);
      foods = signal<FoodItem[]>([]);
      selectedCategoryId = signal<number | undefined>(undefined);
      isLoading = signal<boolean>(true);

      ngOnInit() {
            this.foodService.getCategories().subscribe(res => {
                  this.categories.set(res);
                  this.loadFoods();
            });
      }

      loadFoods(categoryId?: number) {
            this.isLoading.set(true);
            this.selectedCategoryId.set(categoryId);
            this.foodService.getFoodItems(categoryId).subscribe(res => {
                  // simulate network delay
                  setTimeout(() => {
                        this.foods.set(res);
                        this.isLoading.set(false);
                  }, 500);
            });
      }

      onCategorySelect(id?: number) {
            this.loadFoods(id);
      }

      onAddToCart(item: FoodItem) {
            this.cartService.addToCart(item);
      }
}
