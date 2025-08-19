# SmartWish Store Partnership Survey Portal

A full-stack application for managing store partnership interest submissions for SmartWish's digital greeting card platform.

## Project Structure

```
survey/
├── survey_backend/          # NestJS backend API
├── survey_frontend/         # React frontend application
└── README.md               # This file
```

## Quick Start

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd survey_backend
   ```

2. Create a `.env.local` file with your Supabase credentials (see `survey_backend/SETUP.md`)

3. Install dependencies and start:
   ```bash
   npm install
   npm run start:dev
   ```

The backend will run on `http://localhost:3002`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd survey_frontend
   ```

2. Create a `.env.local` file with your configuration (see `survey_frontend/SETUP.md`)

3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## Features

### Backend (NestJS)
- RESTful API for store interest submissions
- PostgreSQL database integration with Supabase
- File upload handling for store images
- Automatic letter generation
- Admin dashboard API endpoints
- CORS configuration for frontend integration

### Frontend (React)
- Responsive design with modern UI
- Store interest submission form
- Admin dashboard for viewing submissions
- Image upload functionality
- Real-time form validation

## Database Schema

The application uses two main tables:
- `sw_store_interests`: Store partnership submissions
- `sw_store_interest_images`: Images uploaded for each submission

## Environment Variables

### Backend Required Variables
- `DB_HOST`: Supabase database host
- `DB_PORT`: Database port (5432)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

### Frontend Required Variables
- `VITE_API_URL`: Backend API URL
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## API Endpoints

- `POST /store-interests` - Submit new store interest
- `GET /store-interests` - List all submissions
- `GET /store-interests/:id` - Get specific submission
- `GET /store-interests/stats` - Get submission statistics
- `POST /store-interests/:id/images` - Upload images for submission

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account and project

### Running Tests
```bash
# Backend tests
cd survey_backend
npm run test

# Frontend tests (if configured)
cd survey_frontend
npm run test
```

## Deployment

### Render.com Deployment

This application can be deployed on Render.com in two ways:

#### Option 1: Manual Deployment (Recommended)
Follow the step-by-step manual deployment guide: [MANUAL_DEPLOYMENT.md](./MANUAL_DEPLOYMENT.md)

**Advantages:**
- More control over each service
- Easier to troubleshoot
- Better understanding of the deployment process
- Can deploy services independently

#### Option 2: Blueprint Deployment
Use the automated Blueprint deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)

**Advantages:**
- Faster initial setup
- Automated configuration
- Single-click deployment

**Quick Steps (Manual):**
1. Push your code to GitHub
2. Create Web Service for backend
3. Create Static Site for frontend
4. Configure environment variables
5. Deploy and test

### Manual Deployment

#### Backend
1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to your preferred hosting platform

#### Frontend
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your web server

## Support

For technical support or questions about the partnership program, contact:
- **Email**: partnerships@smartwish.com
- **Technical Issues**: Check the setup guides in each directory

## License

This project is proprietary to SmartWish. All rights reserved.
