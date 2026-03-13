import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
      {
            path: '',
            loadComponent: () => import('./features/food/food-list/food-list.component').then(m => m.FoodListComponent)
      },
      {
            path: 'food/:id',
            loadComponent: () => import('./features/food/food-details/food-details.component').then(m => m.FoodDetailsComponent)
      },
      {
            path: 'cart',
            loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent)
      },
      {
            path: 'checkout',
            canActivate: [authGuard],
            loadComponent: () => import('./features/cart/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
            path: 'orders/tracking',
            canActivate: [authGuard],
            loadComponent: () => import('./features/orders/order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent)
      },
      {
            path: 'orders',
            canActivate: [authGuard],
            loadComponent: () => import('./features/orders/order-history/order-history.component').then(m => m.OrderHistoryComponent)
      },
      {
            path: 'login',
            loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
            path: 'admin',
            canActivate: [adminGuard],
            loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
            path: '**',
            redirectTo: ''
      }
];
