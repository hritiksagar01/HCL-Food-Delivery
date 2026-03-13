# Backend Integration & App Structure Overview

This document summarizes the current state of the Angular Food Delivery application, the transition plan from mock data to real data, and detailed instructions/schema for the ASP.NET Core backend engineering team.

---

## 1. Current App Structure (Frontend)

The frontend is an Angular 17+ application heavily utilizing modern features:
- **Architecture**: Strict Standalone Components (`standalone: true`). No `NgModules`.
- **State Management**: Angular Signals (e.g., `cartItems = signal<FoodItem[]>([])`) are used for reactive UI updates across the Cart and Order Tracking flow.
- **Routing**: Lazy-loaded routes via `loadComponent` in `app.routes.ts`.
- **Design System**: A fully customized SCSS design system (the "Urbee" aesthetic) with dedicated component-level styles.
- **Services Layers**: Core logic is extracted into `AuthService`, `FoodService`, `CartService`, and `OrderService`. Currently, these services return mock data via RxJS `Observable`s (`of(...)`).

### Core Features Built & Styled:
1. **Authentication**: Login page and Role-based Route Guards (`Admin` vs `Customer`).
2. **Food Menu**: Browsable menu with Category filtering tabs.
3. **Cart & Checkout**: Split-layout cart review and a payment/address form.
4. **Order Management**: Live order tracking (CSS visual stepper) and Historical order tables.
5. **Admin Dashboard**: Tabbed interface to manage incoming orders (update status) and inventory (stock availability).

---

## 2. Transitioning: Phase 3 (Mock to Real Data)

Currently, the frontend simulates API calls. The `src/environments/environment.ts` contains `apiUrl: 'https://localhost:5001/api'`.

**To switch to real data**, the frontend team will simply:
1. Inject the `HttpClient` into the core services.
2. Replace local arrays (e.g., `mockOrders`, `foods`) and `of(mockData)` with actual `this.http.get()` or `this.http.post()` calls targeting the ASP.NET Core API endpoints.
3. Replace the simulated 5-second timeout for the Live Order Tracking with real SignalR WebSockets (optional) or HTTP polling.

The frontend is already tightly bound to the TypeScript interfaces, meaning as long as the backend returns JSON matching these contracts, the integration will be seamless.

---

## 3. Backend Instructions & Database Schema (ASP.NET Core + MySQL/SQL Server)

The backend must expose RESTful endpoints that match the following data contracts. Entity Framework Core (EF Core) is recommended for ORM targeting a relational database.

### Database Schema Definition

```sql
-- 1. Users Table
CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('Admin','Customer') DEFAULT 'Customer',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- 3. Food Items Table
CREATE TABLE FoodItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    CategoryId INT,
    ImageUrl VARCHAR(255),
    IsAvailable BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id) ON DELETE SET NULL
);

-- 4. Orders Table
CREATE TABLE Orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    Status ENUM('Pending','Preparing','OutForDelivery','Delivered') DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- 5. Order Items (Join Table)
CREATE TABLE OrderItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    FoodItemId INT NOT NULL,
    Quantity INT DEFAULT 1,
    Price DECIMAL(10,2) NOT NULL, -- Snapshot of price at time of order
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    FOREIGN KEY (FoodItemId) REFERENCES FoodItems(Id) ON DELETE CASCADE
);
```

### Required REST API Endpoints

The frontend services expect the following API structure. All secure endpoints require standard JWT Authentication (`Authorize` attribute in .NET).

#### Auth Service (`/api/auth`)
- `POST /api/auth/login`: Accepts `{ email, password }`, returns `{ token, user: { id, name, email, role } }`.
- `POST /api/auth/register`: (If applicable) registers a new user.

#### Food & Category Service (`/api/foods`, `/api/categories`)
- `GET /api/categories`: Returns an array of Categories.
- `GET /api/foods`: Returns an array of FoodItems. (Support optional `?categoryId=1` query param).
- `GET /api/foods/{id}`: Returns a single FoodItem details.
- `PUT /api/foods/{id}`: [ADMIN ONLY] Update food availability/details.

#### Order Service (`/api/orders`)
- `POST /api/orders`: Create a new order. 
  - Payload: `{ userId, items: [{ foodItemId, quantity, price }], totalAmount }`
  - Returns: The created `Order` object.
- `GET /api/orders/user/{userId}`: Get all orders for a specific user.
- `GET /api/orders/{id}`: Get a specific `FullOrderInfo` payload.
  - Returns: `{ order: { ... }, items: [ { ... }, ... ] }`
- `GET /api/orders`: [ADMIN ONLY] Get all orders globally.
- `PUT /api/orders/{id}/status`: [ADMIN ONLY] Update the status of an order.
  - Payload: `"Preparing"` / `"OutForDelivery"` / `"Delivered"`

### JWT & Authorization Considerations
- The frontend `AuthGuard` and `AdminGuard` rely on the user's `role` property (`'Admin'` | `'Customer'`). 
- The backend should encode claims correctly: `new Claim(ClaimTypes.Role, "Admin")`.
- Protect the `[ADMIN ONLY]` endpoints with `[Authorize(Roles = "Admin")]`.
