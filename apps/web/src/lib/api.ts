/**
 * StudentVerse Unified API Client
 * Connects frontend Next.js application to NestJS Backend (/api/v1)
 * Handles automatic JWT Bearer injection and graceful degradation
 */

import { getAuthToken } from './auth';

function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  // If an external API URL is explicitly configured (and not localhost:4000)
  if (envUrl && !envUrl.includes('localhost:4000')) {
    const base = envUrl.replace(/\/$/, '');
    if (base.endsWith('/api/v1')) {
      return `${base}${cleanEndpoint.replace(/^\/api\/v1/, '')}`;
    }
    const path = cleanEndpoint.startsWith('/api/v1') ? cleanEndpoint : `/api/v1${cleanEndpoint}`;
    return `${base}${path}`;
  }

  // Client-side browser execution (Vercel or local Next.js): relative path to Next.js route handlers
  const apiPath = cleanEndpoint.startsWith('/api/v1') ? cleanEndpoint : `/api/v1${cleanEndpoint}`;
  if (typeof window !== 'undefined') {
    return apiPath;
  }

  // Server-side Next.js execution
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${apiPath}`;
  }

  const port = process.env.PORT || 3000;
  return `http://localhost:${port}${apiPath}`;
}

const inFlightRequests = new Map<string, Promise<any>>();
const memoryCache = new Map<string, { data: any; expiry: number }>();

export function clearApiCache(): void {
  memoryCache.clear();
  inFlightRequests.clear();
}

if (typeof window !== 'undefined') {
  window.addEventListener('sv_auth_changed', clearApiCache);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const url = getApiUrl(endpoint);
  const token = getAuthToken();
  const cacheKey = `${method}:${url}:${token || 'anon'}`;

  // For non-GET requests, invalidate cached data to guarantee immediate consistency
  if (method !== 'GET') {
    memoryCache.clear();
  } else {
    // Check in-memory cache
    const cached = memoryCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T;
    }

    // Check in-flight promise deduplication
    const inFlight = inFlightRequests.get(cacheKey);
    if (inFlight) {
      return inFlight as Promise<T>;
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchPromise = (async () => {
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = data.message || `Request failed with status ${response.status}`;
        throw new Error(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
      }

      // Cache successful GET results: 30s TTL for public catalogue, 10s TTL for dynamic student data
      if (method === 'GET') {
        const ttl = endpoint.includes('/courses') && !endpoint.includes('progress') ? 30000 : 10000;
        memoryCache.set(cacheKey, { data, expiry: Date.now() + ttl });
      }

      return data as T;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  if (method === 'GET') {
    inFlightRequests.set(cacheKey, fetchPromise);
  }

  return fetchPromise;
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
      website?: string;
      industry?: string;
      designation?: string;
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
      // 1. Try authoritative student course progress endpoint
      try {
        const res = await request<{
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
          lessonProgress?: any[];
          lastAccessedLessonId?: string | null;
        }>(`/student/courses/${encodeURIComponent(courseSlug)}/progress`);
        if (
          res &&
          res.isEnrolled &&
          ((res.completedCount || 0) > 0 ||
            (res.progressPct || 0) > 0 ||
            (Array.isArray(res.completedLessonIds) && res.completedLessonIds.length > 0))
        ) {
          return res;
        }
      } catch (_) {}

      // 2. Try courses progress endpoint
      try {
        const res = await request<any>(`/courses/${encodeURIComponent(courseSlug)}/progress`);
        if (
          res &&
          res.isEnrolled &&
          ((res.completedCount || 0) > 0 ||
            (res.progressPct || 0) > 0 ||
            (Array.isArray(res.completedLessonIds) && res.completedLessonIds.length > 0))
        ) {
          return res;
        }
      } catch (_) {}

      // 3. Fallback to /student/dashboard which always has genuine PostgreSQL enrollment & progressPct
      try {
        const dash = await request<any>('/student/dashboard');
        const match = dash?.enrollments?.find((e: any) => e.slug === courseSlug || e.courseSlug === courseSlug);
        if (match && ((match.completedLessons || 0) > 0 || (match.progressPct || 0) > 0)) {
          return {
            isEnrolled: true,
            enrollmentId: match.enrollmentId || match.id,
            totalLessons: match.totalLessons || 41,
            completedCount: match.completedLessons ?? match.completedCount ?? 0,
            progressPct: match.progressPct ?? match.progressPercentage ?? 0,
            completedLessonIds: match.completedLessonIds || [],
            lastAccessedLessonId: match.lastAccessedLessonId || null,
          };
        }
      } catch (_) {}

      return {
        isEnrolled: true,
        totalLessons: 41,
        completedCount: 0,
        progressPct: 0,
        completedLessonIds: [],
        lastAccessedLessonId: null,
      };
    },

    updateLessonProgress: async (
      courseSlug: string,
      lessonId: string,
      data: {
        status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
        isCompleted?: boolean;
        totalLessons?: number;
        watchedSeconds?: number;
        watchedPct?: number;
        lastPositionSeconds?: number;
        completionMethod?: string;
      }
    ) => {
      // 1. Try standard REST endpoint
      try {
        return await request<{
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
        }>(`/student/courses/${encodeURIComponent(courseSlug)}/lessons/${encodeURIComponent(lessonId)}/progress`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
      } catch (_) {}

      // 2. Fallback to /courses/${slug}/progress with payload
      try {
        return await request<any>(`/courses/${encodeURIComponent(courseSlug)}/progress`, {
          method: 'POST',
          body: JSON.stringify({ ...data, lessonId, courseSlug }),
        });
      } catch (_) {}

      // 3. Fallback to flat endpoint
      return await request<any>(`/student/courses/progress`, {
        method: 'POST',
        body: JSON.stringify({ ...data, lessonId, courseSlug }),
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

  clearCache: clearApiCache,
};
