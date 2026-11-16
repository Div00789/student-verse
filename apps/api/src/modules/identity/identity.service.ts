import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface RegisterDto {
  email: string;
  fullName: string;
  role: 'LEARNER' | 'EMPLOYER_OWNER';
  companyName?: string;
  companyWebsite?: string;
  country?: string;
}

export interface LoginDto {
  email: string;
  password?: string;
}

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    if (!dto.email) {
      throw new BadRequestException('Email is required');
    }

    const isEmployer = dto.role === 'EMPLOYER_OWNER';

    return {
      success: true,
      user: {
        id: `usr-${Date.now()}`,
        email: dto.email,
        fullName: dto.fullName,
        role: dto.role,
        country: dto.country || 'Global',
      },
      employerVerificationRequired: isEmployer,
      message: isEmployer
        ? 'Company account registered. Business verification submitted for manual review.'
        : 'Learner account registered successfully. Welcome to StudentVerse!',
    };
  }

  async login(dto: LoginDto) {
    if (!dto.email) {
      throw new BadRequestException('Email is required');
    }

    // Demo role mapping for preview
    const isEmployer = dto.email.includes('employer');
    const isAdmin = dto.email.includes('admin');

    let roles = ['LEARNER'];
    if (isEmployer) roles = ['EMPLOYER_OWNER'];
    if (isAdmin) roles = ['PLATFORM_ADMIN', 'SUPER_ADMIN'];

    return {
      accessToken: `sv-jwt-token-mock-${Date.now()}`,
      user: {
        id: 'usr-authenticated',
        email: dto.email,
        roles,
        legalNotice: 'StudentVerse [RankGood Tech] - Career Assistance Platform',
      },
    };
  }
}

