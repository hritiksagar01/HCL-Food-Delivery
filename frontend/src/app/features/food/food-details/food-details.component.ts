import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '../../../core/services/food.service';
import { CartService } from '../../../core/services/cart.service';
import { FoodItem } from '../../../shared/models/food.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
      selector: 'app-food-details',
      standalone: true,
      imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
      templateUrl: './food-details.component.html'
})
export class FoodDetailsComponent implements OnInit {
      route = inject(ActivatedRoute);
      foodService = inject(FoodService);
      cartService = inject(CartService);

      food = signal<FoodItem | undefined>(undefined);
      isLoading = signal<boolean>(true);

      ngOnInit() {
            const idParam = this.route.snapshot.paramMap.get('id');
            if (idParam) {
                  this.foodService.getFoodById(+idParam).subscribe(res => {
                        setTimeout(() => {
                              this.food.set(res);
                              this.isLoading.set(false);
                        }, 300);
                  });
            }
      }

      addToCart() {
            const item = this.food();
            if (item && item.isAvailable) {
                  this.cartService.addToCart(item);
            }
      }
}
