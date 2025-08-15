#!/usr/bin/env node

/**
 * Simple database connection test script
 * Run this to verify your Supabase connection works before starting the full app
 * 
 * Usage: node test-connection.js
 */

require('dotenv').config();
const { Client } = require('pg');

async function testConnection() {
  console.log('🔍 Testing Supabase Database Connection...\n');
  
  // Check environment variables
  const requiredVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('Please check your .env file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT || '5432'}`);
  console.log(`   User: ${process.env.DB_USERNAME}`);
  console.log(`   Database: ${process.env.DB_NAME}\n`);
  
  // Create client
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
    query_timeout: 10000,
  });
  
  try {
    console.log('🔌 Attempting to connect...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    // Test query
    console.log('📡 Testing query...');
    const result = await client.query('SELECT version()');
    console.log('✅ Query successful!');
    console.log(`   Database version: ${result.rows[0]?.version || 'Unknown'}`);
    
    // Test if tables exist
    console.log('📋 Checking for existing tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('store_interest', 'store_interest_image')
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('✅ Found existing tables:', tablesResult.rows.map(r => r.table_name).join(', '));
    } else {
      console.log('📝 No existing tables found - migrations will create them');
    }
    
    console.log('\n🎉 Database connection test completed successfully!');
    console.log('Your Supabase configuration is working correctly.');
    console.log('You can now start your NestJS application with: npm run start:dev');
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.error('\n🔧 Troubleshooting tips:');
    console.error('1. Verify your database credentials in .env file');
    console.error('2. Check if your Supabase project is active');
    console.error('3. Ensure your IP is allowed in Supabase settings');
    console.error('4. Verify the database host is correct (Direct Connection)');
    console.error('5. Check if your database password is correct');
    
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 The hostname could not be resolved. Check:');
      console.error('   - DB_HOST is correct (should be db.[project-ref].supabase.co)');
      console.error('   - Your internet connection is working');
    }
    
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the test
testConnection().catch(console.error);
