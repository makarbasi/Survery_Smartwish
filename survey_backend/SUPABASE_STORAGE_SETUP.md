# Supabase Storage Setup for Image Uploads

## Overview
This application now uses Supabase Storage instead of local file storage for image uploads. This ensures that images are accessible from anywhere and not tied to a specific server.

## What Changed

### Before (Local Storage)
- Images were stored locally in `./uploads/store-interests/` directory
- Images were only accessible from the backend server
- Cross-machine access was problematic
- Images would be lost if the server was redeployed

### After (Supabase Storage)
- Images are uploaded directly to Supabase Storage
- Images get public URLs that work from anywhere
- No dependency on local server storage
- Images persist across deployments

## Required Environment Variables

Make sure these are set in your Render backend service:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Storage Bucket

The application automatically creates a storage bucket called `store-interest-images` with:
- Public access enabled
- Support for common image formats (JPEG, PNG, GIF, WebP)
- 10MB file size limit
- Automatic content-type detection

## How It Works

1. **Image Upload**: When a user uploads an image, it's temporarily stored in memory
2. **Supabase Upload**: The image is uploaded to Supabase Storage with a unique filename
3. **Public URL**: A public URL is generated for the image
4. **Database Storage**: The public URL is stored in the database (not the file itself)
5. **Access**: Images can be accessed from anywhere using the public URL

## Benefits

✅ **Cross-machine access**: Images work from any device/location
✅ **No server dependency**: Images persist even if backend is redeployed
✅ **Scalable**: Supabase handles storage scaling
✅ **CDN**: Images are served from Supabase's CDN
✅ **Backup**: Images are automatically backed up by Supabase

## Testing

After deployment, you should see these logs:
```
✅ Supabase connection test successful
✅ Supabase storage bucket initialized
```

When uploading images:
```
✅ Image uploaded to Supabase: filename.jpg
🔗 Public URL: https://xxx.supabase.co/storage/v1/object/public/store-interest-images/...
```

## Troubleshooting

### Bucket Creation Fails
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Verify your Supabase project has storage enabled
- Check the logs for specific error messages

### Image Upload Fails
- Verify all environment variables are set
- Check that the storage bucket exists
- Ensure the file is a valid image format
- Check file size (max 10MB)

### Images Not Displaying
- Verify the public URL is accessible
- Check that the bucket has public access enabled
- Ensure the image URL is stored correctly in the database
