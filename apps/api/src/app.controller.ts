import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

@ApiTags('System Health & Operations')
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  @ApiOperation({ summary: 'Basic backend availability health check' })
  @ApiResponse({ status: 200, description: 'Service is operational' })
  getHealth() {
    return {
      status: 'ok',
      service: 'studentverse-api',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Backend readiness and database dependency check' })
  @ApiResponse({ status: 200, description: 'Database and services connected' })
  async getReady() {
    try {
      const userCount = await this.prisma.user.count();
      return {
        status: 'ready',
        database: 'connected',
        userCount,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        status: 'degraded',
        database: 'disconnected',
        error: err.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
