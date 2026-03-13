import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
      providedIn: 'root'
})
export class AuthService {

      currentUser = signal<User | null>(null);

      login(email: string) {
            // Mock login simulating a backend response
            const role: 'Admin' | 'Customer' = email.toLowerCase().includes('admin') ? 'Admin' : 'Customer';

            const mockUser: User = {
                  id: role === 'Admin' ? 999 : 1,
                  name: role === 'Admin' ? 'Admin User' : 'Demo User',
                  email: email,
                  role: role
            };
            this.currentUser.set(mockUser);
      }

      logout() {
            this.currentUser.set(null);
      }

      isAuthenticated(): boolean {
            return this.currentUser() !== null;
      }

      isAdmin(): boolean {
            const user = this.currentUser();
            return user !== null && user.role === 'Admin';
      }
}
