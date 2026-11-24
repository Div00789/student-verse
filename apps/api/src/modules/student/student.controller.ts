import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Student Portal & Learning Progression')
@Controller('student')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Retrieve authenticated student dashboard data, enrolments, live class schedule & skill ratings' })
  @ApiResponse({ status: 200, description: 'Student dashboard object' })
  async getDashboard(@Req() req: any) {
    return this.studentService.getDashboard(req.user.id);
  }

  @Get('enrollments')
  @ApiOperation({ summary: 'List genuine enrolled courses for authenticated student' })
  @ApiResponse({ status: 200, description: 'Enrolled courses' })
  async getEnrollments(@Req() req: any) {
    return this.studentService.getEnrollments(req.user.id);
  }

  @Get('purchases')
  @ApiOperation({ summary: 'Retrieve course purchase and payment history for authenticated student' })
  @ApiResponse({ status: 200, description: 'List of student purchases and payment history' })
  async getPurchases(@Req() req: any) {
    return this.studentService.getPurchases(req.user.id);
  }

  @Post('enroll')
  @ApiOperation({ summary: 'Enrol authenticated student in a published course' })
  @ApiResponse({ status: 201, description: 'Course enrolment created' })
  async enroll(
    @Req() req: any,
    @Body('courseSlug') courseSlug: string,
    @Body('batchCode') batchCode?: string
  ) {
    return this.studentService.enrollInCourse(req.user.id, courseSlug, batchCode);
  }

  @Get('classes')
  @ApiOperation({ summary: 'Retrieve scheduled live classes for student enrolled batches' })
  @ApiResponse({ status: 200, description: 'Live class schedule' })
  async getClasses(@Req() req: any) {
    return this.studentService.getClasses(req.user.id);
  }

  @Get('assignments')
  @ApiOperation({ summary: 'Retrieve practical assignments and student submission evaluations' })
  @ApiResponse({ status: 200, description: 'Assignments list' })
  async getAssignments(@Req() req: any) {
    return this.studentService.getAssignments(req.user.id);
  }

  @Post('talent-pool')
  @ApiOperation({ summary: 'Update employer discovery talent pool consent preference' })
  @ApiResponse({ status: 200, description: 'Consent preference recorded' })
  async updateTalentPool(
    @Req() req: any,
    @Body('optIn') optIn: boolean
  ) {
    return this.studentService.updateTalentPool(req.user.id, optIn);
  }

  @Get('courses/:courseSlug/progress')
  @ApiOperation({ summary: 'Retrieve verified course progress, total lessons, and completed lesson IDs' })
  @ApiResponse({ status: 200, description: 'Course learning progress object' })
  async getCourseProgress(
    @Req() req: any,
    @Param('courseSlug') courseSlug: string
  ) {
    return this.studentService.getCourseProgress(req.user.id, courseSlug);
  }

  @Post('courses/:courseSlug/lessons/:lessonId/progress')
  @ApiOperation({ summary: 'Update individual lesson completion or playback position' })
  @ApiResponse({ status: 200, description: 'Lesson progress updated' })
  async updateLessonProgress(
    @Req() req: any,
    @Param('courseSlug') courseSlug: string,
    @Param('lessonId') lessonId: string,
    @Body() body: {
      status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
      isCompleted?: boolean;
      watchedSeconds?: number;
      watchedPct?: number;
      lastPositionSeconds?: number;
      completionMethod?: string;
    }
  ) {
    return this.studentService.updateLessonProgress(req.user.id, courseSlug, lessonId, body);
  }
}
