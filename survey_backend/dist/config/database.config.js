"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const store_interest_entity_1 = require("../store-interests/store-interest.entity");
const store_interest_image_entity_1 = require("../store-interests/store-interest-image.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [store_interest_entity_1.StoreInterest, store_interest_image_entity_1.StoreInterestImage],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    logger: 'advanced-console',
    extra: {
        max: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
        min: 2,
        acquire: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '60000'),
        idle: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
        query_timeout: parseInt(process.env.DB_QUERY_TIMEOUT || '30000'),
        validate: (connection) => {
            return connection.query('SELECT 1').then(() => true).catch(() => false);
        },
    },
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CA,
        cert: process.env.DB_SSL_CERT,
        key: process.env.DB_SSL_KEY,
    },
    migrations: ['dist/migrations/*.js'],
    migrationsRun: false,
    maxQueryExecutionTime: 1000,
    retryAttempts: 5,
    retryDelay: 3000,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT || '30000'),
};
//# sourceMappingURL=database.config.js.map