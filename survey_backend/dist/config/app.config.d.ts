declare const _default: (() => {
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    port: number;
    nodeEnv: string;
    cors: {
        origin: string[];
    };
    supabase: {
        url: string;
        anonKey: string;
        serviceRoleKey: string;
    };
    security: {
        helmetEnabled: boolean;
        rateLimit: {
            windowMs: number;
            max: number;
        };
    };
    upload: {
        maxFileSize: number;
        uploadPath: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    port: number;
    nodeEnv: string;
    cors: {
        origin: string[];
    };
    supabase: {
        url: string;
        anonKey: string;
        serviceRoleKey: string;
    };
    security: {
        helmetEnabled: boolean;
        rateLimit: {
            windowMs: number;
            max: number;
        };
    };
    upload: {
        maxFileSize: number;
        uploadPath: string;
    };
}>;
export default _default;
