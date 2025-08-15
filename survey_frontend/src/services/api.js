// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lzeuerapdbrouxteluww.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZXVlcmFwZGJyb3V4dGVsdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ1ODksImV4cCI6MjA3MDg1MDU4OX0.XSK3lQG30zEtIsP1hB9-akrTH0u9tC8eITzaWjSlKiU';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`API Call: ${config.method || 'GET'} ${url}`);
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`API Response:`, data);
    return data;
  } catch (error) {
    console.error(`API Error for ${url}:`, error);
    throw error;
  }
};

// Store Interest API functions
export const submitStoreInterest = async (formData) => {
  return apiCall('/store-interests', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const getStoreInterests = async () => {
  return apiCall('/store-interests/with-images');
};

export const getStoreInterest = async (id) => {
  return apiCall(`/store-interests/${id}`);
};

export const getStoreInterestImages = async (id) => {
  return apiCall(`/store-interests/${id}/images`);
};

export const getStats = async () => {
  return apiCall('/store-interests/stats');
};

export const uploadImages = async (interestId, files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }

  const url = `${API_BASE_URL}/store-interests/${interestId}/images`;
  
  try {
    console.log(`Uploading ${files.length} images to ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Upload Response:`, data);
    return data;
  } catch (error) {
    console.error(`Upload Error:`, error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
};

// Supabase configuration export
export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
};

export default {
  submitStoreInterest,
  getStoreInterests,
  getStoreInterest,
  getStoreInterestImages,
  getStats,
  uploadImages,
  healthCheck,
  supabaseConfig,
};
