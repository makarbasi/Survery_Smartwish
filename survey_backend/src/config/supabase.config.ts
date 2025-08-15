import { createClient } from '@supabase/supabase-js';

export const supabaseConfig = {
  url: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY,
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

// Lazy initialization to avoid environment variable loading issues
let _supabaseClient: any = null;
let _supabaseServiceClient: any = null;

export function getSupabaseClient() {
  if (!_supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY;
    
    if (!url || !anonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are required');
    }
    
    _supabaseClient = createClient(url, anonKey);
  }
  return _supabaseClient;
}

export function getSupabaseServiceClient() {
  if (!_supabaseServiceClient) {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!url || !serviceKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
    }
    
    _supabaseServiceClient = createClient(url, serviceKey);
  }
  return _supabaseServiceClient;
}

// Legacy exports for backward compatibility (but these will be undefined until getters are called)
export const supabaseClient = undefined;
export const supabaseServiceClient = undefined;
