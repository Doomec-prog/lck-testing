-- Create tables for Personal Cabinet

-- 1. Profiles Table (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  city text,
  avatar_url text,
  status text check (status in ('applicant', 'member', 'admin')) default 'applicant',
  membership_id text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- 2. Applications Table (Wizard Submissions)
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  full_name text,
  city text,
  email text,
  phone text,
  education text,
  profession text,
  filmography_links jsonb default '[]'::jsonb,
  documents_urls jsonb default '{}'::jsonb,
  status text check (status in ('draft', 'submitted', 'approved', 'rejected', 'changes_requested')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Storage Buckets (Run this in SQL Editor if bucket doesn't exist)
insert into storage.buckets (id, name, public) 
values ('cabinet-documents', 'cabinet-documents', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 4. RLS Policies (Security)
alter table public.profiles enable row level security;
alter table public.applications enable row level security;

-- Profiles: Users can view/edit their own profile
create policy "Public profiles are viewable by everyone" 
on public.profiles for select using ( true );

create policy "Users can update own profile" 
on public.profiles for update using ( auth.uid() = id );

create policy "Users can insert own profile" 
on public.profiles for insert with check ( auth.uid() = id );

-- Applications: Users can view/edit their own applications
create policy "Users can view own applications" 
on public.applications for select using ( auth.uid() = user_id );

create policy "Users can insert own applications" 
on public.applications for insert with check ( auth.uid() = user_id );

create policy "Users can update own applications" 
on public.applications for update using ( auth.uid() = user_id );
