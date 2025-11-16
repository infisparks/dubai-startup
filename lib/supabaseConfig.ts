// supabaseConfig.ts

import { createClient } from "@supabase/supabase-js"

// Use environment variables in a real application, but for this example,
// I'll use the provided keys directly.

const supabaseUrl = "https://tiehqudenyssuvosajyu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZWhxdWRlbnlzc3V2b3Nhanl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NDcyNDUsImV4cCI6MjA3ODMyMzI0NX0.I0TgBtpY79rpKmix21mnJxhQ4qC07u9odaJ5sOUaCSg"

// Create a single Supabase client for the application
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// You should install the required package:
// npm install @supabase/supabase-js