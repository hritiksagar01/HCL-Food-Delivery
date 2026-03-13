import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

@Component({
      selector: 'app-category-filter',
      standalone: true,
      imports: [CommonModule],
      templateUrl: './category-filter.component.html',
      styleUrl: './category-filter.component.scss' // Explicit reference here incase multi replace fails
})
export class CategoryFilterComponent {
      @Input({ required: true }) categories: Category[] = [];
      @Input() selectedCategoryId?: number;
      @Output() categorySelected = new EventEmitter<number | undefined>();

      selectCategory(id?: number) {
            this.categorySelected.emit(id);
      }
}
