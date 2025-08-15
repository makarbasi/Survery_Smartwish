import { OnModuleInit } from '@nestjs/common';
export declare class AppModule implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
    private validateEnvironmentVariables;
    private logConfiguration;
    private testSupabaseConnection;
}
