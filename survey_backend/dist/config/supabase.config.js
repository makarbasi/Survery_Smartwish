"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseServiceClient = exports.supabaseClient = exports.supabaseConfig = void 0;
exports.getSupabaseClient = getSupabaseClient;
exports.getSupabaseServiceClient = getSupabaseServiceClient;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabaseConfig = {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
let _supabaseClient = null;
let _supabaseServiceClient = null;
function getSupabaseClient() {
    if (!_supabaseClient) {
        const url = process.env.SUPABASE_URL;
        const anonKey = process.env.SUPABASE_ANON_KEY;
        if (!url || !anonKey) {
            throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are required');
        }
        _supabaseClient = (0, supabase_js_1.createClient)(url, anonKey);
    }
    return _supabaseClient;
}
function getSupabaseServiceClient() {
    if (!_supabaseServiceClient) {
        const url = process.env.SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !serviceKey) {
            throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
        }
        _supabaseServiceClient = (0, supabase_js_1.createClient)(url, serviceKey);
    }
    return _supabaseServiceClient;
}
exports.supabaseClient = undefined;
exports.supabaseServiceClient = undefined;
//# sourceMappingURL=supabase.config.js.map