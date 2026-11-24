'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { getAuthUser, AuthUser } from '../lib/auth';
import { api } from '../lib/api';

interface EnrollmentActionButtonProps {
  slug: string;
  courseTitle: string;
}

export const EnrollmentActionButton: React.FC<EnrollmentActionButtonProps> = ({ slug, courseTitle }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authUser = getAuthUser();
    setUser(authUser);

    if (authUser && authUser.id) {
      // Verify with database via API
      api.student
        .getEnrollments()
        .then((enrollments) => {
          if (Array.isArray(enrollments)) {
            const hasEnrollment = enrollments.some(
              (e: any) => e.course?.slug === slug || e.slug === slug
            );
            if (hasEnrollment) {
              setIsEnrolled(true);
            }
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [slug]);

  const handleEnrollNow = async () => {
    if (!user) {
      router.push(`/student/login?redirect=/courses/${slug}`);
      return;
    }

    setIsEnrolling(true);
    setEnrollError(null);
    try {
      const res = await api.student.enroll(slug);
      if (res && res.success) {
        setIsEnrolled(true);
        router.push(`/courses/${slug}/learn`);
      } else {
        throw new Error(res?.message || 'Enrolment could not be confirmed.');
      }
    } catch (err: any) {
      setEnrollError(err?.message || 'Failed to complete enrolment. Please verify server connection.');
    } finally {
      setIsEnrolling(false);
    }
  };

  // Case 1: Guest (not logged in)
  if (!user) {
    return (
      <Link
        href={`/student/login?redirect=/courses/${slug}`}
        className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all flex items-center justify-center gap-2"
      >
        <span>Sign In to Enrol</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  // Case 2: Already enrolled student
  if (isEnrolled) {
    return (
      <Link
        href={`/courses/${slug}/learn`}
        className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
        <span>Continue Learning</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  // Case 3: Logged in student without enrollment
  return (
    <div className="space-y-2 w-full">
      <button
        onClick={handleEnrollNow}
        disabled={isEnrolling}
        className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isEnrolling ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Enrolment...</span>
          </>
        ) : (
          <>
            <span>Enrol in Live Cohort</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {enrollError && (
        <p className="text-[11px] text-rose-600 font-semibold text-center leading-tight">
          {enrollError}
        </p>
      )}
    </div>
  );
};

export default EnrollmentActionButton;
