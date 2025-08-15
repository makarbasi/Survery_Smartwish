import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StoreInterest } from '../store-interests/store-interest.entity';
import { StoreInterestImage } from '../store-interests/store-interest-image.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Entities - only store interests
  entities: [StoreInterest, StoreInterestImage],

  // Auto-sync schema in development (disable in production)
  synchronize: false, // Use migrations instead

  // Logging
  logging: process.env.NODE_ENV === 'development',
  logger: 'advanced-console',

  // Connection pooling for Supabase Direct Connection
  extra: {
    // Connection pool settings
    max: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
    min: 2,
    acquire: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '60000'),
    idle: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
    
    // Query timeout
    query_timeout: parseInt(process.env.DB_QUERY_TIMEOUT || '30000'),
    
    // Connection validation
    validate: (connection: any) => {
      return connection.query('SELECT 1').then(() => true).catch(() => false);
    },
  },

  // SSL configuration for Supabase (required for Direct Connection)
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.DB_SSL_CA,
    cert: process.env.DB_SSL_CERT,
    key: process.env.DB_SSL_KEY,
  },

  // Migration settings
  migrations: ['dist/migrations/*.js'],
  migrationsRun: false,

  // Performance optimization
  maxQueryExecutionTime: 1000,

  // Connection retry and resilience
  retryAttempts: 5,
  retryDelay: 3000,
  keepConnectionAlive: true,
  
  // Auto-reconnect and entity loading
  autoLoadEntities: true,
  
  // Connection timeout
  connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT || '30000'),
};
