
-- Create pitching_profiles table
CREATE TABLE IF NOT EXISTS pitching_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  founder_name TEXT,
  founder_phone TEXT,
  company_name TEXT NOT NULL,
  website TEXT,
  company_linkedin TEXT,
  domain TEXT,
  domain_other_spec TEXT,
  stage TEXT,
  earning_status TEXT,
  establishment_year INTEGER,
  turnover TEXT,
  net_profit TEXT,
  it_returns_filed BOOLEAN DEFAULT FALSE,
  is_audited BOOLEAN DEFAULT FALSE,
  pitch_deck_url TEXT,
  description TEXT,
  problem_description TEXT,
  reference TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  payment_status TEXT DEFAULT 'unpaid',
  stripe_session_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pitching_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own pitching profile"
  ON pitching_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pitching profile"
  ON pitching_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitching profile"
  ON pitching_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pitching_profiles_updated_at
  BEFORE UPDATE ON pitching_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
