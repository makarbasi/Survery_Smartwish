export declare class AppService {
    getHello(): string;
    getDatabaseHealth(): Promise<{
        status: string;
        details: any;
    }>;
    getSystemInfo(): Promise<any>;
}
