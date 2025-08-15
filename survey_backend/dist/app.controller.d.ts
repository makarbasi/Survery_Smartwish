import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        service: string;
    }>;
    getDatabaseHealth(): Promise<{
        status: string;
        details: any;
    }>;
    getSystemInfo(): Promise<any>;
}
