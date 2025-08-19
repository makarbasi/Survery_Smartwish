# SmartWish Survey - Manual Render.com Deployment Guide

This guide will walk you through manually deploying your SmartWish Survey application to Render.com without using Blueprint.

## Prerequisites

1. **Render.com Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Supabase Project**: You need a Supabase project with PostgreSQL database

## Step 1: Deploy Backend Service

### 1.1 Create Backend Web Service

1. **Log into Render.com**
2. **Click "New +"** and select **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

   **Basic Settings:**
   - **Name**: `smartwish-survey-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `survey_backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`

   **Plan:**
   - **Plan**: `Hobby` ($7/month)

### 1.2 Configure Backend Environment Variables

In the **Environment** tab, add these variables:

**Required Variables:**
```
DB_HOST=db.your-project-ref.supabase.co
DB_USERNAME=postgres
DB_PASSWORD=your-database-password
DB_NAME=postgres
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Optional Variables:**
```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://smartwish-survey-frontend.onrender.com
DB_PORT=5432
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
HELMET_ENABLED=true
```

### 1.3 Deploy Backend

1. **Click "Create Web Service"**
2. **Wait for the build to complete**
3. **Note the URL**: `https://smartwish-survey-backend.onrender.com`

## Step 2: Deploy Frontend Service

### 2.1 Create Frontend Static Site

1. **Click "New +"** and select **"Static Site"**
2. **Connect your GitHub repository** (same repository)
3. **Configure the service:**

   **Basic Settings:**
   - **Name**: `smartwish-survey-frontend`
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `survey_frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

   **Plan:**
   - **Plan**: `Free` (Static sites are free)

### 2.2 Configure Frontend Environment Variables

In the **Environment** tab, add these variables:

**Required Variables:**
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Already Configured:**
```
VITE_API_URL=https://smartwish-survey-backend.onrender.com
```

### 2.3 Configure Frontend Routes

In the **Settings** tab, add a **Redirect/Rewrite Rule**:

- **Source**: `/*`
- **Destination**: `/index.html`
- **Type**: `Rewrite`

### 2.4 Deploy Frontend

1. **Click "Create Static Site"**
2. **Wait for the build to complete**
3. **Note the URL**: `https://smartwish-survey-frontend.onrender.com`

## Step 3: Update CORS Configuration

After both services are deployed, you need to update the backend CORS settings:

1. **Go to your backend service** in Render dashboard
2. **Navigate to Environment tab**
3. **Update the CORS_ORIGIN variable** to include your frontend URL:
   ```
   CORS_ORIGIN=https://smartwish-survey-frontend.onrender.com
   ```
4. **Redeploy the backend service**

## Step 4: Database Setup

Ensure your Supabase database has the required tables:

1. **Go to your Supabase dashboard**
2. **Navigate to SQL Editor**
3. **Run the database setup scripts** from `survey_backend/migrations/`

## Step 5: Verify Deployment

### Check Backend Service
- **URL**: `https://smartwish-survey-backend.onrender.com`
- **Health Check**: `https://smartwish-survey-backend.onrender.com/health`
- **API Test**: `https://smartwish-survey-backend.onrender.com/`

### Check Frontend Service
- **URL**: `https://smartwish-survey-frontend.onrender.com`
- **Should display** your React application

## Step 6: Test the Application

1. **Visit your frontend URL**
2. **Test the store interest form**
3. **Check if images upload correctly**
4. **Verify admin dashboard functionality**

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check if database is accessible from Render's servers
   - Ensure CORS is properly configured

3. **Frontend API Connection Issues**
   - Verify `VITE_API_URL` points to the correct backend URL
   - Check CORS configuration in backend
   - Ensure backend is running and accessible

4. **Environment Variable Issues**
   - Double-check all required environment variables are set
   - Ensure no typos in variable names
   - Verify Supabase keys are correct

### Logs and Monitoring

- **View logs** in the Render dashboard for each service
- **Monitor performance** using Render's built-in metrics
- **Set up alerts** for service downtime

## Post-Deployment

### Custom Domain (Optional)

1. **Add custom domain** in Render dashboard
2. **Configure DNS** to point to Render
3. **Update CORS settings** if using custom domain

### SSL Certificate

- **Automatic**: Render provides free SSL certificates
- **Custom**: You can upload your own SSL certificate

### Scaling

- **Hobby plan**: $7/month, good for development/testing
- **Standard plan**: $25/month, suitable for production workloads
- **Pro plan**: $50/month, high-performance applications
- **Auto-scaling**: Available on paid plans

## Cost Breakdown

- **Backend (Web Service)**: $7/month (Hobby plan)
- **Frontend (Static Site)**: $0/month (Free)
- **Total**: $7/month

## Support

If you encounter issues:

1. **Check Render documentation**: [docs.render.com](https://docs.render.com)
2. **Review application logs** in Render dashboard
3. **Verify environment variables** are correctly set
4. **Test locally** to ensure code works before deployment

## Security Notes

- **Never commit sensitive data** like API keys to your repository
- **Use environment variables** for all sensitive configuration
- **Regularly rotate** Supabase keys and database passwords
- **Monitor access logs** for suspicious activity

---

**Your SmartWish Survey application should now be live on Render.com!**

## Quick Reference URLs

- **Backend API**: `https://smartwish-survey-backend.onrender.com`
- **Frontend App**: `https://smartwish-survey-frontend.onrender.com`
- **Health Check**: `https://smartwish-survey-backend.onrender.com/health`
