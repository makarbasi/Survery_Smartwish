-- Migration for Survey Database: Store Interest Tables
-- Apply this to: https://lzeuerapdbrouxteluww.supabase.co

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Service role can perform all operations on store interests" ON sw_store_interests;
DROP POLICY IF EXISTS "Service role can perform all operations on store images" ON sw_store_interest_images;

-- Create tables for store interest submissions and images
CREATE TABLE IF NOT EXISTS sw_store_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_name VARCHAR(255) NOT NULL,
    store_address VARCHAR(500) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    letter_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sw_store_interest_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_interest_id UUID NOT NULL REFERENCES sw_store_interests(id) ON DELETE CASCADE,
    image_url VARCHAR(1024) NOT NULL,
    original_name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_sw_store_interests_created_at ON sw_store_interests(created_at);
CREATE INDEX IF NOT EXISTS idx_sw_store_interest_images_interest_id ON sw_store_interest_images(store_interest_id);

-- Comments for documentation
COMMENT ON TABLE sw_store_interests IS 'Store partnership interest submissions';
COMMENT ON TABLE sw_store_interest_images IS 'Images uploaded for store partnerships';

-- Enable Row Level Security (optional - can be configured later)
ALTER TABLE sw_store_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sw_store_interest_images ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (allows backend to read/write)
CREATE POLICY "Service role can perform all operations on store interests" ON sw_store_interests
    FOR ALL USING (true);

CREATE POLICY "Service role can perform all operations on store images" ON sw_store_interest_images
    FOR ALL USING (true);
