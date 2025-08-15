@echo off
echo SmartWish Survey Environment Setup
echo =================================

echo.
echo Creating backend .env.local file...
(
echo # Survey Backend Environment Configuration
echo.
echo # Application Configuration
echo NODE_ENV=development
echo PORT=3002
echo CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:5174
echo.
echo # Survey Database Configuration (Supabase)
echo DB_HOST=db.lzeuerapdbrouxteluww.supabase.co
echo DB_PORT=5432
echo DB_USERNAME=postgres
echo DB_PASSWORD=your-actual-database-password
echo DB_NAME=postgres
echo.
echo # Supabase Configuration
echo SUPABASE_URL=https://lzeuerapdbrouxteluww.supabase.co
echo SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZXVlcmFwZGJyb3V4dGVsdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ1ODksImV4cCI6MjA3MDg1MDU4OX0.XSK3lQG30zEtIsP1hB9-akrTH0u9tC8eITzaWjSlKiU
echo SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
echo.
echo # Rate Limiting
echo RATE_LIMIT_WINDOW_MS=900000
echo RATE_LIMIT_MAX_REQUESTS=100
echo.
echo # File Upload Configuration
echo MAX_FILE_SIZE=10485760
echo UPLOAD_PATH=./uploads
echo.
echo # Security
echo HELMET_ENABLED=true
) > survey_backend\.env.local

echo.
echo Creating frontend .env.local file...
(
echo # Frontend Environment Configuration
echo VITE_API_URL=http://localhost:3002
echo VITE_SUPABASE_URL=https://lzeuerapdbrouxteluww.supabase.co
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZXVlcmFwZGJyb3V4dGVsdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ1ODksImV4cCI6MjA3MDg1MDU4OX0.XSK3lQG30zEtIsP1hB9-akrTH0u9tC8eITzaWjSlKiU
) > survey_frontend\.env.local

echo.
echo Environment files created successfully!
echo.
echo IMPORTANT: You need to edit these files and replace:
echo 1. your-actual-database-password with your real Supabase database password
echo 2. your-service-role-key with your Supabase service role key
echo.
echo Files created:
echo - survey_backend\.env.local
echo - survey_frontend\.env.local
echo.
pause
