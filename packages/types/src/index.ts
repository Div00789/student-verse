/**
 * StudentVerse - Global Digital Skills Learning & Talent Hiring Platform
 * Development Owner: Nitesh
 */

declare const process: { env?: Record<string, string | undefined> } | undefined;

export const BRAND_CONFIG = {
  BRAND_NAME: (typeof process !== "undefined" && process?.env?.NEXT_PUBLIC_BRAND_NAME) || "StudentVerse",
  BRAND_TAGLINE: "Learn Practical Skills. Prove It with Real Work. Get Hired.",
  LEGAL_ENTITY: "StudentVerse",
  CONTACT_EMAIL: "support@studentverse.com",
  PRIVACY_EMAIL: "privacy@studentverse.com",
  CAREERS_EMAIL: "careers@studentverse.com",
  PLATFORM_DISCLAIMER:
    "StudentVerse provides live online training, practical skill assessments, verifiable credentials, and career assistance. We do not guarantee employment or placement.",
} as const;

export const BRAND_LEGAL = BRAND_CONFIG; // Backward compatibility alias

export enum UserRole {
  // Core target roles
  STUDENT = "STUDENT",
  EMPLOYER = "EMPLOYER",
  ADMIN = "ADMIN",
  TRAINER = "TRAINER",

  // Granular / legacy aliases
  LEARNER = "LEARNER",
  EMPLOYER_OWNER = "EMPLOYER_OWNER",
  EMPLOYER_RECRUITER = "EMPLOYER_RECRUITER",
  INSTRUCTOR = "INSTRUCTOR",
  CAREER_ADVISOR = "CAREER_ADVISOR",
  CONTENT_MANAGER = "CONTENT_MANAGER",
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  VISITOR = "VISITOR",
}

export enum EmployerVerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

export enum TalentVisibility {
  PRIVATE = "PRIVATE",
  SEARCHABLE = "SEARCHABLE",
}

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CourseFormat {
  LIVE_ONLINE = "LIVE_ONLINE",
  COHORT_BASED = "COHORT_BASED",
  HYBRID = "HYBRID",
  SELF_PACED = "SELF_PACED",
}

export enum CoursePublishStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum LessonContentType {
  LIVE_SESSION = "LIVE_SESSION",
  RECORDED_VIDEO = "RECORDED_VIDEO",
  READING = "READING",
  QUIZ = "QUIZ",
  PRACTICAL_PROJECT = "PRACTICAL_PROJECT",
  VIDEO = "VIDEO", // backward compatibility
  PROJECT = "PROJECT", // backward compatibility
}

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  EXCUSED = "EXCUSED",
  LATE = "LATE",
}

export enum AssignmentDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum AssignmentSubmissionStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  EVALUATED = "EVALUATED",
  RESUBMISSION_REQUESTED = "RESUBMISSION_REQUESTED",
}

export enum HiringRequestStatus {
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  STUDENT_CONTACTED = "STUDENT_CONTACTED",
  STUDENT_INTERESTED = "STUDENT_INTERESTED",
  INTERVIEW_COORDINATION = "INTERVIEW_COORDINATION",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  OFFER_EXTENDED = "OFFER_EXTENDED",
  HIRED = "HIRED",
  CLOSED = "CLOSED",
}

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
}

export enum WorkplaceType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  ON_SITE = "ON_SITE",
}

export enum JobStatus {
  DRAFT = "DRAFT",
  PENDING_REVIEW = "PENDING_REVIEW",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  SUSPENDED = "SUSPENDED",
}

export enum ApplicationStatus {
  NEW = "NEW",
  REVIEWING = "REVIEWING",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW = "INTERVIEW",
  OFFER = "OFFER",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum CredentialStatus {
  ISSUED = "ISSUED",
  REVOKED = "REVOKED",
}

// -----------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------

export interface UserSummary {
  id: string;
  email: string;
  fullName?: string;
  roles: UserRole[];
  country?: string;
  timezone?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: CourseLevel;
  format: CourseFormat;
  durationHours: number;
  totalLiveSessions: number;
  priceMinorUnits: number;
  currency: string;
  thumbnailUrl?: string;
  description: string;
  skills: string[];
}

export interface LiveBatchSummary {
  id: string;
  courseId: string;
  courseTitle: string;
  batchCode: string;
  startDate: string;
  endDate: string;
  scheduleTimezone: string;
  scheduleDescription: string;
  trainerName: string;
  maxSeats: number;
  enrolledCount: number;
  status: "UPCOMING" | "IN_PROGRESS" | "COMPLETED";
}

export interface LiveClassSession {
  id: string;
  batchId: string;
  title: string;
  scheduledStart: string;
  scheduledEnd: string;
  timezone: string;
  meetingLink?: string;
  trainerName: string;
  isCompleted: boolean;
}

export interface AssignmentRubricEvaluation {
  accuracyScore: number; // 40% weight
  executionScore: number; // 30% weight
  problemSolvingScore: number; // 20% weight
  submissionQualityScore: number; // 10% weight
  totalScore: number; // out of 100
  feedbackNotes: string;
  evaluatedAt: string;
  evaluatorName: string;
}

export interface StudentSkillRating {
  skillName: string;
  category: string;
  ratingScore: number; // 0 - 100
  confidenceLevel: "LOW" | "MODERATE" | "HIGH";
  verifiedTasksCount: number;
  lastAssessedAt: string;
}

export interface HiringRequestSummary {
  id: string;
  candidateId: string;
  candidateName: string;
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  jobTitle: string;
  status: HiringRequestStatus;
  createdAt: string;
}

export interface PlacementPartnerSummary {
  id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  isVerified: boolean;
  activeHiringTracks: string[];
}
