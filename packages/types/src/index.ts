/**
 * StudentVerse - Global Digital Skills Learning & Talent Hiring Platform
 * Legal Entity: StudentVerse (RankGood Tech)
 */

export const BRAND_LEGAL = {
  BRAND_NAME: "StudentVerse",
  LEGAL_ENTITY: "StudentVerse [RankGood Tech]",
  CONTACT_EMAIL: "privacy@studentverse.com",
  SUPPORT_EMAIL: "support@studentverse.com",
} as const;

export enum UserRole {
  VISITOR = "VISITOR",
  LEARNER = "LEARNER",
  EMPLOYER_OWNER = "EMPLOYER_OWNER",
  EMPLOYER_RECRUITER = "EMPLOYER_RECRUITER",
  INSTRUCTOR = "INSTRUCTOR",
  CAREER_ADVISOR = "CAREER_ADVISOR",
  CONTENT_MANAGER = "CONTENT_MANAGER",
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
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
  SELF_PACED = "SELF_PACED",
  COHORT_BASED = "COHORT_BASED",
  HYBRID = "HYBRID",
}

export enum CoursePublishStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum LessonContentType {
  VIDEO = "VIDEO",
  READING = "READING",
  QUIZ = "QUIZ",
  PROJECT = "PROJECT",
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

export interface UserSummary {
  id: string;
  email: string;
  roles: UserRole[];
  country?: string;
  timezone?: string;
  createdAt: string;
}

export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: CourseLevel;
  durationHours: number;
  priceMinorUnits: number;
  currency: string;
  thumbnailUrl?: string;
  description: string;
  skills: string[];
}
