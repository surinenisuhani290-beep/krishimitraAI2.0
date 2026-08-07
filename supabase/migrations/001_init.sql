-- Supabase migrations for Krishi Mitra AI 2.0 (NEW)

-- Note: Apply this file on your Supabase project using the SQL editor.

create extension if not exists pgcrypto;

-- expert_profiles
create table if not exists expert_profiles (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  mobile text,
  email text,
  role text,
  organization text,
  qualification text,
  expertise text,
  experience int,
  state text,
  district text,
  service_areas text[],
  languages text[],
  remote_assistance boolean default true,
  physical_camp boolean default false,
  availability text,
  bio text,
  verification_status text default 'PENDING',
  created_at timestamptz default now()
);

-- krishi_seva_requests
create table if not exists krishi_seva_requests (
  id uuid default gen_random_uuid() primary key,
  farmer_id uuid,
  title text,
  crop text,
  description text,
  state text,
  district text,
  village text,
  image_url text,
  preferred_language text,
  contact_preference text,
  priority text default 'NORMAL',
  status text default 'PENDING',
  assigned_expert uuid,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- camp_events
create table if not exists camp_events (
  id uuid default gen_random_uuid() primary key,
  title text,
  organizer text,
  date date,
  start_time time,
  end_time time,
  village text,
  district text,
  state text,
  location text,
  topics text[],
  services text[],
  experts uuid[],
  registration_limit int,
  contact text,
  description text,
  created_at timestamptz default now()
);

-- women_fpo_directory
create table if not exists women_fpo_directory (
  id uuid default gen_random_uuid() primary key,
  name text,
  location text,
  crops text[],
  members int,
  contact text,
  services text[],
  products text[],
  verification_status text default 'DEMO',
  created_at timestamptz default now()
);

-- channel tables
create table if not exists channel_conversations (
  id uuid default gen_random_uuid() primary key,
  channel text,
  contact text,
  farmer_id uuid,
  last_message text,
  updated_at timestamptz default now()
);

create table if not exists channel_messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references channel_conversations(id) on delete cascade,
  direction text,
  text text,
  raw jsonb,
  created_at timestamptz default now()
);
