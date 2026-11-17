import { Controller, Post, Get, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StorageService } from './storage.service';

@ApiTags('Storage & Documents')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('buckets')
  @ApiOperation({ summary: 'List configured Supabase storage buckets' })
  async getBuckets() {
    return {
      buckets: [
        {
          name: this.storageService.BUCKET_EMPLOYEE,
          purpose: 'Student and Employee resumes, portfolios, and assignment submissions',
          isPrivate: true,
        },
        {
          name: this.storageService.BUCKET_EMPLOYER,
          purpose: 'Employer business verification, trade licenses, and job descriptions',
          isPrivate: true,
        },
      ],
    };
  }

  @Get('signed-url')
  @ApiOperation({ summary: 'Generate a secure signed URL for accessing private bucket documents' })
  async getSignedUrl(@Query('bucket') bucket: string, @Query('path') path: string) {
    return this.storageService.getSignedUrl(bucket, path);
  }
}
