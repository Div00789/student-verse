import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface VerifiedCredential {
  publicCode: string;
  recipientName: string;
  courseTitle: string;
  issuer: string;
  status: 'ISSUED' | 'REVOKED';
  issuedAt: string;
  revokedAt?: string;
  revokedReason?: string;
  competencies: string[];
}

const SAMPLE_CREDENTIALS: Record<string, VerifiedCredential> = {
  'SV-2026-DM-849201': {
    publicCode: 'SV-2026-DM-849201',
    recipientName: 'Elena Rostova',
    courseTitle: 'Digital Marketing Foundations',
    issuer: 'StudentVerse [RankGood Tech]',
    status: 'ISSUED',
    issuedAt: '2026-11-05T12:00:00Z',
    competencies: [
      'Omnichannel Acquisition Strategy',
      'Technical SEO & Site Audit Analysis',
      'Paid Campaign Optimization (Google & Meta)',
      'GA4 Multi-Touch Attribution'
    ]
  },
  'SV-2026-AI-772910': {
    publicCode: 'SV-2026-AI-772910',
    recipientName: 'Marcus Chen',
    courseTitle: 'AI Workflow Automation with n8n & Make',
    issuer: 'StudentVerse [RankGood Tech]',
    status: 'ISSUED',
    issuedAt: '2026-11-10T16:20:00Z',
    competencies: [
      'Automated Webhook Architecture',
      'LLM Pipeline Orchestration',
      'Self-Healing Error Handler Design',
      'Enterprise API Integration'
    ]
  },
  'SV-2026-REV-000000': {
    publicCode: 'SV-2026-REV-000000',
    recipientName: 'Test Recipient (Revoked Sample)',
    courseTitle: 'HubSpot CRM & Marketing Automation',
    issuer: 'StudentVerse [RankGood Tech]',
    status: 'REVOKED',
    issuedAt: '2026-09-01T08:00:00Z',
    revokedAt: '2026-09-15T11:00:00Z',
    revokedReason: 'Coursework submission flagged for non-original capstone project.',
    competencies: ['CRM Architecture']
  }
};

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async verify(publicCode: string): Promise<VerifiedCredential> {
    const cred = SAMPLE_CREDENTIALS[publicCode.toUpperCase().trim()];
    if (!cred) {
      throw new NotFoundException(`Credential with code '${publicCode}' is not recognized or does not exist.`);
    }
    return cred;
  }
}
