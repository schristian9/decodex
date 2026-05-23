-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone,
  full_name text,
  email text
);

-- Create lab_reports table
create table public.lab_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  created_at timestamp with time zone default now() not null,
  file_name text not null,
  file_url text not null,
  summary text not null,
  interpretation text not null,
  suggested_questions jsonb default '[]'::jsonb not null
);

-- Create biomarkers table
create table public.biomarkers (
  id uuid default gen_random_uuid() primary key,
  report_id uuid references public.lab_reports on delete cascade not null,
  name text not null,
  value text not null,
  unit text not null,
  status text not null, -- 'Optimal', 'Normal', 'Borderline', 'High', 'Low'
  category text not null, -- 'Metabolic', 'Vitamins', 'Lipids', 'Thyroid', 'Other'
  explanation text -- Plain-language clinical explanation
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.lab_reports enable row level security;
alter table public.biomarkers enable row level security;

-- Create security policies
-- Profiles: Users can view and update their own profile
create policy "Allow users to view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Allow users to update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Lab Reports: Users can manage their own lab reports
create policy "Allow users to manage own lab reports" on public.lab_reports
  for all using (auth.uid() = user_id);

-- Biomarkers: Users can manage biomarkers related to their own reports
create policy "Allow users to manage own biomarkers" on public.biomarkers
  for all using (
    exists (
      select 1 from public.lab_reports
      where lab_reports.id = biomarkers.report_id
      and lab_reports.user_id = auth.uid()
    )
  );

-- Create trigger to automatically create a profile for new signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Patient'),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
