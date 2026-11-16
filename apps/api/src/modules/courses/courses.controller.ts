import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'List all published courses with optional filtering' })
  @ApiResponse({ status: 200, description: 'List of courses returned successfully' })
  async getCourses(@Query('category') category?: string, @Query('search') search?: string) {
    return this.coursesService.findAll({ category, search });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get full public course syllabus and details by slug' })
  @ApiResponse({ status: 200, description: 'Course details returned successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }
}
