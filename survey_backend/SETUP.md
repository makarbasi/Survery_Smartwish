# SmartWish Survey Backend Setup Guide

## Environment Configuration

To run the backend successfully, you need to set up environment variables. Create a `.env.local` file in the `survey_backend` directory with the following content:

```bash
# Survey Backend Environment Configuration

# Application Configuration
NODE_ENV=development
PORT=3002
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:5174

# Survey Database Configuration (Supabase)
DB_HOST=db.lzeuerapdbrouxteluww.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-actual-database-password
DB_NAME=postgres

# Supabase Configuration
SUPABASE_URL=https://lzeuerapdbrouxteluww.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZXVlcmFwZGJyb3V4dGVsdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ1ODksImV4cCI6MjA3MDg1MDU4OX0.XSK3lQG30zEtIsP1hB9-akrTH0u9tC8eITzaWjSlKiU
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Security
HELMET_ENABLED=true
```

## Important Notes

1. **Database Password**: Replace `your-actual-database-password` with your actual Supabase database password
2. **Service Role Key**: Replace `your-service-role-key` with your Supabase service role key for admin operations

## Installation and Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run in development mode:
   ```bash
   npm run start:dev
   ```

4. Run in production mode:
   ```bash
   npm run start:prod
   ```

## Database Setup

The application will automatically create the required tables using TypeORM entities. Make sure your Supabase database is accessible and the credentials are correct.

## Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:3002`. Make sure the backend is running before testing the frontend.

## Troubleshooting

- If you get database connection errors, verify your Supabase credentials
- Check that the database host and port are correct
- Ensure your database password is properly set
- Verify that your Supabase project allows connections from your IP address
