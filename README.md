# HCL Food Delivery

A full-stack food delivery application built with ASP.NET Core and Angular.

## 📋 Quick Overview

- **Backend**: ASP.NET Core 9.0 Web API with PostgreSQL
- **Frontend**: Angular 21.2.0 with Standalone Components
- **Authentication**: JWT Bearer Tokens
- **Database**: PostgreSQL with Entity Framework Core

## 🚀 Quick Start

### Backend
```bash
cd Backends
dotnet restore
dotnet run
```
API runs at `https://localhost:5001`

### Frontend
```bash
cd frontend
npm install
npm start
```
App runs at `http://localhost:4200`

### Default Admin Credentials
- Email: `admin@food.local`
- Password: `Admin@123`

## 📚 Documentation

For complete documentation including:
- Architecture details
- API endpoints reference
- Database schema
- Setup instructions
- Troubleshooting guide

**See [DOCUMENTATION.md](./DOCUMENTATION.md)**

## 📁 Project Structure

```
HCL-Food-Delivery/
├── Backends/           # ASP.NET Core Web API
│   └── README.md      # Backend-specific documentation
├── frontend/          # Angular application
│   └── README.md      # Frontend-specific documentation
└── DOCUMENTATION.md   # Complete project documentation
```

## 🔗 Additional Resources

- [Backend Documentation](./Backends/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Complete API Documentation](./DOCUMENTATION.md#api-endpoints)
