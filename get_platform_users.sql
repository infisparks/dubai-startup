
-- Run this SQL in your Supabase SQL Editor to enable fetching emails directly from the auth table.
-- This function skips RLS and schema restrictions to provide an admin-level view of users.

CREATE OR REPLACE FUNCTION get_platform_users()
RETURNS TABLE (
  id uuid,
  full_name text,
  email text,
  is_investor boolean,
  is_speaker boolean,
  is_startup boolean,
  is_exhibitor boolean,
  updated_at timestamptz
) 
LANGUAGE plpgsql
SECURITY DEFINER -- Essential: bypasses RLS and schema restrictions
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Unknown User')::text as full_name,
    u.email::text, -- From auth.users
    COALESCE(p.is_investor, false) as is_investor,
    COALESCE(p.is_speaker, false) as is_speaker,
    COALESCE(p.is_startup, false) as is_startup,
    COALESCE(p.is_exhibitor, false) as is_exhibitor,
    COALESCE(p.updated_at, u.created_at) as updated_at
  FROM public.profiles p
  JOIN auth.users u ON p.id = u.id
  ORDER BY p.updated_at DESC;
END;
$$;

-- Grant access to the authenticated users (protected by your frontend admin check)
GRANT EXECUTE ON FUNCTION get_platform_users TO authenticated;
GRANT EXECUTE ON FUNCTION get_platform_users TO service_role;
