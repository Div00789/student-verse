import { Controller, Get, Post, Param, Query, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecruitmentService } from './recruitment.service';

@ApiTags('Recruitment & Jobs')
@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'List public approved jobs' })
  async getJobs() {
    return this.recruitmentService.getPublicJobs();
  }

  @Get('jobs/:slug')
  @ApiOperation({ summary: 'Get job posting by slug' })
  async getJob(@Param('slug') slug: string) {
    return this.recruitmentService.getJobBySlug(slug);
  }

  @Get('candidates')
  @ApiOperation({ summary: 'Employer Talent Search (Restricted to verified employers)' })
  @ApiResponse({ status: 200, description: 'Filtered opted-in candidate pool' })
  @ApiResponse({ status: 403, description: 'Employer unverified or permission denied' })
  async searchCandidates(
    @Headers('x-employer-verified') employerVerifiedHeader: string,
    @Query('country') country?: string,
    @Query('skills') skills?: string
  ) {
    const isVerified = employerVerifiedHeader === 'true';
    const skillsList = skills ? skills.split(',').map((s) => s.trim()) : undefined;
    return this.recruitmentService.searchCandidates(isVerified, { country, skills: skillsList });
  }

  @Post('jobs/:id/apply')
  @ApiOperation({ summary: 'Submit job application' })
  async apply(
    @Param('id') jobId: string,
    @Body() body: { coverNote?: string }
  ) {
    return this.recruitmentService.submitApplication(jobId, 'user-current', body);
  }
}
