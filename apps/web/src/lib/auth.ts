/**
 * StudentVerse Authentication & Session Helper
 * Supports dynamic session persistence, user profile updates and API token synchronization
 */

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  country?: string;
  companyName?: string;
  isEmployerVerified?: boolean;
  headline?: string;
  createdAt?: string;
  profilePicture?: string;
  completionPercentage?: number;
}

const AUTH_TOKEN_KEY = 'sv_auth_token';
const AUTH_USER_KEY = 'sv_auth_user';

export const formatStudentName = (name: string | null | undefined): string => {
  if (!name || !name.trim()) return '';
  const trimmed = name.trim();
  return trimmed
    .split(/\s+/)
    .map((word) => {
      return word
        .split('-')
        .map((part) => {
          return part
            .split("'")
            .map((subpart) => {
              if (!subpart) return '';
              return subpart.charAt(0).toUpperCase() + subpart.slice(1).toLowerCase();
            })
            .join("'");
        })
        .join('-');
    })
    .join(' ');
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    const user = JSON.parse(raw);
    if (user && user.fullName) {
      user.fullName = formatStudentName(user.fullName);
    }
    return user;
  } catch {
    return null;
  }
};

export const setAuthSession = (token: string, user: AuthUser): void => {
  if (typeof window === 'undefined') return;
  const formattedUser = {
    ...user,
    fullName: formatStudentName(user.fullName || user.email.split('@')[0]),
  };
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(formattedUser));
  window.dispatchEvent(new Event('sv_auth_changed'));
};

export const updateAuthUser = (updates: Partial<AuthUser>): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const current = getAuthUser();
  if (!current) return null;
  const updated: AuthUser = {
    ...current,
    ...updates,
    fullName: updates.fullName ? formatStudentName(updates.fullName) : current.fullName,
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('sv_auth_changed'));
  return updated;
};

export const clearAuthSession = (): void => {
  if (typeof window === 'undefined') return;
  // Clear primary auth tokens
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);

  // Clear all user-specific progress, session and cached state
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('sv_') || key.startsWith('sb-'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));

  try {
    sessionStorage.clear();
  } catch (_) {}

  window.dispatchEvent(new Event('sv_auth_changed'));
};

export const getScopedStorageKey = (prefix: string, identifier?: string): string | null => {
  const user = getAuthUser();
  if (!user || !user.id) return null;
  return `sv_${prefix}_${user.id}_${identifier || 'default'}`;
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
