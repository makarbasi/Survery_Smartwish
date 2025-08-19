# SmartWish Survey - Render.com Deployment Guide

This guide will walk you through deploying your SmartWish Survey application to Render.com.

## Prerequisites

1. **Render.com Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Supabase Project**: You need a Supabase project with PostgreSQL database

## Step 1: Prepare Your Repository

Your repository is already configured with the necessary files:
- `render.yaml` - Main deployment configuration
- `survey_backend/render.yaml` - Backend-specific configuration
- `survey_frontend/render.yaml` - Frontend-specific configuration

## Step 2: Connect Repository to Render

1. **Log into Render.com**
2. **Click "New +"** and select **"Blueprint"**
3. **Connect your GitHub repository**
4. **Select the repository** containing your SmartWish Survey code
5. **Render will automatically detect** the `render.yaml` file

## Step 3: Configure Environment Variables

### Backend Environment Variables

In the Render dashboard, configure these environment variables for the backend service:

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

**Optional Variables (already set in render.yaml):**
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

### Frontend Environment Variables

Configure these for the frontend service:

**Required Variables:**
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Already Configured:**
```
VITE_API_URL=https://smartwish-survey-backend.onrender.com
```

## Step 4: Deploy

1. **Click "Create Blueprint Instance"**
2. **Render will automatically:**
   - Build both services
   - Deploy the backend API
   - Deploy the frontend static site
   - Set up the necessary networking

## Step 5: Verify Deployment

### Check Backend Service
- URL: `https://smartwish-survey-backend.onrender.com`
- Test endpoint: `https://smartwish-survey-backend.onrender.com/health` (if available)

### Check Frontend Service
- URL: `https://smartwish-survey-frontend.onrender.com`
- Should display your React application

## Step 6: Database Setup

Ensure your Supabase database has the required tables:

1. **Go to your Supabase dashboard**
2. **Navigate to SQL Editor**
3. **Run the database setup scripts** from `survey_backend/migrations/`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Render dashboard
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

- **Starter plan**: $7/month, good for development/testing
- **Standard plan**: $25/month, suitable for production workloads
- **Pro plan**: $50/month, high-performance applications
- **Auto-scaling**: Available on paid plans

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

## Cost Optimization

- **Starter plan**: $7/month per web service (includes 750 hours)
- **Static sites**: $0/month (unlimited)
- **Database**: Consider using Supabase free tier or Render's PostgreSQL
- **Monitoring**: Use Render's built-in monitoring tools
- **Free tier**: No longer available for web services

---

**Your SmartWish Survey application should now be live on Render.com!**
