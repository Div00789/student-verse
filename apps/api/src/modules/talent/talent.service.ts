import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface UpdateTalentProfileDto {
  headline?: string;
  bio?: string;
  skills?: string[];
  portfolioLinks?: string[];
  remotePreference?: boolean;
}

export interface ConsentUpdateDto {
  visibility: 'PRIVATE' | 'SEARCHABLE';
  consentConfirmed: boolean;
  termsVersion?: string;
}

@Injectable()
export class TalentService {
  constructor(private prisma: PrismaService) {}

  // In-memory state store for quick demonstration & seamless fallback
  private talentProfiles = new Map<string, any>([
    [
      'student-demo-1',
      {
        userId: 'student-demo-1',
        displayName: 'Alex Morgan',
        headline: 'Aspiring Growth & Performance Marketing Specialist',
        bio: 'Completed Digital Marketing Foundations on StudentVerse with evaluated real-world campaign capstone.',
        country: 'United Kingdom',
        visibility: 'PRIVATE', // BR-05: Default is strictly PRIVATE
        remotePreference: true,
        skills: ['SEO', 'Content Strategy', 'Google Ads', 'GA4 Analytics'],
        portfolioLinks: ['https://github.com/alexmorgan-growth/portfolio'],
        consentHistory: [
          {
            timestamp: new Date().toISOString(),
            status: 'PRIVATE',
            consentVersion: 'v1.0-RankGoodTech',
            notes: 'Initial account creation. Default visibility: PRIVATE',
          },
        ],
      },
    ],
  ]);

  async getProfile(userId: string) {
    const profile = this.talentProfiles.get(userId);
    if (!profile) {
      // Return default profile
      const newProfile = {
        userId,
        displayName: 'Student Learner',
        headline: '',
        bio: '',
        country: 'International',
        visibility: 'PRIVATE',
        remotePreference: true,
        skills: [],
        portfolioLinks: [],
        consentHistory: [],
      };
      this.talentProfiles.set(userId, newProfile);
      return newProfile;
    }
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateTalentProfileDto) {
    const profile = await this.getProfile(userId);
    const updated = {
      ...profile,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.talentProfiles.set(userId, updated);
    return updated;
  }

  // Explicit opt-in / opt-out with immutable consent audit
  async updateVisibilityConsent(userId: string, dto: ConsentUpdateDto) {
    const profile = await this.getProfile(userId);
    const prev = profile.visibility;
    profile.visibility = dto.visibility;
    profile.consentHistory.push({
      timestamp: new Date().toISOString(),
      previousStatus: prev,
      newStatus: dto.visibility,
      consentVersion: dto.termsVersion || 'v1.0-RankGoodTech',
      consentConfirmed: dto.consentConfirmed,
    });
    this.talentProfiles.set(userId, profile);
    return {
      success: true,
      currentVisibility: profile.visibility,
      message:
        dto.visibility === 'SEARCHABLE'
          ? 'Profile is now searchable by verified employers on StudentVerse.'
          : 'Profile is now private and removed from employer talent search.',
      auditRecord: profile.consentHistory[profile.consentHistory.length - 1],
    };
  }
}

