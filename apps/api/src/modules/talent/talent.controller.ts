import { Controller, Get, Patch, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TalentService, UpdateTalentProfileDto, ConsentUpdateDto } from './talent.service';

@ApiTags('Talent Profiles (Privacy-First)')
@Controller('talent')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current learner career profile' })
  async getMyProfile(@Headers('x-user-id') userIdHeader?: string) {
    const userId = userIdHeader || 'student-demo-1';
    return this.talentService.getProfile(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update learner profile fields' })
  async updateMyProfile(
    @Body() dto: UpdateTalentProfileDto,
    @Headers('x-user-id') userIdHeader?: string
  ) {
    const userId = userIdHeader || 'student-demo-1';
    return this.talentService.updateProfile(userId, dto);
  }

  @Post('me/visibility')
  @ApiOperation({ summary: 'Explicitly opt in or opt out of employer talent discovery (BR-05)' })
  @ApiResponse({ status: 200, description: 'Visibility preference updated with consent audit trail' })
  async updateConsent(
    @Body() dto: ConsentUpdateDto,
    @Headers('x-user-id') userIdHeader?: string
  ) {
    const userId = userIdHeader || 'student-demo-1';
    return this.talentService.updateVisibilityConsent(userId, dto);
  }
}

