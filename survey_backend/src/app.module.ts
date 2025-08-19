import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreInterestsModule } from './store-interests/store-interests.module';
import appConfig from './config/app.config';
import { getSupabaseClient } from './config/supabase.config';
import { SupabaseStorageService } from './services/supabase-storage.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.production', '.env', '.env.example'],
      load: [appConfig],
    }),

    // Feature modules
    StoreInterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseStorageService],
})
export class AppModule implements OnModuleInit {
  constructor() {
    console.log('🚀 Survey AppModule instantiated');
    
    // Validate required environment variables
    this.validateEnvironmentVariables();
    
    // Log configuration
    this.logConfiguration();
  }

  async onModuleInit() {
    try {
      // Test Supabase connection
      await this.testSupabaseConnection();
      console.log('✅ Supabase connection test successful');
      
      // Initialize storage bucket
      const storageService = new SupabaseStorageService();
      await storageService.createBucketIfNotExists();
      console.log('✅ Supabase storage bucket initialized');
    } catch (error) {
      console.error('❌ Supabase connection test failed:', error.message);
      console.error('Please check your Supabase URL and API keys');
      process.exit(1);
    }
  }

  private validateEnvironmentVariables() {
    const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing required environment variables:', missingVars.join(', '));
      console.error('Please check your .env file and ensure all Supabase credentials are set.');
      console.error('Run setup-database.ps1 or setup-database.bat to configure your connection.');
      process.exit(1);
    }

    // Validate SUPABASE_URL format
    const supabaseUrl = process.env.SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('.supabase.co')) {
      console.warn('⚠️  Warning: SUPABASE_URL does not appear to be a valid Supabase URL');
      console.warn('Expected format: https://[project-ref].supabase.co');
    }
    
    console.log('✅ Environment variables validation passed');
  }

  private logConfiguration() {
    console.log('📊 Configuration:');
    console.log(`   Supabase URL: ${process.env.SUPABASE_URL}`);
    console.log(`   Has Anon Key: ${!!process.env.SUPABASE_ANON_KEY}`);
    console.log(`   Has Service Key: ${!!process.env.SUPABASE_SERVICE_ROLE_KEY}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('   Database: Using Supabase Client (no direct connection)');
  }

  private async testSupabaseConnection() {
    try {
      console.log('🔌 Testing Supabase connection...');
      
      // Test basic Supabase connection
      const supabaseClient = getSupabaseClient();
      const { data, error } = await supabaseClient
        .from('sw_store_interests')
        .select('*')
        .limit(1);
      
      if (error) {
        // If table doesn't exist yet, that's okay - just test the connection
        if (error.code === 'PGRST116') {
          console.log('📋 Table sw_store_interests does not exist yet - will be created by migrations');
          console.log('✅ This is normal for new projects - connection is working!');
          return;
        }
        throw error;
      }
      
      console.log('📋 Found existing sw_store_interests table');
    } catch (error) {
      throw new Error(`Supabase connection test failed: ${error.message}`);
    }
  }
}
