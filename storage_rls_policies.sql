-- Storage RLS Policies for cabinet-documents bucket
-- Run this in Supabase SQL Editor

-- Allow authenticated users to UPLOAD files to their own folder
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'cabinet-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to VIEW their own documents
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'cabinet-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to DELETE their own documents
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'cabinet-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow admins to view ALL documents (for reviewing applications)
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'cabinet-documents'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'admin')
);
