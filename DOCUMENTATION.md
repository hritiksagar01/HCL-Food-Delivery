# HCL Food Delivery - Complete Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [Getting Started](#getting-started)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Authentication & Authorization](#authentication--authorization)
9. [Development Workflow](#development-workflow)

---

## Project Overview

HCL Food Delivery is a full-stack food delivery application built with:
- **Backend**: ASP.NET Core 9.0 Web API
- **Frontend**: Angular 21.2.0 (Standalone Components)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Entity Framework Core 9.0

The application provides a complete food ordering system with role-based access control for customers and administrators.

### Key Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Food Menu**: Browse food items with category filtering
- **Shopping Cart**: Add items to cart and manage orders
- **Order Management**: Real-time order tracking with status updates
- **Admin Dashboard**: Manage orders, inventory, and monitor system activity
- **Role-Based Access Control**: Separate interfaces for customers and administrators

---

## Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  Angular        │────────▶│   ASP.NET Core  │────────▶│   PostgreSQL    │
│  Frontend       │  HTTP   │   Web API       │  EF     │   Database      │
│  (Port 4200)    │◀────────│   (Port 5001)   │◀────────│   (fooddb)      │
│                 │  JSON   │                 │  Core   │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Frontend Architecture

- **Architecture**: Strict Standalone Components (no NgModules)
- **State Management**: Angular Signals for reactive UI updates
- **Routing**: Lazy-loaded routes via `loadComponent`
- **Design System**: Custom SCSS design system ("Urbee" aesthetic)
- **Services**: Core logic in `AuthService`, `FoodService`, `CartService`, `OrderService`

### Backend Architecture

- **Framework**: ASP.NET Core 9.0 Web API
- **ORM**: Entity Framework Core with PostgreSQL provider
- **Authentication**: JWT Bearer token authentication
- **API Documentation**: Swagger/OpenAPI

---

## Backend Documentation

### Technology Stack

- **.NET Version**: 9.0
- **Database**: PostgreSQL (via Npgsql.EntityFrameworkCore.PostgreSQL)
- **Authentication**: JWT Bearer (Microsoft.AspNetCore.Authentication.JwtBearer)
- **API Documentation**: Swashbuckle (Swagger)
- **ORM**: Entity Framework Core 9.0

### Project Structure

```
Backends/
├── Contracts/          # DTOs and request/response models
├── Controllers/        # API endpoints
├── Data/              # DbContext and database configuration
├── Migrations/        # EF Core migrations
├── Models/            # Entity models
├── Properties/        # Project properties
├── Services/          # Business logic services
├── Program.cs         # Application entry point
├── appsettings.json   # Configuration (production)
└── appsettings.Development.json  # Configuration (development)
```

### Configuration

The backend requires the following configuration in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=fooddb;Username=user;Password=pass"
  },
  "Jwt": {
    "Key": "your-secret-key",
    "Issuer": "your-issuer",
    "Audience": "your-audience",
    "ExpiryMinutes": 60
  }
}
```

### Seeded Development Data

On startup, the application automatically seeds:
- **Admin User**:
  - Email: `admin@food.local`
  - Password: `Admin@123`
  - Role: `Admin`
- **Categories**: Pizza, Burgers, Beverages

### Running the Backend

#### Prerequisites
- .NET 9.0 SDK
- PostgreSQL database server

#### Setup Commands

```powershell
# Navigate to backend directory
cd Backends

# Restore dependencies
dotnet restore .\HCL-Food-Delivery.csproj

# Build the project
dotnet build .\HCL-Food-Delivery.csproj

# Run the application
dotnet run --project .\HCL-Food-Delivery.csproj
```

The API will be available at `https://localhost:5001`

#### Database Migration Commands

```powershell
# Install EF Core tools (if not already installed)
dotnet tool install --global dotnet-ef

# Create a new migration
dotnet ef migrations add MigrationName --project .\HCL-Food-Delivery.csproj --startup-project .\HCL-Food-Delivery.csproj --output-dir Migrations

# Apply migrations to database
dotnet ef database update --project .\HCL-Food-Delivery.csproj --startup-project .\HCL-Food-Delivery.csproj
```

---

## Frontend Documentation

### Technology Stack

- **Angular Version**: 21.2.0
- **TypeScript**: 5.9.2
- **Testing Framework**: Vitest 4.0.8
- **Package Manager**: npm 11.6.2
- **Build System**: Angular CLI

### Project Structure

```
frontend/
├── src/
│   ├── app/              # Application components and services
│   ├── environments/     # Environment configurations
│   └── assets/          # Static assets (images, styles)
├── public/              # Public assets
├── angular.json         # Angular CLI configuration
├── package.json         # Node dependencies
└── tsconfig.json        # TypeScript configuration
```

### Core Services

1. **AuthService**: Handles authentication, login, registration, and token management
2. **FoodService**: Manages food items and categories
3. **CartService**: Shopping cart state management using Angular Signals
4. **OrderService**: Order creation and tracking

### Features Implementation Status

#### Phase 1: HTML & Logic ✅ Complete
- ✅ Project initialization and structure
- ✅ Environment setup
- ✅ Models and interfaces
- ✅ Services with mock data
- ✅ Shared components
- ✅ Feature components
- ✅ Routing configuration
- ✅ Component logic implementation

#### Phase 2: CSS & Styling ✅ Complete
- ✅ Global styles and variables
- ✅ Layout components (Navbar, Footer)
- ✅ Shared component styling
- ✅ Feature page styling

#### Phase 3: Backend Integration 🔄 In Progress
- 🔄 Replace mock APIs with real endpoints
- ⏳ End-to-end testing

### Running the Frontend

#### Prerequisites
- Node.js (LTS version recommended)
- npm 11.6.2 or higher

#### Setup Commands

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

#### Other Commands

```bash
# Build for production
ng build

# Run unit tests
ng test

# Run end-to-end tests
ng e2e

# Generate a new component
ng generate component component-name
```

---

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "Customer"
  }
}
```

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Category Endpoints

#### GET `/api/categories`
Get all food categories.

**Response:**
```json
[
  { "id": 1, "name": "Pizza" },
  { "id": 2, "name": "Burgers" },
  { "id": 3, "name": "Beverages" }
]
```

### Food Endpoints

#### GET `/api/foods`
Get all food items. Supports optional category filtering.

**Query Parameters:**
- `categoryId` (optional): Filter by category ID

**Example:** `/api/foods?categoryId=1`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato and mozzarella",
    "price": 12.99,
    "categoryId": 1,
    "imageUrl": "https://example.com/pizza.jpg",
    "isAvailable": true
  }
]
```

#### GET `/api/foods/{id}`
Get a specific food item by ID.

#### PUT `/api/foods/{id}` [Admin Only]
Update food item details (availability, price, etc.).

**Request Body:**
```json
{
  "name": "Margherita Pizza",
  "description": "Updated description",
  "price": 13.99,
  "categoryId": 1,
  "imageUrl": "https://example.com/pizza.jpg",
  "isAvailable": true
}
```

### Order Endpoints

#### POST `/api/orders`
Create a new order.

**Request Body:**
```json
{
  "userId": 1,
  "items": [
    {
      "foodItemId": 1,
      "quantity": 2,
      "price": 12.99
    }
  ],
  "totalAmount": 25.98
}
```

**Response:** Created order object

#### GET `/api/orders/user/{userId}`
Get all orders for a specific user.

#### GET `/api/orders/{id}`
Get detailed information for a specific order.

**Response:**
```json
{
  "order": {
    "id": 1,
    "userId": 1,
    "totalAmount": 25.98,
    "status": "Pending",
    "createdAt": "2026-03-13T15:30:00Z"
  },
  "items": [
    {
      "id": 1,
      "orderId": 1,
      "foodItemId": 1,
      "quantity": 2,
      "price": 12.99
    }
  ]
}
```

#### GET `/api/orders` [Admin Only]
Get all orders in the system.

#### PUT `/api/orders/{id}/status` [Admin Only]
Update the status of an order.

**Request Body:**
```json
{
  "status": "Preparing"
}
```

**Supported Status Values:**
- `Pending`
- `Preparing`
- `OutForDelivery`
- `Delivered`

#### GET `/api/admin/dashboard` [Admin Only]
Get dashboard statistics and metrics.

---

## Database Schema

### Users Table
```sql
CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('Admin','Customer') DEFAULT 'Customer',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);
```

### FoodItems Table
```sql
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
```

### Orders Table
```sql
CREATE TABLE Orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    Status ENUM('Pending','Preparing','OutForDelivery','Delivered') DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);
```

### OrderItems Table
```sql
CREATE TABLE OrderItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    FoodItemId INT NOT NULL,
    Quantity INT DEFAULT 1,
    Price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    FOREIGN KEY (FoodItemId) REFERENCES FoodItems(Id) ON DELETE CASCADE
);
```

---

## Authentication & Authorization

### JWT Token Structure

JWT tokens issued by the backend contain the following claims:
- `NameIdentifier`: User ID
- `Email`: User email address
- `Role`: User role (`Admin` or `Customer`)

### Role-Based Access Control

#### Customer Role (`Customer`)
Can access:
- Browse food menu
- Add items to cart
- Create orders
- View own orders
- Track order status

#### Admin Role (`Admin`)
Can access all customer features plus:
- View all orders
- Update order status
- Manage food inventory
- Update food availability
- View admin dashboard

### Protected Endpoints

Endpoints marked `[Admin Only]` require:
1. Valid JWT token in Authorization header
2. Role claim with value `Admin`

**Authorization Header Format:**
```
Authorization: Bearer <jwt-token>
```

---

## Development Workflow

### Full Stack Development Setup

1. **Start PostgreSQL Database**
   ```bash
   # Ensure PostgreSQL is running on default port 5432
   ```

2. **Start Backend API**
   ```bash
   cd Backends
   dotnet restore
   dotnet run
   ```
   API runs at `https://localhost:5001`

3. **Start Frontend Application**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Application runs at `http://localhost:4200`

### Testing the Integration

1. **Test Authentication:**
   - Login with admin credentials: `admin@food.local` / `Admin@123`
   - Verify JWT token is stored and sent with requests

2. **Test Customer Flow:**
   - Browse food menu
   - Add items to cart
   - Complete checkout
   - Track order status

3. **Test Admin Flow:**
   - Access admin dashboard
   - View all orders
   - Update order status
   - Manage food inventory

### API Testing

Use the included `HCL-Food-Delivery.http` file for manual API testing with REST clients.

Swagger UI is available at: `https://localhost:5001/swagger`

---

## Environment Configuration

### Frontend Environment

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

### Backend Environment

**Development** (`appsettings.Development.json`):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=fooddb;Username=postgres;Password=postgres"
  },
  "Jwt": {
    "Key": "development-secret-key-min-32-chars",
    "Issuer": "HCL-Food-Delivery",
    "Audience": "HCL-Food-Delivery-Users",
    "ExpiryMinutes": 60
  }
}
```

---

## Troubleshooting

### Common Backend Issues

**Database Connection Error:**
- Verify PostgreSQL is running
- Check connection string in `appsettings.json`
- Ensure database `fooddb` exists
- Run `dotnet ef database update`

**JWT Authentication Error:**
- Verify JWT Key is at least 32 characters
- Check token expiry time
- Ensure Issuer and Audience match between token generation and validation

### Common Frontend Issues

**CORS Error:**
- Ensure backend CORS policy allows `http://localhost:4200`
- Check `Program.cs` for CORS configuration

**API Connection Error:**
- Verify backend is running on `https://localhost:5001`
- Check `environment.ts` has correct API URL
- Verify SSL certificate is trusted

**Build Error:**
- Delete `node_modules` and run `npm install` again
- Clear Angular cache: `ng cache clean`

---

## Project Status

### Completed ✅
- Backend API implementation
- Database schema and migrations
- JWT authentication system
- Frontend UI components
- Shopping cart functionality
- Order management system
- Admin dashboard

### In Progress 🔄
- Backend-Frontend integration
- Real-time order tracking with SignalR
- End-to-end testing

### Planned ⏳
- Payment gateway integration
- Email notifications
- Push notifications
- Analytics dashboard
- Performance optimization

---

## Contributing

When contributing to this project:

1. Follow the existing code style
2. Write unit tests for new features
3. Update documentation for API changes
4. Test both backend and frontend changes
5. Ensure migrations are included for database changes

---

## Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation in Swagger
- Consult the README files in `/Backends` and `/frontend` directories

---

## License

This project is part of HCL training and development.
