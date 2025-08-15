# Survey Backend Database Setup Script
# Run this script in PowerShell to configure your database connection

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Survey Backend Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you set up your database connection." -ForegroundColor Yellow
Write-Host ""
Write-Host "Please follow these steps to get your Supabase database credentials:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to https://supabase.com/dashboard" -ForegroundColor White
Write-Host "2. Select your project" -ForegroundColor White
Write-Host "3. Go to Settings → Database" -ForegroundColor White
Write-Host "4. Copy the connection details from the 'Connection string' section" -ForegroundColor White
Write-Host "5. Go to Settings → API to get your API keys" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get database credentials from user
$DB_HOST = Read-Host "Database Host (e.g., db.abc123.supabase.co)"
$DB_PORT = Read-Host "Database Port (default: 5432)"
$DB_USERNAME = Read-Host "Database Username (default: postgres)"
$DB_PASSWORD = Read-Host "Database Password" -AsSecureString
$DB_NAME = Read-Host "Database Name (default: postgres)"
$SUPABASE_URL = Read-Host "Supabase URL (e.g., https://abc123.supabase.co)"
$SUPABASE_ANON_KEY = Read-Host "Supabase Anon Key"
$SUPABASE_SERVICE_ROLE_KEY = Read-Host "Supabase Service Role Key"

# Set defaults if empty
if ([string]::IsNullOrEmpty($DB_PORT)) { $DB_PORT = "5432" }
if ([string]::IsNullOrEmpty($DB_USERNAME)) { $DB_USERNAME = "postgres" }
if ([string]::IsNullOrEmpty($DB_NAME)) { $DB_NAME = "postgres" }

# Convert secure string to plain text for .env file
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($DB_PASSWORD)
$DB_PASSWORD_PLAIN = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Creating .env file..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Create .env file content
$envContent = @"
# Survey Backend Environment Configuration

# Application Configuration
NODE_ENV=development
PORT=3002
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:5174

# Survey Database Configuration (Supabase)
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD_PLAIN
DB_NAME=$DB_NAME

# Supabase Configuration
SUPABASE_URL=$SUPABASE_URL
SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Security
HELMET_ENABLED=true
"@

# Write to .env file
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Please restart your backend server for the changes to take effect." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
