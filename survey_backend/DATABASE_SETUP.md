# Database Connection Setup Guide

## 🚨 Current Issue
You're getting this error:
```
Error: getaddrinfo ENOTFOUND db.lzeuerapdbrouxteluww.supabase.co
```

This means the database hostname in your configuration is incorrect or the database credentials are missing.

## 🔧 How to Fix

### Step 1: Get Your Correct Supabase Database Credentials

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in to your account

2. **Select Your Project**
   - Find and click on your project (the one with ID `lzeuerapdbrouxteluww`)

3. **Get Database Connection Details**
   - In the left sidebar, click **Settings** → **Database**
   - Look for the **"Direct Connection"** section (⚠️ **IMPORTANT**: Use Direct Connection, NOT Transaction Pooler or Session Pooler)
   - Copy the connection details:
     - **Host**: Should look like `db.[project-ref].supabase.co`
     - **Port**: Usually `5432`
     - **Database**: Usually `postgres`
     - **Username**: Usually `postgres`
     - **Password**: Your database password

4. **Get API Keys**
   - Go to **Settings** → **API**
   - Copy:
     - **Project URL**
     - **anon public** key
     - **service_role** key

### Step 2: Configure Your Environment

#### Option A: Use the Setup Script (Recommended)
```bash
# In PowerShell (recommended for Windows)
.\setup-database.ps1

# Or in Command Prompt
setup-database.bat
```

#### Option B: Manual Setup
1. Create a `.env` file in the `survey_backend` folder
2. Add your database credentials:

```env
# Survey Backend Environment Configuration

# Application Configuration
NODE_ENV=development
PORT=3002
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:5174

# Survey Database Configuration (Supabase)
DB_HOST=db.your-actual-project-ref.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-actual-database-password
DB_NAME=postgres

# Supabase Configuration
SUPABASE_URL=https://your-actual-project-ref.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Security
HELMET_ENABLED=true
```

### Step 3: Test Your Connection

**Before starting your main app, test the connection:**

```bash
# Install pg if not already installed
npm install pg

# Test the connection
node test-connection.js
```

You should see:
```
🎉 Database connection test completed successfully!
Your Supabase configuration is working correctly.
```

### Step 4: Start Your Backend Server

After successful connection test:
```bash
npm run start:dev
```

You should see:
```
✅ Database configuration loaded successfully
✅ Database connection test successful
🚀 Survey AppModule instantiated
```

## ✅ What to Look For

### Correct Database Host Format
- ✅ `db.abc123def456.supabase.co` (Direct Connection)
- ❌ `db.lzeuerapdbrouxteluww.supabase.co` (this is incorrect)

### Required Environment Variables
Make sure these are set in your `.env` file:
- `DB_HOST` - Your actual Supabase database host (from Direct Connection)
- `DB_USERNAME` - Usually `postgres`
- `DB_PASSWORD` - Your actual database password
- `DB_NAME` - Usually `postgres`

## 🧪 Test Your Connection

### Quick Test
```bash
node test-connection.js
```

### Health Check Endpoints
Once your app is running, test these endpoints:
- `GET /health` - Basic health check
- `GET /health/database` - Database connection status
- `GET /system/info` - System configuration info

## 🆘 Still Having Issues?

1. **Check your `.env` file exists** in the `survey_backend` folder
2. **Verify all credentials** are correct (no typos)
3. **Ensure you're using Direct Connection** (not Transaction/Session Pooler)
4. **Check if your Supabase project is active** and not paused
5. **Verify your IP is allowed** in Supabase database settings
6. **Run the connection test script** first: `node test-connection.js`

## 🔍 Troubleshooting Common Errors

### ENOTFOUND Error
- Verify `DB_HOST` is correct (should be `db.[project-ref].supabase.co`)
- Check your internet connection
- Ensure the hostname is from **Direct Connection** section

### Authentication Failed
- Verify `DB_PASSWORD` is correct
- Check if your database user exists
- Ensure SSL is enabled (automatic with Supabase)

### Connection Timeout
- Check if your IP is whitelisted in Supabase
- Verify your Supabase project is not paused
- Check network firewall settings

## 📞 Need Help?

- Check Supabase documentation: https://supabase.com/docs
- Verify your project status in the Supabase dashboard
- Ensure your database is not paused due to inactivity
- Run the connection test script for detailed error information
