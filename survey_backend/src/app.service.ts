import { Injectable } from '@nestjs/common';
import { getSupabaseClient, getSupabaseServiceClient } from './config/supabase.config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Survey Backend API is running!';
  }

  async getDatabaseHealth(): Promise<{ status: string; details: any }> {
    try {
      // Test Supabase connection using the client
      const supabaseClient = getSupabaseClient();
      const { data, error } = await supabaseClient
        .from('sw_store_interests')
        .select('*')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      // Get system info
      const { data: versionData } = await supabaseClient.rpc('version');
      
      const poolStatus = {
        connected: true,
        version: versionData || 'PostgreSQL (Supabase)',
        timestamp: new Date().toISOString(),
        tables: 'sw_store_interests, sw_store_interest_images',
      };
      
      return {
        status: 'healthy',
        details: poolStatus,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  async getSystemInfo(): Promise<any> {
    return {
      environment: process.env.NODE_ENV || 'development',
      supabase: {
        url: process.env.SUPABASE_URL,
        hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        connection: 'Supabase Client (Recommended)',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
