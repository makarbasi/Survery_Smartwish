@echo off
echo ========================================
echo Survey Backend Database Setup
echo ========================================
echo.
echo This script will help you set up your database connection.
echo.
echo Please follow these steps to get your Supabase database credentials:
echo.
echo 1. Go to https://supabase.com/dashboard
echo 2. Select your project
echo 3. Go to Settings ^> Database
echo 4. Copy the connection details from the "Connection string" section
echo 5. Go to Settings ^> API to get your API keys
echo.
echo ========================================
echo.
echo Please enter your database credentials:
echo.

set /p DB_HOST="Database Host (e.g., db.abc123.supabase.co): "
set /p DB_PORT="Database Port (default: 5432): "
set /p DB_USERNAME="Database Username (default: postgres): "
set /p DB_PASSWORD="Database Password: "
set /p DB_NAME="Database Name (default: postgres): "
set /p SUPABASE_URL="Supabase URL (e.g., https://abc123.supabase.co): "
set /p SUPABASE_ANON_KEY="Supabase Anon Key: "
set /p SUPABASE_SERVICE_ROLE_KEY="Supabase Service Role Key: "

if "%DB_PORT%"=="" set DB_PORT=5432
if "%DB_USERNAME%"=="" set DB_USERNAME=postgres
if "%DB_NAME%"=="" set DB_NAME=postgres

echo.
echo ========================================
echo Creating .env file...
echo ========================================

(
echo # Survey Backend Environment Configuration
echo.
echo # Application Configuration
echo NODE_ENV=development
echo PORT=3002
echo CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:5174
echo.
echo # Survey Database Configuration ^(Supabase^)
echo DB_HOST=%DB_HOST%
echo DB_PORT=%DB_PORT%
echo DB_USERNAME=%DB_USERNAME%
echo DB_PASSWORD=%DB_PASSWORD%
echo DB_NAME=%DB_NAME%
echo.
echo # Supabase Configuration
echo SUPABASE_URL=%SUPABASE_URL%
echo SUPABASE_ANON_KEY=%SUPABASE_ANON_KEY%
echo SUPABASE_SERVICE_ROLE_KEY=%SUPABASE_SERVICE_ROLE_KEY%
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
) > .env

echo.
echo ========================================
echo .env file created successfully!
echo ========================================
echo.
echo Please restart your backend server for the changes to take effect.
echo.
pause
