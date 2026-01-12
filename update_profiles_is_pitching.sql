
-- Add is_pitching to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_pitching BOOLEAN DEFAULT FALSE;
