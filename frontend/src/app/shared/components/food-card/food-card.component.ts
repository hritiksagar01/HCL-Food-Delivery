import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodItem } from '../../models/food.model';

@Component({
      selector: 'app-food-card',
      standalone: true,
      imports: [CommonModule, RouterModule],
      templateUrl: './food-card.component.html',
      styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {
      @Input({ required: true }) food!: FoodItem;
      @Output() addToCart = new EventEmitter<FoodItem>();

      onAddToCart() {
            this.addToCart.emit(this.food);
      }
}
