import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CredentialsService } from './credentials.service';

@ApiTags('Credentials & Verifications')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get('verify/:code')
  @ApiOperation({ summary: 'Publicly verify a StudentVerse certificate by credential code' })
  @ApiResponse({ status: 200, description: 'Credential verified successfully' })
  @ApiResponse({ status: 404, description: 'Credential code unknown or revoked' })
  async verifyCredential(@Param('code') code: string) {
    return this.credentialsService.verify(code);
  }
}
