import { Controller, Get, Post, Patch, Param, Query, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecruitmentService, HiringRequestPayload, HiringRequestRecord } from './recruitment.service';

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
  @ApiOperation({ summary: 'Employer Talent Search (Restricted strictly to verified employers)' })
  @ApiResponse({ status: 200, description: 'Filtered opted-in candidate pool' })
  @ApiResponse({ status: 403, description: 'Employer unverified or permission denied' })
  async searchCandidates(
    @Headers('x-employer-verified') employerVerifiedHeader: string,
    @Query('country') country?: string,
    @Query('skills') skills?: string,
    @Query('minScore') minScore?: string
  ) {
    const isVerified = employerVerifiedHeader === 'true';
    const skillsList = skills ? skills.split(',').map((s) => s.trim()) : undefined;
    const minScoreNum = minScore ? parseInt(minScore, 10) : undefined;
    return this.recruitmentService.searchCandidates(isVerified, {
      country,
      skills: skillsList,
      minScore: minScoreNum
    });
  }

  @Post('hire-requests')
  @ApiOperation({ summary: 'Employer submits a Request to Hire for an assessed candidate' })
  @ApiResponse({ status: 201, description: 'Hiring enquiry submitted to StudentVerse admin' })
  async submitHireRequest(@Body() payload: HiringRequestPayload) {
    return this.recruitmentService.submitHiringRequest(payload);
  }

  @Get('hire-requests')
  @ApiOperation({ summary: 'Get hiring enquiries (filtered by company or admin oversight)' })
  @ApiResponse({ status: 200, description: 'Hiring enquiries list' })
  async getHireRequests(@Query('company') company?: string) {
    return this.recruitmentService.getHiringRequests(company);
  }

  @Patch('hire-requests/:id/status')
  @ApiOperation({ summary: 'Platform admin updates status and internal notes for a hiring enquiry' })
  @ApiResponse({ status: 200, description: 'Hiring request updated' })
  async updateHireStatus(
    @Param('id') id: string,
    @Body('status') status: HiringRequestRecord['status'],
    @Body('internalNotes') internalNotes?: string
  ) {
    return this.recruitmentService.updateHiringRequestStatus(id, status, internalNotes);
  }

  @Get('placement-partners')
  @ApiOperation({ summary: 'List approved placement and hiring partners' })
  @ApiResponse({ status: 200, description: 'Verified placement partners list' })
  async getPlacementPartners() {
    return this.recruitmentService.getPlacementPartners();
  }

  @Post('jobs/:id/apply')
  @ApiOperation({ summary: 'Submit job application' })
  async apply(@Param('id') jobId: string, @Body() body: { coverNote?: string }) {
    return this.recruitmentService.submitApplication(jobId, 'user-current', body);
  }
}
