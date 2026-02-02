-- Create a new table for manual ID cards
create table manual_id_cards (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  company_name text not null,
  role text not null check (role in ('Founder', 'Investor', 'Exhibitor', 'Visitor')),
  email text,
  phone text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table manual_id_cards enable row level security;

-- Create a policy to allow read/write access for authenticated users (or just admins if you have roles)
-- For simplicity in this context, assuming standard authenticated access is fine, or restricted to service_role mostly.
-- Adjust this based on your specific admin RLS setup.
create policy "Enable all access for authenticated users" 
on manual_id_cards 
for all 
using (auth.role() = 'authenticated') 
with check (auth.role() = 'authenticated');
