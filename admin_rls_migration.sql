-- Admin Panel RLS Policies
-- Run this in Supabase SQL Editor

-- 1. Admins can view ALL applications
CREATE POLICY "Admins can view all applications"
ON public.applications FOR SELECT
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'admin')
);

-- 2. Admins can update ALL applications (approve/reject)
CREATE POLICY "Admins can update all applications"
ON public.applications FOR UPDATE
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'admin')
);

-- 3. Admins can update ALL profiles (change user status to 'member')
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'admin')
);
