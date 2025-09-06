# SMEease - SME Automation Platform

A comprehensive SME (Small and Medium Enterprise) automation platform built with React, Vercel Serverless Functions, and PostgreSQL.

## Features

- **Employee Management**: Complete CRUD operations for employee data
- **Inventory Management**: Product tracking with supplier management
- **Payroll System**: Payroll periods and payslip generation
- **Sales Tracking**: Employee-product sales monitoring
- **Tax Documentation**: Tax document management
- **Dashboard**: Real-time analytics and overview

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Vercel Serverless Functions + TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Deployment**: Vercel (Full-stack)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sajid40IUT/SMEase-Frontend-backend-.git
   cd SMEase-Frontend-backend-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Update the .env file with your Supabase database credentials
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Add sample data to Supabase**
   - Go to your Supabase project SQL Editor
   - Run the sample data from `SMEease_backend/scripts/sample_data.sql`

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - API: http://localhost:5173/api/employees (etc.)

## Deployment

### Vercel + Supabase (All-in-One)

This project is configured for deployment on:
- **Frontend & Backend**: Vercel (Serverless Functions)
- **Database**: Supabase

### Environment Variables

#### Vercel Environment Variables
```
DATABASE_URL=your-supabase-database-url
DIRECT_URL=your-supabase-direct-url
NODE_ENV=production
```

### Deployment Steps

1. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Vercel will automatically detect Vite framework
   - Add environment variables in Vercel dashboard
   - Deploy

2. **Set up Supabase Database**
   - Create a new Supabase project
   - Go to SQL Editor
   - Run the sample data migration from `SMEease_backend/scripts/sample_data.sql`
   - Copy database credentials to Vercel environment variables

## Project Structure

```
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   ├── screens/                  # Page components
│   ├── lib/                      # Utilities and API configuration
│   └── App.tsx                   # Main app component
├── SMEease_backend/              # Backend source code
│   ├── src/                      # Backend source code
│   │   ├── controllers/          # API controllers
│   │   ├── routes/               # API routes
│   │   └── app.ts                # Express app setup
│   ├── prisma/                   # Database schema and migrations
│   └── scripts/                  # Database migration scripts
├── public/                       # Static assets
└── package.json                  # Frontend dependencies
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/suppliers` - Get all suppliers
- `GET /api/sales` - Get all sales
- `GET /api/payroll-periods` - Get payroll periods
- `GET /api/payslips` - Get payslips
- `GET /api/tax-documents` - Get tax documents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.