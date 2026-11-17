import { Controller, Get, Post, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get()
  @ApiOperation({ summary: 'List all published live digital marketing courses' })
  @ApiResponse({ status: 200, description: 'List of live courses' })
  async getCourses(@Query('category') category?: string, @Query('search') search?: string) {
    return this.coursesService.findAll({ category, search });
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Retrieve verified student performance leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard list' })
  async getLeaderboard() {
    return this.coursesService.getLeaderboard();
  }

  @Get('assignments')
  @ApiOperation({ summary: 'List practical project assignments' })
  @ApiResponse({ status: 200, description: 'Assignments list' })
  async getAssignments() {
    return this.coursesService.getAssignments();
  }

  @Get('student/my-learning')
  @ApiOperation({ summary: 'Get current student enrolled courses, live class schedules, and recordings' })
  @ApiResponse({ status: 200, description: 'Student learning dashboard' })
  async getStudentLearning(@Query('userId') userId?: string) {
    return this.coursesService.getStudentLearning(userId || 'usr-student-demo-1');
  }

  @Get('student/skill-ratings')
  @ApiOperation({ summary: 'Get student verified skill ratings and task rubrics' })
  @ApiResponse({ status: 200, description: 'Skill ratings' })
  async getStudentSkillRatings(@Query('userId') userId?: string) {
    return this.coursesService.getStudentSkillRatings(userId || 'usr-student-demo-1');
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get full public course syllabus and live cohort details by slug' })
  @ApiResponse({ status: 200, description: 'Course details' })
  async getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }

  @Get(':slug/batches')
  @ApiOperation({ summary: 'List live cohort batches for a course' })
  @ApiResponse({ status: 200, description: 'Batches list' })
  async getBatches(@Param('slug') slug: string) {
    return this.coursesService.getUpcomingBatches(slug);
  }

  @Post(':slug/enroll')
  @ApiOperation({ summary: 'Enroll a student into a live cohort batch' })
  @ApiResponse({ status: 201, description: 'Enrolled successfully' })
  async enroll(
    @Param('slug') slug: string,
    @Body('batchCode') batchCode: string,
    @Body('userId') userId?: string
  ) {
    return this.coursesService.enrollInBatch(
      userId || 'usr-student-demo-1',
      slug,
      batchCode || 'DEFAULT-BATCH'
    );
  }

  @Post('assignments/:id/submit')
  @ApiOperation({ summary: 'Submit practical project assignment for evaluation' })
  @ApiResponse({ status: 201, description: 'Assignment submitted' })
  async submitAssignment(
    @Param('id') assignmentId: string,
    @Body() payload: { responseText?: string; projectUrl?: string; attachmentUrl?: string; userId?: string }
  ) {
    return this.coursesService.submitAssignment(
      payload.userId || 'usr-student-demo-1',
      assignmentId,
      payload
    );
  }

  @Post('assignments/submissions/:submissionId/evaluate')
  @ApiOperation({ summary: 'Trainer evaluation of practical project using 40/30/20/10 weighted rubric' })
  @ApiResponse({ status: 200, description: 'Submission evaluated' })
  async evaluateSubmission(
    @Param('submissionId') submissionId: string,
    @Body()
    body: {
      evaluatorName: string;
      accuracyScore: number;
      executionScore: number;
      problemSolvingScore: number;
      submissionQualityScore: number;
      feedbackNotes: string;
    }
  ) {
    return this.coursesService.evaluateSubmission(
      submissionId,
      body.evaluatorName || 'Marcus Vance (Trainer)',
      body
    );
  }
}
