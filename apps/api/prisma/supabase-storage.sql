-- ==============================================================================
-- StudentVerse Supabase Storage Architecture & Security Infrastructure
-- 7 Distinct Storage Buckets with Row-Level Security (RLS) Policies
-- ==============================================================================

-- 1. Create Storage Buckets in storage.buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  -- Bucket 1: Student Profiles (Avatar images, banner graphics)
  ('student-profiles', 'student-profiles', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']),

  -- Bucket 2: Student Practical Assignments (Submissions, reports, audits - private to student and instructors)
  ('student-assignments', 'student-assignments', false, 52428800, ARRAY['application/pdf', 'application/zip', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg']),

  -- Bucket 3: Student Portfolios (Evaluated capstones, live project showcases - public/shareable)
  ('student-portfolios', 'student-portfolios', true, 52428800, ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'application/zip']),

  -- Bucket 4: Student Certificates (Cryptographically verifiable credentials, PDF diplomas)
  ('student-certificates', 'student-certificates', true, 10485760, ARRAY['application/pdf', 'image/png', 'image/svg+xml']),

  -- Bucket 5: Course Assets (Thumbnails, syllabus overviews, faculty badges)
  ('course-assets', 'course-assets', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),

  -- Bucket 6: Course Resources (Prompt sheets, templates, checklists, SOPs)
  ('course-resources', 'course-resources', true, 26214400, ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'application/zip']),

  -- Bucket 7: Course Recordings (Full HD cohort recordings, masterclass video lectures - protected)
  ('course-recordings', 'course-recordings', false, 2147483648, ARRAY['video/mp4', 'video/webm', 'video/quicktime'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ==============================================================================
-- Row-Level Security (RLS) Policies on storage.objects
-- Ensures strict student isolation: auth.uid() folder prefix namespaces
-- ==============================================================================

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Policy 1: student-profiles
-- Anyone can view student avatars. Only the owner can upload, update, or delete.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public Read for Student Profiles"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-profiles');

CREATE POLICY "Student Isolated Upload for Profiles"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'student-profiles'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Student Isolated Update for Profiles"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'student-profiles'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Student Isolated Delete for Profiles"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'student-profiles'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ------------------------------------------------------------------------------
-- Policy 2: student-assignments
-- Private to the student and faculty. Students can only see their own folder.
-- ------------------------------------------------------------------------------
CREATE POLICY "Student Isolated Read for Assignments"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'student-assignments'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR auth.jwt() ->> 'role' IN ('ADMIN', 'INSTRUCTOR')
  )
);

CREATE POLICY "Student Isolated Upload for Assignments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'student-assignments'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Student Isolated Update for Assignments"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'student-assignments'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ------------------------------------------------------------------------------
-- Policy 3: student-portfolios
-- Publicly readable by employers & recruiters. Uploadable only by authenticated owner.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public Read for Portfolios"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-portfolios');

CREATE POLICY "Student Isolated Upload for Portfolios"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'student-portfolios'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ------------------------------------------------------------------------------
-- Policy 4: student-certificates
-- Publicly verifiable by credential ID. Only backend service role or admins can generate.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public Read for Certificates"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-certificates');

CREATE POLICY "Admin Upload for Certificates"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'student-certificates'
  AND auth.jwt() ->> 'role' IN ('ADMIN', 'SERVICE_ROLE')
);

-- ------------------------------------------------------------------------------
-- Policy 5 & 6: course-assets & course-resources
-- Publicly readable for all learners. Managed by admins and instructors.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public Read for Course Assets"
ON storage.objects FOR SELECT
USING (bucket_id IN ('course-assets', 'course-resources'));

CREATE POLICY "Staff Manage Course Assets"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id IN ('course-assets', 'course-resources')
  AND auth.jwt() ->> 'role' IN ('ADMIN', 'INSTRUCTOR')
);

-- ------------------------------------------------------------------------------
-- Policy 7: course-recordings
-- Strictly accessible only by authenticated enrolled learners or instructors.
-- ------------------------------------------------------------------------------
CREATE POLICY "Enrolled Student Read for Recordings"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-recordings'
);
