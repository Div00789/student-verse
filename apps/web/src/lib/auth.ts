/**
 * StudentVerse Authentication & Session Helper
 * Supports local session persistence and API token synchronization
 */

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  country?: string;
  companyName?: string;
  isEmployerVerified?: boolean;
}

const AUTH_TOKEN_KEY = 'sv_auth_token';
const AUTH_USER_KEY = 'sv_auth_user';

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setAuthSession = (token: string, user: AuthUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isStudent = (user: AuthUser | null): boolean => {
  if (!user) return false;
  return user.roles.includes('STUDENT') || user.roles.includes('LEARNER');
};

export const isEmployer = (user: AuthUser | null): boolean => {
  if (!user) return false;
  return user.roles.includes('EMPLOYER') || user.roles.includes('EMPLOYER_OWNER') || user.roles.includes('EMPLOYER_RECRUITER');
};

export const isAdmin = (user: AuthUser | null): boolean => {
  if (!user) return false;
  return user.roles.includes('ADMIN') || user.roles.includes('PLATFORM_ADMIN') || user.roles.includes('SUPER_ADMIN');
};
