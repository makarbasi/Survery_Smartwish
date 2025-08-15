# SmartWish Survey Frontend Setup Guide

## Environment Configuration

To run the frontend successfully, create a `.env.local` file in the `survey_frontend` directory with the following content:

```bash
# Frontend Environment Configuration
VITE_API_URL=http://localhost:3002
VITE_SUPABASE_URL=https://lzeuerapdbrouxteluww.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZXVlcmFwZGJyb3V4dGVsdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ1ODksImV4cCI6MjA3MDg1MDU4OX0.XSK3lQG30zEtIsP1hB9-akrTH0u9tC8eITzaWjSlKiU
```

## Installation and Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Backend Connection

The frontend is configured to connect to the backend at `http://localhost:3002`. Make sure:

1. The backend is running on port 3002
2. The backend has CORS enabled for the frontend origin
3. Your environment variables are properly set

## Features

- **Home Page**: Welcome page with navigation to other sections
- **Store Interest Form**: Form for stores to submit partnership interest
- **Admin Dashboard**: Dashboard to view submissions and manage data

## Troubleshooting

- If you get API connection errors, ensure the backend is running
- Check that the `VITE_API_URL` is correct
- Verify that CORS is properly configured on the backend
- Make sure all environment variables are set correctly

## Development

The frontend uses:
- React 18
- React Router for navigation
- Vite for build tooling
- CSS modules for styling
