/**
 * StudentVerse Unified API Client
 * Connects frontend Next.js application to NestJS Backend (/api/v1)
 * Handles automatic JWT Bearer injection and graceful degradation
 */

import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
  }

  return data as T;
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      return request<{ accessToken: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },

    register: async (userData: {
      email: string;
      password: string;
      fullName: string;
      country?: string;
      role?: string;
      companyName?: string;
    }) => {
      return request<{ accessToken: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    getMe: async () => {
      return request<any>('/auth/me');
    },

    updateProfile: async (data: { fullName?: string; headline?: string; country?: string; avatarUrl?: string }) => {
      return request<any>('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
  },

  student: {
    getDashboard: async () => {
      return request<{
        enrolledCourseCount: number;
        activeCohortCount: number;
        enrollments: any[];
        nextLiveClass: any | null;
        overallSkillScore: number | null;
        assessmentStatus: 'NOT_ASSESSED' | 'PENDING' | 'ASSESSED' | 'VERIFIED';
        placementStatus: 'NOT_ASSESSED' | 'REQUIREMENTS_PENDING' | 'UNDER_REVIEW' | 'ELIGIBLE';
        activePlacementTrackCount: number;
        assignments: any[];
        certificates: any[];
        skillRatings: any[];
        talentPoolOptIn: boolean;
      }>('/student/dashboard');
    },

    getEnrollments: async () => {
      return request<any[]>('/student/enrollments');
    },

    getPurchases: async () => {
      return request<Array<{
        id: string;
        orderReference: string;
        courseId: string;
        courseTitle: string;
        courseSlug: string;
        amount: number;
        currency: string;
        status: string;
        purchaseDate: string;
      }>>('/student/purchases');
    },

    enroll: async (courseSlug: string, batchCode?: string) => {
      return request<{
        success: boolean;
        enrollmentId?: string;
        courseTitle: string;
        batchCode: string;
        message: string;
        alreadyEnrolled?: boolean;
      }>('/student/enroll', {
        method: 'POST',
        body: JSON.stringify({ courseSlug, batchCode }),
      });
    },

    getClasses: async () => {
      return request<any[]>('/student/classes');
    },

    getAssignments: async () => {
      return request<any[]>('/student/assignments');
    },

    updateTalentPool: async (optIn: boolean) => {
      return request<{
        success: boolean;
        visibility: string;
        message: string;
      }>('/student/talent-pool', {
        method: 'POST',
        body: JSON.stringify({ optIn }),
      });
    },

    getCourseProgress: async (courseSlug: string) => {
      return request<{
        isEnrolled: boolean;
        enrollmentId?: string;
        totalLessons: number;
        completedCount: number;
        progressPct: number;
        completedLessonIds: string[];
        modules?: Array<{
          id: string;
          orderIndex: number;
          title: string;
          totalLessons: number;
          completedLessons: number;
          progressPct: number;
          isCompleted: boolean;
        }>;
        lessonProgress: any[];
      }>(`/student/courses/${courseSlug}/progress`);
    },

    updateLessonProgress: async (
      courseSlug: string,
      lessonId: string,
      data: {
        status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
        isCompleted?: boolean;
        watchedSeconds?: number;
        watchedPct?: number;
        lastPositionSeconds?: number;
        completionMethod?: string;
      }
    ) => {
      return request<{
        success: boolean;
        lessonId: string;
        slugId: string;
        status: string;
        isCompleted: boolean;
        completedCount: number;
        totalLessons: number;
        progressPct: number;
        completedLessonIds?: string[];
        modules?: Array<{
          id: string;
          orderIndex: number;
          title: string;
          totalLessons: number;
          completedLessons: number;
          progressPct: number;
          isCompleted: boolean;
        }>;
        completedAt?: string;
      }>(`/student/courses/${courseSlug}/lessons/${lessonId}/progress`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  employer: {
    getDashboard: async () => {
      return request<{
        companyName: string;
        verificationStatus: string;
        website?: string;
        country?: string;
        jobsCount: number;
        candidateShortlistCount: number;
        pendingInterviewsCount: number;
        jobs: any[];
        shortlists: any[];
        hiringRequests: any[];
      }>('/recruitment/employer/dashboard');
    },

    searchCandidates: async (params?: { query?: string; skills?: string[]; remoteOnly?: boolean }) => {
      const q = new URLSearchParams();
      if (params?.query) q.set('query', params.query);
      if (params?.skills && params.skills.length > 0) q.set('skills', params.skills.join(','));
      if (params?.remoteOnly !== undefined) q.set('remoteOnly', String(params.remoteOnly));
      const qs = q.toString() ? `?${q.toString()}` : '';
      return request<any[]>(`/recruitment/candidates${qs}`);
    },

    createHiringRequest: async (data: {
      candidateId: string;
      candidateName: string;
      jobTitle: string;
      jobDescription: string;
      salaryRange: string;
      requiredSkills?: string[];
      employmentType?: string;
      preferredLocation?: string;
    }) => {
      return request<any>('/recruitment/hiring-requests', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  courses: {
    getAll: async () => {
      return request<any[]>('/courses');
    },

    getBySlug: async (slug: string) => {
      return request<any>(`/courses/${slug}`);
    },
  },
};
