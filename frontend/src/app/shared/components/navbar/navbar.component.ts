import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
      selector: 'app-navbar',
      standalone: true,
      imports: [CommonModule, RouterModule],
      templateUrl: './navbar.component.html',
      styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
      cartService = inject(CartService);
}
