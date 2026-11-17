import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IdentityService, RegisterDto, LoginDto } from './identity.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Identity & Authentication')
@Controller('auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a student or an employer organisation' })
  @ApiResponse({ status: 201, description: 'User/organisation registered' })
  async register(@Body() dto: RegisterDto) {
    return this.identityService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return verified JWT token' })
  @ApiResponse({ status: 200, description: 'Authenticated successfully' })
  async login(@Body() dto: LoginDto) {
    return this.identityService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve currently authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Profile returned' })
  async getMe(@Req() req: any) {
    return this.identityService.getProfile(req.user.id);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset instructions' })
  @ApiResponse({ status: 200, description: 'Reset instructions dispatched' })
  async forgotPassword(@Body('email') email: string) {
    return this.identityService.forgotPassword(email);
  }
}
