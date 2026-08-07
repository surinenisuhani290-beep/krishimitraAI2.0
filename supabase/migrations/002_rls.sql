-- RLS and policies for Krishi Mitra AI 2.0

-- Enable RLS on tables and add conservative policies.

-- Note: Adjust role checks depending on your auth setup. These are examples
-- which assume Supabase Auth with "authenticated" role and using auth.uid

-- Enable RLS for expert_profiles
alter table if exists expert_profiles enable row level security;

create policy "public_select_experts" on expert_profiles
  for select using (true);

create policy "authenticated_insert_experts" on expert_profiles
  for insert to authenticated with check (true);

create policy "experts_update_own" on expert_profiles
  for update to authenticated using (auth.uid() = null) with check (true);

-- RLS for krishi_seva_requests
alter table if exists krishi_seva_requests enable row level security;

create policy "insert_requests_authenticated" on krishi_seva_requests
  for insert to authenticated with check (true);

create policy "select_request_own_or_admin" on krishi_seva_requests
  for select using (auth.uid()::text = farmer_id::text OR current_setting('request.is_admin', true) = 'true');

create policy "update_request_assignee" on krishi_seva_requests
  for update using (current_setting('request.is_admin', true) = 'true' OR auth.uid()::text = farmer_id::text) with check (true);

-- RLS for channel messages
alter table if exists channel_messages enable row level security;
create policy "insert_messages_authenticated" on channel_messages
  for insert to authenticated with check (true);
create policy "select_channel_messages" on channel_messages
  for select using (true);

-- Camp events
alter table if exists camp_events enable row level security;
create policy "select_camps" on camp_events for select using (true);
create policy "insert_camps_admin" on camp_events for insert using (current_setting('request.is_admin', true) = 'true');

-- women_fpo_directory
alter table if exists women_fpo_directory enable row level security;
create policy "select_fpo" on women_fpo_directory for select using (true);
create policy "insert_fpo_admin" on women_fpo_directory for insert using (current_setting('request.is_admin', true) = 'true');
