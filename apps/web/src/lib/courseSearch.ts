import { useMemo, useState, useEffect, useCallback, useRef } from 'react';

export interface SearchableCourse {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  level?: string;
  format?: string;
  durationHours?: number;
  totalSessions?: number;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  currency?: string;
  description?: string;
  thumbnailUrl?: string;
  skills?: string[];
  tags?: string[];
  nextBatch?: string;
  totalModules?: number;
  totalLessons?: number;
  status?: string;
  modules?: any[];
}

/**
 * Domain-specific keyword expansions and acronym mapping.
 * Ensures searches for industry terms ("AI", "SEO", "GA4", "PPC")
 * match relevant courses without false positives.
 */
const DOMAIN_SYNONYMS: Record<string, string[]> = {
  ai: [
    'artificial intelligence',
    'genai',
    'generative ai',
    'prompt',
    'chatgpt',
    'claude',
    'perplexity',
    'gemini',
    'automation',
    'agent',
    'agents',
    'aeo',
    'geo',
    'llm',
  ],
  seo: [
    'search engine optimisation',
    'search engine optimization',
    'search engine',
    'indexation',
    'crawling',
    'keyword intelligence',
    'aeo',
    'geo',
    'core web vitals',
    'serp',
    'backlinks',
    'technical seo',
  ],
  aeo: [
    'answer engine optimisation',
    'answer engine optimization',
    'seo',
    'geo',
    'ai search',
    'perplexity',
  ],
  geo: [
    'generative engine optimisation',
    'generative engine optimization',
    'ai search',
    'aeo',
  ],
  'google ads': [
    'ppc',
    'pay-per-click',
    'search ads',
    'performance max',
    'pmax',
    'paid advertising',
    'paid media',
    'adwords',
    'display ads',
    'youtube ads',
    'bidding',
  ],
  ppc: [
    'pay-per-click',
    'google ads',
    'meta ads',
    'paid performance',
    'paid advertising',
    'bidding',
    'pmax',
  ],
  ga4: [
    'google analytics',
    'google analytics 4',
    'google tag manager',
    'gtm',
    'analytics',
    'datalayers',
    'looker studio',
    'tracking',
    'attribution',
    'conversion events',
  ],
  gtm: [
    'google tag manager',
    'datalayer',
    'ga4',
    'google analytics',
    'tracking',
  ],
  analytics: [
    'ga4',
    'google analytics',
    'google tag manager',
    'gtm',
    'looker studio',
    'attribution',
    'tracking',
    'metrics',
  ],
  'social media': [
    'smo',
    'meta ads',
    'facebook',
    'instagram',
    'linkedin',
    'youtube',
    'social listening',
    'content strategy',
    'organic distribution',
  ],
  smo: [
    'social media optimisation',
    'social media optimization',
    'social media',
    'community',
    'organic distribution',
  ],
  email: [
    'email marketing',
    'newsletter',
    'crm',
    'automation',
    'spf',
    'dkim',
    'dmarc',
    'deliverability',
  ],
  crm: [
    'marketing automation',
    'email',
    'hubspot',
    'leads',
    'lifecycle',
  ],
  automation: [
    'marketing automation',
    'zapier',
    'make',
    'ai agents',
    'workflows',
    'crm',
  ],
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Scores a course against a search query using multi-field token analysis.
 * Prioritizes: Exact title match > Partial title match > Category > Skills > Description.
 * Avoids false substring matches (e.g. "AI" will NEVER match "training" or "email").
 */
export function calculateRelevanceScore(course: SearchableCourse, rawQuery: string): number {
  const trimmed = rawQuery.trim().toLowerCase();
  if (!trimmed) return 1;

  const titleLower = (course.title || '').toLowerCase();
  const descLower = (course.description || '').toLowerCase();
  const catLower = (course.category || '').toLowerCase();
  const skillsLower = (course.skills || []).map((s) => s.toLowerCase());

  // 1. Exact title match (highest possible priority)
  if (titleLower === trimmed) {
    return 2000;
  }

  // 2. Exact title starts with query
  if (titleLower.startsWith(trimmed)) {
    return 1200;
  }

  const queryTokens = trimmed.split(/\s+/).filter(Boolean);
  let totalScore = 0;

  for (const token of queryTokens) {
    let tokenScore = 0;
    const isShort = token.length <= 3;

    // Word boundary regex:
    // Short acronyms (<= 3 chars e.g. "ai", "seo", "ga4") require strict word boundary \b...\b
    // Longer words require word prefix boundary \bword
    const tokenRegex = isShort
      ? new RegExp(`\\b${escapeRegex(token)}\\b`, 'i')
      : new RegExp(`\\b${escapeRegex(token)}`, 'i');

    // Title Match
    if (tokenRegex.test(titleLower)) {
      tokenScore += 400;
    }

    // Category Match
    if (tokenRegex.test(catLower)) {
      tokenScore += 250;
    }

    // Skills Match
    for (const skill of skillsLower) {
      if (tokenRegex.test(skill)) {
        tokenScore += 180;
        break;
      }
    }

    // Description Match (strictly at word boundaries)
    if (tokenRegex.test(descLower)) {
      tokenScore += 60;
    }

    // Domain Synonyms / Acronym Expansion Check
    const synonyms = DOMAIN_SYNONYMS[token];
    if (synonyms && synonyms.length > 0) {
      for (const syn of synonyms) {
        const synRegex = new RegExp(`\\b${escapeRegex(syn)}`, 'i');
        if (synRegex.test(titleLower)) {
          tokenScore += 220;
          break;
        }
        if (synRegex.test(catLower)) {
          tokenScore += 160;
          break;
        }
        for (const skill of skillsLower) {
          if (synRegex.test(skill)) {
            tokenScore += 120;
            break;
          }
        }
        if (synRegex.test(descLower)) {
          tokenScore += 40;
          break;
        }
      }
    }

    // If any token in a multi-word query fails completely, exclude the course
    if (tokenScore === 0) {
      return 0;
    }

    totalScore += tokenScore;
  }

  return totalScore;
}

/**
 * Checks whether a course matches a selected category filter.
 * Supports exact match, normalized token match, or 'ALL'.
 */
export function matchesCategoryFilter(course: SearchableCourse, selectedCategory: string): boolean {
  if (!selectedCategory || selectedCategory === 'ALL') {
    return true;
  }

  const courseCat = (course.category || '').toLowerCase();
  const targetCat = selectedCategory.toLowerCase();

  if (courseCat === targetCat) return true;
  if (courseCat.includes(targetCat)) return true;

  // Handle normalized category names
  if (targetCat === 'digital marketing') {
    return courseCat.includes('digital marketing');
  }
  if (targetCat === 'search engine optimisation' || targetCat === 'seo') {
    return courseCat.includes('search engine') || courseCat.includes('seo');
  }
  if (targetCat === 'paid advertising' || targetCat === 'ppc') {
    return courseCat.includes('paid advertising') || courseCat.includes('ads');
  }
  if (targetCat === 'analytics & tracking') {
    return courseCat.includes('analytics') || courseCat.includes('ga4');
  }
  if (targetCat === 'social media marketing' || targetCat === 'social media') {
    return courseCat.includes('social media');
  }
  if (targetCat === 'ai for digital marketing' || targetCat === 'ai') {
    return courseCat.includes('ai') || courseCat.includes('artificial intelligence');
  }

  return false;
}

/**
 * Pure search and filter function.
 * Filters by category and ranks by search relevance.
 */
export function searchAndFilterCourses<T extends SearchableCourse>(
  courses: T[],
  query: string = '',
  category: string = 'ALL'
): T[] {
  const trimmed = query.trim();

  // 1. Filter by category first
  const categoryFiltered = courses.filter((c) => matchesCategoryFilter(c, category));

  // 2. If no query, return category-filtered courses as-is
  if (!trimmed) {
    return categoryFiltered;
  }

  // 3. Compute relevance scores and filter out score === 0
  const scored = categoryFiltered
    .map((c) => ({
      course: c,
      score: calculateRelevanceScore(c, trimmed),
    }))
    .filter((item) => item.score > 0);

  // 4. Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  return scored.map((item) => item.course);
}

/**
 * Dynamically extracts all distinct categories from a course array.
 * Always guarantees 'ALL' is the first category pill.
 */
export function extractUniqueCategories(courses: SearchableCourse[]): string[] {
  const set = new Set<string>();

  courses.forEach((c) => {
    if (!c.category) return;
    // Extract primary canonical category (before any '/')
    const primary = c.category.split('/')[0].trim();
    if (primary) {
      set.add(primary);
    }
  });

  const preferredOrder = [
    'Digital Marketing',
    'Search Engine Optimisation',
    'Paid Advertising',
    'Analytics & Tracking',
    'Social Media Marketing',
    'AI for Digital Marketing',
  ];

  const extractedList = Array.from(set);
  const sortedCategories: string[] = [];

  // Add preferred categories if present in data
  preferredOrder.forEach((pref) => {
    const match = extractedList.find(
      (cat) => cat.toLowerCase() === pref.toLowerCase() || cat.toLowerCase().includes(pref.toLowerCase())
    );
    if (match && !sortedCategories.includes(pref)) {
      sortedCategories.push(pref);
    }
  });

  // Append any newly added custom categories
  extractedList.forEach((cat) => {
    if (!sortedCategories.some((sc) => sc.toLowerCase() === cat.toLowerCase())) {
      sortedCategories.push(cat);
    }
  });

  return ['ALL', ...sortedCategories];
}

/**
 * Custom React Hook providing debounced, synchronized real-time search and filtering.
 */
export function useCourseSearch<T extends SearchableCourse>(
  courses: T[],
  options: {
    initialCategory?: string;
    debounceMs?: number;
  } = {}
) {
  const { initialCategory = 'ALL', debounceMs = 300 } = options;

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Reference for request ordering to prevent stale responses
  const searchVersionRef = useRef(0);

  // Handle 300ms debounce
  useEffect(() => {
    setIsDebouncing(true);
    const version = ++searchVersionRef.current;

    const timer = setTimeout(() => {
      if (version === searchVersionRef.current) {
        setDebouncedQuery(searchQuery);
        setIsDebouncing(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, debounceMs]);

  // Derived filtered results
  const filteredCourses = useMemo(() => {
    return searchAndFilterCourses(courses, debouncedQuery, selectedCategory);
  }, [courses, debouncedQuery, selectedCategory]);

  // Derived dynamic categories
  const categories = useMemo(() => {
    return extractUniqueCategories(courses);
  }, [courses]);

  // Clear search field immediately
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setIsDebouncing(false);
  }, []);

  // Reset both category and search query
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSelectedCategory('ALL');
    setIsDebouncing(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    selectedCategory,
    setSelectedCategory,
    filteredCourses,
    categories,
    isDebouncing,
    clearSearch,
    resetFilters,
    totalResults: filteredCourses.length,
    hasActiveFilters: Boolean(searchQuery.trim()) || selectedCategory !== 'ALL',
  };
}
