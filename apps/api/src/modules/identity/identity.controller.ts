import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdentityService, RegisterDto, LoginDto } from './identity.service';

@ApiTags('Identity & Authentication')
@Controller('auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a learner or an employer organisation' })
  @ApiResponse({ status: 201, description: 'User/organisation registered' })
  async register(@Body() dto: RegisterDto) {
    return this.identityService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return role-scoped token' })
  @ApiResponse({ status: 200, description: 'Authenticated successfully' })
  async login(@Body() dto: LoginDto) {
    return this.identityService.login(dto);
  }
}
