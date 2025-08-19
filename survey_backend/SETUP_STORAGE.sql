-- =====================================================
-- Supabase Storage Setup for SmartWish Survey App
-- =====================================================
-- Run these commands in your Supabase SQL Editor
-- Make sure Storage is enabled in your Supabase project

-- 1. Create the storage bucket for store interest images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'store-interest-images',
  'store-interest-images',
  true, -- Make bucket public so images are accessible
  10485760, -- 10MB file size limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
);

-- 2. Create storage policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'store-interest-images' 
  AND auth.role() = 'authenticated'
);

-- 3. Create storage policy to allow public read access to images
CREATE POLICY "Allow public read access to images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'store-interest-images'
);

-- 4. Create storage policy to allow authenticated users to delete their own images
CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'store-interest-images' 
  AND auth.role() = 'authenticated'
);

-- 5. Create storage policy to allow authenticated users to update image metadata
CREATE POLICY "Allow authenticated users to update images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'store-interest-images' 
  AND auth.role() = 'authenticated'
);

-- 6. Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'store-interest-images';

-- 7. Verify the policies were created (check RLS policies on storage.objects)
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- =====================================================
-- Alternative: If you want to use service role instead of auth
-- =====================================================
-- Uncomment these if you prefer service role access:

/*
-- Allow service role full access (more permissive)
CREATE POLICY "Service role full access" ON storage.objects
FOR ALL USING (
  bucket_id = 'store-interest-images'
) WITH CHECK (
  bucket_id = 'store-interest-images'
);
*/

-- =====================================================
-- Troubleshooting Commands
-- =====================================================

-- Check if storage extension is enabled
SELECT * FROM pg_extension WHERE extname = 'storage';

-- Check existing buckets
SELECT * FROM storage.buckets;

-- Check existing policies (RLS policies on storage.objects)
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Remove bucket if you need to recreate it
-- DELETE FROM storage.buckets WHERE id = 'store-interest-images';

-- Remove policies if you need to recreate them
-- DROP POLICY "Allow authenticated users to upload images" ON storage.objects;
-- DROP POLICY "Allow public read access to images" ON storage.objects;
-- DROP POLICY "Allow authenticated users to delete images" ON storage.objects;
-- DROP POLICY "Allow authenticated users to update images" ON storage.objects;
