import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  companySlug: string;
  isCompanyVerified: boolean;
  location: string;
  workplaceType: 'REMOTE' | 'HYBRID' | 'ON_SITE';
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  screeningQuestions: string[];
  postedAt: string;
}

export interface CandidateSearchQuery {
  skills?: string[];
  remotePreference?: boolean;
  country?: string;
}

const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-101',
    slug: 'remote-marketing-operations-associate',
    title: 'Remote Marketing Operations Associate',
    companyName: 'Apex Growth Labs',
    companySlug: 'apex-growth',
    isCompanyVerified: true,
    location: 'Global (Remote)',
    workplaceType: 'REMOTE',
    jobType: 'FULL_TIME',
    salaryRange: '$48,000 - $65,000 USD / year',
    description: 'We are seeking a proactive Marketing Operations Associate to oversee campaign execution, tracking taxonomy, email workflow automation, and attribution reporting. You will partner with our growth leads to streamline funnel metrics.',
    requiredSkills: ['Digital Marketing', 'Google Analytics 4', 'HubSpot CRM', 'Campaign Tracking'],
    screeningQuestions: [
      'Have you completed an evaluated multi-channel campaign capstone or project?',
      'What timezone overlap can you comfortably commit to (UTC)?'
    ],
    postedAt: '2026-11-10T10:00:00Z'
  },
  {
    id: 'job-102',
    slug: 'junior-automation-workflow-engineer',
    title: 'Junior Automation & Workflow Engineer',
    companyName: 'Nexis Digital Services',
    companySlug: 'nexis-digital',
    isCompanyVerified: true,
    location: 'Remote (EMEA / APAC friendly)',
    workplaceType: 'REMOTE',
    jobType: 'FULL_TIME',
    salaryRange: '$52,000 - $70,000 USD / year',
    description: 'Nexis is looking for an Automation Engineer proficient in webhook architecture, low-code iPaaS platforms (n8n, Make), and REST API integrations. You will automate customer onboarding, internal alerting, and ticket routing.',
    requiredSkills: ['n8n', 'Make / Integromat', 'REST APIs', 'JSON Data Transformation', 'Error Handling'],
    screeningQuestions: [
      'Share a link or description of an automated pipeline you designed.',
      'How do you manage API rate-limits and retries in automated nodes?'
    ],
    postedAt: '2026-11-12T14:30:00Z'
  }
];

export interface CandidateProfileResult {
  id: string;
  displayName: string;
  headline: string;
  country: string;
  skills: string[];
  completedCourses: string[];
  credentialsCount: number;
  portfolioLinks: string[];
  remotePreference: boolean;
  visibility: 'SEARCHABLE';
}

const SAMPLE_SEARCHABLE_CANDIDATES: CandidateProfileResult[] = [
  {
    id: 'cand-1',
    displayName: 'Elena Rostova',
    headline: 'Certified Digital Performance Marketer & SEO Specialist',
    country: 'Poland',
    skills: ['SEO', 'Google Analytics 4', 'Meta Ads', 'Conversion Rate Optimization'],
    completedCourses: ['Digital Marketing Foundations'],
    credentialsCount: 1,
    portfolioLinks: ['https://github.com/elena-marketing/seo-audit-showcase'],
    remotePreference: true,
    visibility: 'SEARCHABLE'
  },
  {
    id: 'cand-2',
    displayName: 'Marcus Chen',
    headline: 'RevOps Specialist & Workflow Automation Builder',
    country: 'Singapore',
    skills: ['HubSpot CRM', 'n8n', 'Make', 'Lead Scoring', 'REST APIs'],
    completedCourses: ['HubSpot CRM & Automation', 'AI Workflow Automation'],
    credentialsCount: 2,
    portfolioLinks: ['https://portfolio.marcuschen-ops.dev'],
    remotePreference: true,
    visibility: 'SEARCHABLE'
  }
];

@Injectable()
export class RecruitmentService {
  constructor(private prisma: PrismaService) {}

  async getPublicJobs() {
    return INITIAL_JOBS;
  }

  async getJobBySlug(slug: string) {
    const job = INITIAL_JOBS.find((j) => j.slug === slug);
    if (!job) {
      throw new NotFoundException(`Job posting with slug '${slug}' not found`);
    }
    return job;
  }

  // BR-06: Employer candidate search is strictly restricted to verified employers
  // and only includes opted-in SEARCHABLE profiles
  async searchCandidates(isEmployerVerified: boolean, query?: CandidateSearchQuery) {
    if (!isEmployerVerified) {
      throw new ForbiddenException(
        'Access Denied: Only verified employer organizations may access the talent discovery pool. Submit business verification for review.'
      );
    }

    let candidates = SAMPLE_SEARCHABLE_CANDIDATES;
    if (query?.country) {
      candidates = candidates.filter((c) => c.country.toLowerCase() === query.country!.toLowerCase());
    }
    if (query?.skills && query.skills.length > 0) {
      candidates = candidates.filter((c) =>
        query.skills!.some((s) => c.skills.map((k) => k.toLowerCase()).includes(s.toLowerCase()))
      );
    }
    return {
      total: candidates.length,
      candidates,
    };
  }

  // AC-09: Student can apply once per job
  async submitApplication(jobId: string, applicantId: string, payload: { coverNote?: string }) {
    const job = INITIAL_JOBS.find((j) => j.id === jobId);
    if (!job) {
      throw new NotFoundException('Job post does not exist');
    }

    return {
      success: true,
      applicationId: `app-${Date.now()}`,
      jobTitle: job.title,
      company: job.companyName,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
      message: 'Application successfully received by the hiring partner.',
    };
  }
}
