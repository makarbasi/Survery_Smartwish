"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("./config/supabase.config");
let AppService = class AppService {
    getHello() {
        return 'Survey Backend API is running!';
    }
    async getDatabaseHealth() {
        try {
            const supabaseClient = (0, supabase_config_1.getSupabaseClient)();
            const { data, error } = await supabaseClient
                .from('sw_store_interests')
                .select('*')
                .limit(1);
            if (error) {
                throw error;
            }
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
        }
        catch (error) {
            return {
                status: 'unhealthy',
                details: {
                    error: error.message,
                    timestamp: new Date().toISOString(),
                },
            };
        }
    }
    async getSystemInfo() {
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
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map