-- Security Fix: Restrict user self-update of sensitive columns
-- Run this in Supabase SQL Editor AFTER the original admin_rls_migration.sql

-- 1. Drop the existing permissive user update policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 2. Re-create it with column restrictions:
--    Users can update their OWN profile, but CANNOT change 'status' or 'membership_id'.
--    These columns can only be changed by admins (via the "Admins can update all profiles" policy).
CREATE POLICY "Users can update own profile (restricted)"
ON public.profiles FOR UPDATE
USING ( auth.uid() = id )
WITH CHECK (
  auth.uid() = id
  AND status = (SELECT p.status FROM public.profiles p WHERE p.id = auth.uid())
  AND (
    membership_id IS NOT DISTINCT FROM (SELECT p.membership_id FROM public.profiles p WHERE p.id = auth.uid())
  )
);

-- This ensures:
-- ✅ Users can update: full_name, city, avatar_url, updated_at
-- ❌ Users CANNOT change: status (applicant→admin), membership_id
-- ✅ Admins CAN change anything (via the separate admin policy)
