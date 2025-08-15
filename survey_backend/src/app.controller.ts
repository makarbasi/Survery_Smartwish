import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Survey Backend API',
    };
  }

  @Get('health/database')
  async getDatabaseHealth() {
    return await this.appService.getDatabaseHealth();
  }

  @Get('system/info')
  async getSystemInfo() {
    return await this.appService.getSystemInfo();
  }
}
