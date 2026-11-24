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
  minScore?: number;
}

export interface SearchableCandidate {
  id: string;
  displayName: string;
  headline: string;
  country: string;
  overallScore: number;
  skills: { name: string; score: number; verifiedTasks: number }[];
  completedCourses: string[];
  credentialsCount: number;
  portfolioLinks: string[];
  remotePreference: boolean;
  availability: 'IMMEDIATE' | 'TWO_WEEKS' | 'ONE_MONTH';
  visibility: 'SEARCHABLE';
  // Contact details are strictly excluded to protect student privacy
}

export interface HiringRequestPayload {
  candidateId: string;
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  jobTitle: string;
  jobDescription: string;
  requiredSkills: string[];
  employmentType?: string;
  preferredLocation?: string;
  salaryRange?: string;
  additionalNotes?: string;
}

export interface HiringRequestRecord extends HiringRequestPayload {
  id: string;
  status:
    | 'SUBMITTED'
    | 'UNDER_REVIEW'
    | 'STUDENT_CONTACTED'
    | 'STUDENT_INTERESTED'
    | 'INTERVIEW_COORDINATION'
    | 'INTERVIEW_SCHEDULED'
    | 'OFFER_EXTENDED'
    | 'HIRED'
    | 'CLOSED';
  candidateName: string;
  internalAdminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlacementPartner {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  isVerified: boolean;
  activeHiringTracks: string[];
}

const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-101',
    slug: 'remote-digital-marketing-specialist',
    title: 'Digital Marketing & Growth Specialist',
    companyName: 'Apex Growth Labs',
    companySlug: 'apex-growth',
    isCompanyVerified: true,
    location: 'Global (Remote)',
    workplaceType: 'REMOTE',
    jobType: 'FULL_TIME',
    salaryRange: '₹10,00,000 - ₹15,00,000 / year',
    description: 'We are seeking a proactive Digital Marketing Specialist to execute paid acquisition campaigns, optimize SEO traffic, configure GA4 tracking, and build automated email nurture flows.',
    requiredSkills: ['Digital Marketing', 'Google Analytics 4', 'Google Ads', 'Meta Ads', 'SEO'],
    screeningQuestions: [
      'Have you submitted an evaluated multi-channel campaign portfolio piece on StudentVerse?',
      'What timezone overlap can you comfortably commit to (UTC)?'
    ],
    postedAt: '2026-11-12T10:00:00Z'
  },
  {
    id: 'job-102',
    slug: 'seo-content-operations-associate',
    title: 'Technical SEO & Content Operations Associate',
    companyName: 'Nexis Digital Global',
    companySlug: 'nexis-digital',
    isCompanyVerified: true,
    location: 'Remote (EMEA / APAC friendly)',
    workplaceType: 'REMOTE',
    jobType: 'FULL_TIME',
    salaryRange: '₹8,00,000 - ₹12,00,000 / year',
    description: 'Nexis is looking for an SEO Associate proficient in technical crawl audits, schema entity graphs, keyword clustering, and Answer Engine Optimisation (AEO) for AI search engines.',
    requiredSkills: ['Technical SEO', 'Schema Markup', 'Keyword Clustering', 'Google Search Console', 'AEO'],
    screeningQuestions: [
      'Share a link to a verifiable technical audit report you completed.',
      'How do you approach entity optimization for Google AI Overviews?'
    ],
    postedAt: '2026-11-14T14:30:00Z'
  }
];

const SEARCHABLE_CANDIDATES: SearchableCandidate[] = [
  {
    id: 'cand-1',
    displayName: 'Elena Rostova',
    headline: 'Certified Digital Performance Marketer & SEO Specialist',
    country: 'Poland (UTC+1)',
    overallScore: 94,
    skills: [
      { name: 'Technical SEO & AEO', score: 96, verifiedTasks: 4 },
      { name: 'Google Analytics 4', score: 93, verifiedTasks: 3 },
      { name: 'Meta Ads', score: 92, verifiedTasks: 2 },
      { name: 'Omnichannel Strategy', score: 95, verifiedTasks: 3 }
    ],
    completedCourses: ['Digital Marketing Fundamentals', 'Search Engine Optimisation & AEO'],
    credentialsCount: 2,
    portfolioLinks: ['https://github.com/elena-marketing/seo-audit-showcase'],
    remotePreference: true,
    availability: 'IMMEDIATE',
    visibility: 'SEARCHABLE'
  },
  {
    id: 'cand-2',
    displayName: 'Alex Morgan',
    headline: 'Growth & Performance Acquisition Marketer',
    country: 'United Kingdom (UTC+0)',
    overallScore: 91,
    skills: [
      { name: 'Omnichannel Strategy', score: 93, verifiedTasks: 3 },
      { name: 'Paid Media & Google Ads', score: 90, verifiedTasks: 2 },
      { name: 'CRO Funnel Design', score: 91, verifiedTasks: 2 },
      { name: 'Analytics & GA4', score: 89, verifiedTasks: 3 }
    ],
    completedCourses: ['Digital Marketing Fundamentals', 'Paid Performance Advertising'],
    credentialsCount: 1,
    portfolioLinks: ['https://github.com/alexmorgan-growth/portfolio'],
    remotePreference: true,
    availability: 'TWO_WEEKS',
    visibility: 'SEARCHABLE'
  },
  {
    id: 'cand-3',
    displayName: 'Marcus Chen',
    headline: 'Analytics & Marketing Automation Specialist',
    country: 'Singapore (UTC+8)',
    overallScore: 89,
    skills: [
      { name: 'GA4 & Tag Manager', score: 94, verifiedTasks: 4 },
      { name: 'Looker Studio BI', score: 91, verifiedTasks: 3 },
      { name: 'AI Marketing Prompting', score: 88, verifiedTasks: 2 }
    ],
    completedCourses: ['Marketing Analytics, GA4 & GTM', 'AI Tools & Automation'],
    credentialsCount: 2,
    portfolioLinks: ['https://portfolio.marcuschen-analytics.dev'],
    remotePreference: true,
    availability: 'IMMEDIATE',
    visibility: 'SEARCHABLE'
  }
];

const INITIAL_PLACEMENT_PARTNERS: PlacementPartner[] = [
  {
    id: 'partner-1',
    name: 'Apex Growth Labs',
    slug: 'apex-growth',
    industry: 'Digital Performance & Growth Advisory',
    website: 'https://apexgrowth.example.com',
    location: 'London & Global Remote',
    description: 'Premier growth consultancy partnering with high-velocity SaaS and D2C brands. Actively hiring certified StudentVerse talent for acquisition and media buying tracks.',
    isVerified: true,
    activeHiringTracks: ['Performance Marketing', 'Paid Media (Meta/Google)', 'CRO Funnels']
  },
  {
    id: 'partner-2',
    name: 'Nexis Digital Global',
    slug: 'nexis-digital',
    industry: 'Enterprise SEO & Search Operations',
    website: 'https://nexisdigital.example.com',
    location: 'Berlin & Singapore',
    description: 'Global search and content engineering firm helping brands thrive across modern search engines and AI answer engines. Recruits technical SEO and analytics graduates.',
    isVerified: true,
    activeHiringTracks: ['Technical SEO', 'Entity & AEO Optimization', 'Analytics & GA4']
  },
  {
    id: 'partner-3',
    name: 'Vanguard Media Group',
    slug: 'vanguard-media',
    industry: 'Omnichannel Advertising Agency',
    website: 'https://vanguardmedia.example.com',
    location: 'New York, Toronto & Remote',
    description: 'Full-service digital media agency managing ₹250 Cr+ annual paid advertising budgets across Google, Meta, and emerging channels.',
    isVerified: true,
    activeHiringTracks: ['Media Buying', 'Social Media Strategy', 'Campaign Analytics']
  }
];

@Injectable()
export class RecruitmentService {
  constructor(private prisma: PrismaService) {}

  private hiringRequestsStore = new Map<string, HiringRequestRecord>();

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

  // BR-05 & BR-06: Strict Talent Privacy & Employer Vetting Gate
  async searchCandidates(isEmployerVerified: boolean, query?: CandidateSearchQuery) {
    if (!isEmployerVerified) {
      throw new ForbiddenException(
        'Access Denied: Only verified employer organisations may access the candidate talent pool. Please submit business verification for administrative review.'
      );
    }

    let candidates = SEARCHABLE_CANDIDATES;
    if (query?.country) {
      candidates = candidates.filter((c) => c.country.toLowerCase().includes(query.country!.toLowerCase()));
    }
    if (query?.skills && query.skills.length > 0) {
      candidates = candidates.filter((c) =>
        query.skills!.some((s) => c.skills.map((k) => k.name.toLowerCase()).includes(s.toLowerCase()))
      );
    }
    if (query?.minScore) {
      candidates = candidates.filter((c) => c.overallScore >= query.minScore!);
    }

    return {
      total: candidates.length,
      candidates
    };
  }

  // Intermediated Hiring Request System
  async submitHiringRequest(payload: HiringRequestPayload) {
    if (!payload.candidateId || !payload.companyName || !payload.jobTitle || !payload.businessEmail) {
      throw new BadRequestException('Candidate ID, Company Name, Job Title, and Business Email are required.');
    }

    const candidate = SEARCHABLE_CANDIDATES.find((c) => c.id === payload.candidateId);
    const candidateName = candidate ? candidate.displayName : 'Verified Student Candidate';

    const reqId = `hr-${Date.now()}`;
    const newRecord: HiringRequestRecord = {
      id: reqId,
      ...payload,
      candidateName,
      status: 'SUBMITTED',
      internalAdminNotes: 'New employer enquiry received. Pending administrative review.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.hiringRequestsStore.set(reqId, newRecord);

    return {
      success: true,
      hiringRequestId: reqId,
      candidateName,
      status: 'SUBMITTED',
      message: 'Hiring enquiry submitted successfully! StudentVerse acts as the trusted intermediary: our placement officers will review the opportunity, contact the candidate confidentially, and coordinate next steps with your team.'
    };
  }

  async getHiringRequests(filterCompany?: string) {
    let requests = Array.from(this.hiringRequestsStore.values());
    if (filterCompany) {
      requests = requests.filter((r) => r.companyName.toLowerCase().includes(filterCompany.toLowerCase()));
    }
    return requests;
  }

  async updateHiringRequestStatus(
    id: string,
    newStatus: HiringRequestRecord['status'],
    internalNotes?: string
  ) {
    const record = this.hiringRequestsStore.get(id);
    if (!record) {
      throw new NotFoundException('Hiring request not found');
    }

    record.status = newStatus;
    if (internalNotes) {
      record.internalAdminNotes = internalNotes;
    }
    record.updatedAt = new Date().toISOString();
    this.hiringRequestsStore.set(id, record);

    return {
      success: true,
      id,
      status: newStatus,
      updatedAt: record.updatedAt
    };
  }

  async getPlacementPartners() {
    return INITIAL_PLACEMENT_PARTNERS;
  }

  async submitApplication(jobId: string, applicantId: string, payload: { coverNote?: string }) {
    const job = INITIAL_JOBS.find((j) => j.id === jobId);
    if (!job) {
      throw new NotFoundException('Job post not found');
    }

    return {
      success: true,
      applicationId: `app-${Date.now()}`,
      jobTitle: job.title,
      company: job.companyName,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
      message: 'Application successfully received by the hiring partner.'
    };
  }

  async getEmployerDashboard(userId: string) {
    try {
      const membership = await this.prisma.organisationMember.findFirst({
        where: { userId },
        include: {
          organisation: {
            include: {
              jobPosts: true,
              shortlists: true,
              hiringRequests: true,
            },
          },
        },
      });

      if (!membership || !membership.organisation) {
        return {
          companyName: 'New Hiring Partner',
          verificationStatus: 'PENDING',
          jobsCount: 0,
          candidateShortlistCount: 0,
          pendingInterviewsCount: 0,
          jobs: [],
          shortlists: [],
          hiringRequests: [],
        };
      }

      const org = membership.organisation;
      return {
        companyName: org.name,
        verificationStatus: org.verificationStatus,
        website: org.website,
        country: org.country,
        jobsCount: org.jobPosts ? org.jobPosts.length : 0,
        candidateShortlistCount: org.shortlists ? org.shortlists.length : 0,
        pendingInterviewsCount: org.hiringRequests
          ? org.hiringRequests.filter((h: any) => h.status === 'STUDENT_CONTACTED' || h.status === 'INTERVIEW_SCHEDULED').length
          : 0,
        jobs: org.jobPosts || [],
        shortlists: org.shortlists || [],
        hiringRequests: org.hiringRequests || [],
      };
    } catch {
      return {
        companyName: 'New Hiring Partner',
        verificationStatus: 'PENDING',
        jobsCount: 0,
        candidateShortlistCount: 0,
        pendingInterviewsCount: 0,
        jobs: [],
        shortlists: [],
        hiringRequests: [],
      };
    }
  }
}
