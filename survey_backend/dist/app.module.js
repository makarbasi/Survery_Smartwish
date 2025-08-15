"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const store_interests_module_1 = require("./store-interests/store-interests.module");
const app_config_1 = require("./config/app.config");
const supabase_config_1 = require("./config/supabase.config");
let AppModule = class AppModule {
    constructor() {
        console.log('🚀 Survey AppModule instantiated');
        this.validateEnvironmentVariables();
        this.logConfiguration();
    }
    async onModuleInit() {
        try {
            await this.testSupabaseConnection();
            console.log('✅ Supabase connection test successful');
        }
        catch (error) {
            console.error('❌ Supabase connection test failed:', error.message);
            console.error('Please check your Supabase URL and API keys');
            process.exit(1);
        }
    }
    validateEnvironmentVariables() {
        const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        if (missingVars.length > 0) {
            console.error('❌ Missing required environment variables:', missingVars.join(', '));
            console.error('Please check your .env file and ensure all Supabase credentials are set.');
            console.error('Run setup-database.ps1 or setup-database.bat to configure your connection.');
            process.exit(1);
        }
        const supabaseUrl = process.env.SUPABASE_URL;
        if (supabaseUrl && !supabaseUrl.includes('.supabase.co')) {
            console.warn('⚠️  Warning: SUPABASE_URL does not appear to be a valid Supabase URL');
            console.warn('Expected format: https://[project-ref].supabase.co');
        }
        console.log('✅ Environment variables validation passed');
    }
    logConfiguration() {
        console.log('📊 Configuration:');
        console.log(`   Supabase URL: ${process.env.SUPABASE_URL}`);
        console.log(`   Has Anon Key: ${!!process.env.SUPABASE_ANON_KEY}`);
        console.log(`   Has Service Key: ${!!process.env.SUPABASE_SERVICE_ROLE_KEY}`);
        console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log('   Database: Using Supabase Client (no direct connection)');
    }
    async testSupabaseConnection() {
        try {
            console.log('🔌 Testing Supabase connection...');
            const supabaseClient = (0, supabase_config_1.getSupabaseClient)();
            const { data, error } = await supabaseClient
                .from('sw_store_interests')
                .select('*')
                .limit(1);
            if (error) {
                if (error.code === 'PGRST116') {
                    console.log('📋 Table sw_store_interests does not exist yet - will be created by migrations');
                    console.log('✅ This is normal for new projects - connection is working!');
                    return;
                }
                throw error;
            }
            console.log('📋 Found existing sw_store_interests table');
        }
        catch (error) {
            throw new Error(`Supabase connection test failed: ${error.message}`);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env.production', '.env', '.env.example'],
                load: [app_config_1.default],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../uploads'),
                serveRoot: '/uploads',
            }),
            store_interests_module_1.StoreInterestsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map