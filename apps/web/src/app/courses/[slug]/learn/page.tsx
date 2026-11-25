'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  Check,
  Loader2,
  Video,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Award,
  Upload,
  BookOpen,
  Clock,
  Send,
  Layers,
  AlertCircle,
  Lock,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { api } from '../../../../lib/api';
import { getAuthUser, getScopedStorageKey, formatStudentName } from '../../../../lib/auth';
import { ModuleItem, LessonItem, getCurriculumForCourse } from '../../../../lib/courseCurriculum';

export default function CourseLearningPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || 'ai-digital-marketing-course';

  // Dynamic Course & Curriculum State
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<ModuleItem[]>(() => getCurriculumForCourse(slug));
  const [isLoadingCourse, setIsLoadingCourse] = useState<boolean>(true);

  // Current Active Module and Lesson
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Authentication Guard State
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Completed Lessons State - Initialized strictly to 0 / empty
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [courseProgressPct, setCourseProgressPct] = useState<number>(0);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState<boolean>(true);
  const [isSavingLesson, setIsSavingLesson] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED' | 'ERROR'>('IDLE');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Active Tab inside Lesson Workspace
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'assignment' | 'resources'>('notes');

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Assignment Submission State
  const [assignmentResponse, setAssignmentResponse] = useState('');
  const [assignmentUrl, setAssignmentUrl] = useState('');
  const [isSubmittingAssignment, setIsSubmittingAssignment] = useState(false);
  const [assignmentSubmittedSuccess, setAssignmentSubmittedSuccess] = useState(false);

  // Total published required lessons for the currently loaded course
  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const currentModule = modules[activeModuleIndex] || modules[0];
  const currentLesson = currentModule?.lessons?.[activeLessonIndex] || currentModule?.lessons?.[0];

  // Helper: check if a lesson is completed
  const isLessonDone = (lesson?: LessonItem) => {
    if (!lesson) return false;
    return (
      completedLessonIds.includes(lesson.id) ||
      (Boolean(lesson.code) && completedLessonIds.includes(lesson.code!))
    );
  };

  // 1. Single Unified Initialization Effect: Authenticates and fetches Course & Progress in Parallel
  useEffect(() => {
    let isCancelled = false;

    // Check Authentication
    const user = getAuthUser();
    if (!user || !user.id) {
      setIsAuthorized(false);
      router.replace(`/student/login?redirect=${encodeURIComponent(`/courses/${slug}/learn`)}`);
      return;
    }
    setCurrentUser(user);
    setIsAuthorized(true);

    const storageKey = getScopedStorageKey('course_progress', slug) || `sv_course_progress_${user.id}_${slug}`;

    // Read cached completed lessons for instantaneous UI feedback without flashing 0%
    try {
      const localSaved = localStorage.getItem(storageKey);
      if (localSaved) {
        const parsed = JSON.parse(localSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validUnique = Array.from(new Set<string>(parsed as string[])).filter((id) => typeof id === 'string');
          setCompletedLessonIds(validUnique);
          setCompletedCount(validUnique.length);
          if (totalLessons > 0) {
            const initialPct = validUnique.length === totalLessons ? 100 : Math.min(99.9, Math.round((validUnique.length / totalLessons) * 1000) / 10);
            setCourseProgressPct(initialPct);
          }
        }
      }
    } catch (_) {}

    async function initCourseAndProgress() {
      try {
        setIsLoadingCourse(true);
        setIsLoadingProgress(true);

        // Fetch Course Details and Student Progress CONCURRENTLY in a single parallel roundtrip
        const [fetchedCourse, progressRes] = await Promise.all([
          api.courses.getBySlug(slug).catch(() => null),
          api.student.getCourseProgress(slug).catch(() => null),
        ]);

        if (isCancelled) return;

        // 1. Resolve Course Curriculum & Modules
        const resolvedModules = getCurriculumForCourse(slug, fetchedCourse);
        setModules(resolvedModules);
        setCourse(
          fetchedCourse || {
            slug,
            title: slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            category: 'Professional Learning Cohort',
          }
        );

        const totalEligibleLessons = resolvedModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
        const allCourseLessons = resolvedModules.flatMap((m) => m.lessons || []);

        // 2. Authoritative Progress Resolution
        let confirmedLessonIds: string[] = [];
        let confirmedCount = 0;
        let confirmedPct = 0;
        let lastAccessedId: string | null = null;

        if (progressRes) {
          setIsEnrolled(progressRes.isEnrolled ?? true);
          const rawServer = (progressRes.completedLessonIds || []) as string[];
          lastAccessedId = progressRes.lastAccessedLessonId || null;

          const completedSet = new Set<string>(rawServer);

          // Synchronize both database UUIDs and canonical lesson codes ('l-1-1')
          allCourseLessons.forEach((l) => {
            if (completedSet.has(l.id) || (l.code && completedSet.has(l.code))) {
              completedSet.add(l.id);
              if (l.code) completedSet.add(l.code);
            }
          });

          const verifiedMatchCount = allCourseLessons.filter(
            (l) => completedSet.has(l.id) || (Boolean(l.code) && completedSet.has(l.code!))
          ).length;

          confirmedCount = typeof progressRes.completedCount === 'number' && progressRes.completedCount > 0
            ? Math.min(progressRes.completedCount, totalEligibleLessons)
            : (totalEligibleLessons > 0 ? verifiedMatchCount : rawServer.length);

          confirmedPct = totalEligibleLessons > 0
            ? (confirmedCount === totalEligibleLessons ? 100 : Math.min(99.9, Math.round((confirmedCount / totalEligibleLessons) * 1000) / 10))
            : (progressRes.progressPct || 0);

          confirmedLessonIds = Array.from(completedSet);

          // If confirmedCount > 0 but ID array was empty, deduce from course curriculum order
          if (confirmedLessonIds.length === 0 && confirmedCount > 0 && allCourseLessons.length > 0) {
            confirmedLessonIds = allCourseLessons.slice(0, confirmedCount).map((l) => l.id || l.code || '');
          }
        }

        // Safety fallback: if progress is still 0, check authoritative student dashboard
        if (confirmedCount === 0 || confirmedLessonIds.length === 0) {
          try {
            const dash = await api.student.getDashboard();
            const match = dash?.enrollments?.find((e: any) => e.slug === slug || e.courseSlug === slug);
            if (match && ((match.completedLessons || 0) > 0 || (match.progressPct || 0) > 0)) {
              confirmedCount = match.completedLessons || match.completedCount || 0;
              confirmedPct = match.progressPct || match.progressPercentage || 0;
              const deduced = allCourseLessons.slice(0, confirmedCount).map((l) => l.id || l.code || '');
              confirmedLessonIds = Array.from(new Set([...(match.completedLessonIds || []), ...deduced]));
            }
          } catch (_) {}
        }

        if (isCancelled) return;

        // Apply synchronized state atomically
        setCompletedLessonIds(confirmedLessonIds);
        setCompletedCount(confirmedCount);
        setCourseProgressPct(confirmedPct);

        // Update scoped local storage
        if (storageKey && confirmedLessonIds.length > 0) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(confirmedLessonIds));
          } catch (_) {}
        }

        // Activate last accessed lesson or default to first module/lesson
        if (resolvedModules.length > 0) {
          let targetModIdx = 0;
          let targetLessonIdx = 0;

          if (lastAccessedId) {
            for (let m = 0; m < resolvedModules.length; m++) {
              const lIdx = resolvedModules[m].lessons.findIndex(
                (l) => l.id === lastAccessedId || l.code === lastAccessedId
              );
              if (lIdx !== -1) {
                targetModIdx = m;
                targetLessonIdx = lIdx;
                break;
              }
            }
          }

          setActiveModuleIndex(targetModIdx);
          setActiveLessonIndex(targetLessonIdx);
          setExpandedModules({ [resolvedModules[targetModIdx].id]: true });
        }
      } catch (err) {
        console.error('Failed to initialize course learning player:', err);
      } finally {
        if (!isCancelled) {
          setIsLoadingCourse(false);
          setIsLoadingProgress(false);
        }
      }
    }

    initCourseAndProgress();

    return () => {
      isCancelled = true;
    };
  }, [slug, router]);

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleSelectLesson = (modIdx: number, lIdx: number) => {
    setActiveModuleIndex(modIdx);
    setActiveLessonIndex(lIdx);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setActiveTab('notes');
  };

  const handleToggleLesson = async (lessonIdentifier: string, markCompleted: boolean) => {
    if (!currentLesson) return;
    if (isSavingLesson) return;

    const allCourseLessons = modules.flatMap((m) => m.lessons || []);
    const targetLesson = allCourseLessons.find(
      (l) => l.id === lessonIdentifier || l.code === lessonIdentifier
    ) || currentLesson;

    const targetLessonId = targetLesson.id || targetLesson.code || lessonIdentifier;
    if (!targetLessonId) return;

    // Preserve previous state for rollback on error
    const previousCompletedIds = [...completedLessonIds];
    const previousCompletedCount = completedCount;
    const previousProgressPct = courseProgressPct;

    const storageKey = currentUser?.id
      ? (getScopedStorageKey('course_progress', slug) || `sv_course_progress_${currentUser.id}_${slug}`)
      : null;

    // Compute next completed IDs including both id and code
    const nextCompletedIds = markCompleted
      ? Array.from(new Set([
          ...completedLessonIds,
          targetLesson.id,
          ...(targetLesson.code ? [targetLesson.code] : []),
          lessonIdentifier,
        ]))
      : completedLessonIds.filter(
          (id) => id !== targetLesson.id && id !== targetLesson.code && id !== lessonIdentifier
        );

    // Compute distinct completed count against course curriculum
    const optimisticCount = allCourseLessons.filter(
      (l) => nextCompletedIds.includes(l.id) || (Boolean(l.code) && nextCompletedIds.includes(l.code!))
    ).length;

    const optimisticPct = totalLessons > 0
      ? (optimisticCount === totalLessons ? 100 : Math.min(99.9, Math.round((optimisticCount / totalLessons) * 1000) / 10))
      : 0;

    // Optimistically update UI state
    setCompletedLessonIds(nextCompletedIds);
    setCompletedCount(optimisticCount);
    setCourseProgressPct(optimisticPct);

    // Update save status indicator
    setIsSavingLesson(targetLessonId);
    setSaveStatus('SAVING');
    setActionError(null);

    // Sync with backend API (permanent database persistence)
    try {
      const res = await api.student.updateLessonProgress(slug, targetLessonId, {
        isCompleted: markCompleted,
        status: markCompleted ? 'COMPLETED' : 'NOT_STARTED',
        totalLessons,
        completionMethod: 'MANUAL_VERIFIED',
      });

      if (res && res.success) {
        const rawConfirmed: string[] = (res.completedLessonIds || nextCompletedIds) as string[];
        const confirmedSet = new Set<string>(rawConfirmed);

        allCourseLessons.forEach((l) => {
          if (confirmedSet.has(l.id) || (l.code && confirmedSet.has(l.code))) {
            confirmedSet.add(l.id);
            if (l.code) confirmedSet.add(l.code);
          }
        });

        const verifiedDistinctCount = allCourseLessons.filter(
          (l) => confirmedSet.has(l.id) || (Boolean(l.code) && confirmedSet.has(l.code!))
        ).length;

        const verifiedCount = typeof res.completedCount === 'number' && res.completedCount > 0
          ? Math.min(res.completedCount, totalLessons)
          : verifiedDistinctCount;

        const verifiedPct = totalLessons > 0
          ? (verifiedCount === totalLessons ? 100 : Math.min(99.9, Math.round((verifiedCount / totalLessons) * 1000) / 10))
          : (res.progressPct || 0);

        const confirmedIdsList = Array.from(confirmedSet);
        setCompletedLessonIds(confirmedIdsList);
        setCompletedCount(verifiedCount);
        setCourseProgressPct(verifiedPct);

        if (storageKey) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(confirmedIdsList));
          } catch (_) {}
        }
        setSaveStatus('SAVED');
        setActionNotice(markCompleted ? 'Lesson marked complete • Progress saved to database.' : 'Lesson marked incomplete • Progress updated.');
        setTimeout(() => {
          setSaveStatus('IDLE');
          setActionNotice(null);
        }, 3000);
      } else {
        throw new Error('Server reported failed progress save');
      }
    } catch (err: any) {
      // Rollback optimistic update on error
      setCompletedLessonIds(previousCompletedIds);
      setCompletedCount(previousCompletedCount);
      setCourseProgressPct(previousProgressPct);
      setSaveStatus('ERROR');
      setActionError('Failed to synchronize progress with the server. Please check your connection.');
      setTimeout(() => {
        setSaveStatus('IDLE');
        setActionError(null);
      }, 5000);
    } finally {
      setIsSavingLesson(null);
    }
  };

  const handleNextLesson = () => {
    if (!currentModule) return;
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex((prev) => prev + 1);
    } else if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex((prev) => prev + 1);
      setActiveLessonIndex(0);
      setExpandedModules((prev) => ({ ...prev, [modules[activeModuleIndex + 1].id]: true }));
    }
    setActiveTab('notes');
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((prev) => prev - 1);
    } else if (activeModuleIndex > 0) {
      setActiveModuleIndex((prev) => prev - 1);
      const prevMod = modules[activeModuleIndex - 1];
      setActiveLessonIndex(prevMod.lessons.length - 1);
    }
    setActiveTab('notes');
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAssignment(true);
    setTimeout(() => {
      setIsSubmittingAssignment(false);
      setAssignmentSubmittedSuccess(true);
      setTimeout(() => {
        setAssignmentSubmittedSuccess(false);
        setAssignmentResponse('');
        setAssignmentUrl('');
      }, 3500);
    }, 1000);
  };

  // If unauthorized or pending auth check, render secure redirect loading screen
  if (isAuthorized === false || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Protected Student Learning Portal</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Please sign in to access your course materials, cohort sessions, and verified progress tracking.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`/student/login?redirect=${encodeURIComponent(`/courses/${slug}/learn`)}`}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Sign In to Continue
          </Link>
          <Link
            href={`/courses/${slug}`}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Course Syllabus
          </Link>
        </div>
      </div>
    );
  }

  // If course not found and finished loading
  if (!isLoadingCourse && modules.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Course Curriculum Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          The requested course syllabus is either unpublished or unavailable. Please return to your active courses.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/student?tab=courses"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Back to My Courses
          </Link>
          <Link
            href="/courses"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = totalLessons > 0 ? courseProgressPct : 0;
  const currentLessonIsCompleted = isLessonDone(currentLesson);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* -------------------------------------------------------------
          TOP APPLICATION BAR (DYNAMIC UNIVERSAL HEADER)
      ------------------------------------------------------------- */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/student"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="min-w-0">
            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-wider block truncate">
              {course?.category || 'StudentVerse LMS'}
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
              {course?.title || 'Course'} &bull; {currentModule?.title || 'Curriculum'}
            </h1>
          </div>
        </div>

        {/* Dynamic Course Progress Indicator */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 font-medium block">
              Curriculum Progress: {completedCount} / {totalLessons} Lessons
            </span>
            <span className="text-xs font-black text-emerald-400">
              {totalLessons > 0 ? `${progressPercentage}% Completed` : 'Content Ready'}
            </span>
          </div>
          <div className="w-20 sm:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          MAIN TWO-COLUMN WORKSPACE
      ------------------------------------------------------------- */}
      <div className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: 72% LEARNING WORKSPACE */}
          <div className="lg:col-span-8 flex flex-col space-y-6 min-w-0">

            {/* Audit Mode Notice if applicable */}
            {!isEnrolled && !isLoadingProgress && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-2xl text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>You are previewing this course syllabus in audit mode. Enrol to save verified completions and receive certificate credentials.</span>
                </div>
                <Link
                  href={`/courses/${slug}`}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex-shrink-0"
                >
                  Enrol Now
                </Link>
              </div>
            )}

            {/* Notification Toasts */}
            {actionNotice && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{actionNotice}</span>
              </div>
            )}
            {actionError && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {/* LESSON PLAYER CANVAS */}
            <div className="aspect-video bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col items-center justify-center p-6 text-center group">
              {currentLesson?.videoUrl ? (
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="space-y-4 max-w-lg">
                  <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {currentLesson?.type === 'LIVE_SESSION' ? (
                      <Video className="w-9 h-9" />
                    ) : currentLesson?.type === 'PROJECT' ? (
                      <FileText className="w-9 h-9" />
                    ) : (
                      <PlayCircle className="w-9 h-9" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {currentLesson?.type?.replace('_', ' ') || 'LESSON'} &bull; {currentLesson?.duration}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {currentLesson?.title}
                    </h2>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      {currentModule?.title} &bull; {course?.title}
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800">
                      100% Live Instructor-Led Cohort Session
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* LESSON CONTROL BAR */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {currentLessonIsCompleted ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Lesson Completed</span>
                    </div>
                    <button
                      onClick={() => handleToggleLesson(currentLesson?.id || currentLesson?.code || '', false)}
                      disabled={isSavingLesson === (currentLesson?.id || currentLesson?.code)}
                      className="text-xs font-semibold text-slate-400 hover:text-rose-400 underline underline-offset-4 transition-colors"
                    >
                      {isSavingLesson === (currentLesson?.id || currentLesson?.code) ? 'Updating...' : 'Mark as Incomplete'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleLesson(currentLesson?.id || currentLesson?.code || '', true)}
                    disabled={isSavingLesson === (currentLesson?.id || currentLesson?.code)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    {isSavingLesson === (currentLesson?.id || currentLesson?.code) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                    )}
                    <span>Mark as Complete</span>
                  </button>
                )}
              </div>

              {/* Navigation: Previous and Next Lesson */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-40 disabled:pointer-events-none border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNextLesson}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black border border-slate-700 shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* WORKSPACE NAVIGATION TABS */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'notes'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Curriculum Notes</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Knowledge Check</span>
              </button>

              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'assignment'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Module Deliverable</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Resources &amp; Templates</span>
              </button>
            </div>

            {/* TAB 1: CURRICULUM NOTES & STUDY GUIDE */}
            {activeTab === 'notes' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Lesson Study Notes &amp; Guidelines</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentLesson?.notes || 'Comprehensive study guidelines and reference materials for this live cohort class.'}
                  </p>
                </div>

                {/* AI Toolstack */}
                {currentLesson?.aiTools && currentLesson.aiTools.length > 0 && (
                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                      Required AI Tools &amp; Platforms for This Class:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentLesson.aiTools.map((tool: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INTERACTIVE KNOWLEDGE CHECK (QUIZ) */}
            {activeTab === 'quiz' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                {currentLesson?.quiz ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Lesson Concept Quiz
                      </span>
                      <span className="text-[11px] text-slate-400">1 Question &bull; Instant Feedback</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {currentLesson.quiz.question}
                    </h4>

                    <div className="space-y-2.5 pt-2">
                      {currentLesson.quiz.options.map((option: string, oIdx: number) => {
                        const isSelected = selectedQuizOption === oIdx;
                        const isCorrect = oIdx === currentLesson.quiz?.correctIndex;
                        let optionStyles = 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            optionStyles = 'border-emerald-500/80 bg-emerald-500/10 text-emerald-200';
                          } else if (isSelected && !isCorrect) {
                            optionStyles = 'border-rose-500/80 bg-rose-500/10 text-rose-200';
                          }
                        } else if (isSelected) {
                          optionStyles = 'border-indigo-500 bg-indigo-500/10 text-white';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => setSelectedQuizOption(oIdx)}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 ${optionStyles}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={selectedQuizOption === null}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in">
                        <div className="flex items-center gap-2">
                          {selectedQuizOption === currentLesson.quiz.correctIndex ? (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4" /> Incorrect Choice
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {currentLesson.quiz.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No knowledge check quiz attached to this lesson.</p>
                )}
              </div>
            )}

            {/* TAB 3: MODULE PRACTICAL ASSIGNMENT */}
            {activeTab === 'assignment' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div className="pb-4 border-b border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Practical Evaluated Milestone
                  </span>
                  <h3 className="text-lg font-black text-white">{currentModule?.assignment?.title || `${currentModule?.title} Milestone`}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {currentModule?.assignment?.instructions || 'Execute the lab requirements, verify against evaluation criteria, and upload your deliverable.'}
                  </p>
                </div>

                {/* Deliverables List */}
                {currentModule?.assignment?.deliverables && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Mandatory Deliverables:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {currentModule.assignment.deliverables.map((del: string, dIdx: number) => (
                        <div
                          key={dIdx}
                          className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submission Form */}
                <form onSubmit={handleSubmitAssignment} className="space-y-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Submit Your Practical Work for Trainer Review
                  </h4>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                      Live Project / Document URL (Google Drive, Loom, GitHub, Looker Studio):
                    </label>
                    <input
                      type="url"
                      value={assignmentUrl}
                      onChange={(e) => setAssignmentUrl(e.target.value)}
                      placeholder="https://docs.google.com/... or https://github.com/..."
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                      Executive Summary / Technical Notes:
                    </label>
                    <textarea
                      rows={3}
                      value={assignmentResponse}
                      onChange={(e) => setAssignmentResponse(e.target.value)}
                      placeholder="Outline your approach, tools used, key findings, and outcomes achieved..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingAssignment || assignmentSubmittedSuccess}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2"
                    >
                      {isSubmittingAssignment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : assignmentSubmittedSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                          <span>Submitted for Evaluation!</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Submit Deliverable</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: RESOURCES & TEMPLATES */}
            {activeTab === 'resources' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Downloadable Templates &amp; SOPs
                </h3>
                {currentLesson?.resources && currentLesson.resources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res: any, rIdx: number) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block truncate group-hover:text-indigo-300">
                              {res.title}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase">{res.type} Resource</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Class notes and slides are available in the Curriculum Notes tab.</p>
                )}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: DYNAMIC UNIVERSAL CURRICULUM ACCORDION SIDEBAR */}
          <aside className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col space-y-4 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Course Syllabus
                </span>
                <h3 className="text-sm font-black text-white">All {modules.length} Modules</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                {totalLessons} Lessons
              </span>
            </div>

            {/* Overall Syllabus Progress Bar */}
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Your Progress</span>
                <span className="font-bold text-emerald-400">{progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Module List Accordion */}
            <div className="space-y-3">
              {modules.map((mod, modIdx) => {
                const isExpanded = !!expandedModules[mod.id];
                const isCurrentModule = activeModuleIndex === modIdx;
                const modLessons = mod.lessons || [];
                const modCompletedCount = modLessons.filter(isLessonDone).length;
                const modTotalLessons = modLessons.length;
                const isModCompleted = modTotalLessons > 0 && modCompletedCount >= modTotalLessons;
                const modProgressPct = modTotalLessons > 0
                  ? (isModCompleted ? 100 : Math.min(99, Math.round((modCompletedCount / modTotalLessons) * 100)))
                  : 0;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border transition-all ${
                      isCurrentModule
                        ? 'border-indigo-500/50 bg-slate-800/40 shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    {/* Module Header Toggle */}
                    <button
                      onClick={() => toggleModuleExpand(mod.id)}
                      className="w-full p-3.5 text-left flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-white block leading-snug truncate">{mod.title}</span>
                          {isModCompleted && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex-shrink-0">
                              <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                              <span>100%</span>
                            </span>
                          )}
                        </div>

                        {/* Dynamic Module Progress Stats */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span>{modCompletedCount} of {modTotalLessons} Completed</span>
                          <span className={isModCompleted ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'}>
                            {modProgressPct}%
                          </span>
                        </div>

                        {/* Dynamic Module Mini Progress Bar */}
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isModCompleted ? 'bg-emerald-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${modProgressPct}%` }}
                          />
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>

                    {/* Lessons list with Interactive Checkboxes */}
                    {isExpanded && (
                      <div className="p-2 pt-0 space-y-1 border-t border-slate-800/60 divide-y divide-slate-800/40">
                        {mod.lessons.map((lesson, lIdx) => {
                          const isCurrent = activeModuleIndex === modIdx && activeLessonIndex === lIdx;
                          const isCompleted = isLessonDone(lesson);
                          const lessonKey = lesson.id || lesson.code || `${mod.id}-${lIdx}`;

                          return (
                            <div
                              key={lessonKey}
                              onClick={() => handleSelectLesson(modIdx, lIdx)}
                              className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                                isCurrent
                                  ? 'bg-indigo-600/90 text-white font-bold shadow'
                                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
                              }`}
                            >
                              {/* Interactive Accessible Checkbox */}
                              <div
                                role="checkbox"
                                aria-checked={isCompleted}
                                aria-label={`Mark ${lesson.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleLesson(lesson.id || lesson.code || '', !isCompleted);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleToggleLesson(lesson.id || lesson.code || '', !isCompleted);
                                  }
                                }}
                                title={
                                  isCompleted
                                    ? 'Completed • Click to mark as incomplete'
                                    : 'Click to mark as complete'
                                }
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer flex-shrink-0 mt-0.5 ${
                                  isCompleted
                                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm'
                                    : 'border-slate-600 bg-slate-950/80 hover:border-indigo-400 text-transparent'
                                } ${isSavingLesson === (lesson.id || lesson.code) ? 'opacity-50 pointer-events-none' : ''}`}
                              >
                                {isSavingLesson === (lesson.id || lesson.code) ? (
                                  <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                                ) : isCompleted ? (
                                  <Check className="w-3 h-3 stroke-[3]" />
                                ) : null}
                              </div>

                              <div className="flex-1 overflow-hidden">
                                <span className="block truncate">{lesson.title}</span>
                                <span
                                  className={`text-[10px] block mt-0.5 ${
                                    isCurrent ? 'text-indigo-200' : 'text-slate-500'
                                  }`}
                                >
                                  {lesson.type?.replace('_', ' ')} &bull; {lesson.duration}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
