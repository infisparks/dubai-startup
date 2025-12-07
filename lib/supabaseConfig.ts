// supabaseConfig.ts

import { createClient } from "@supabase/supabase-js"

// Use environment variables in a real application, but for this example,
// I'll use the provided keys directly.

const supabaseUrl = "https://invest.infispark.in"
const supabaseAnonKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTA0MzI4MCwiZXhwIjo0OTIwNzE2ODgwLCJyb2xlIjoiYW5vbiJ9.fZDvmehDKDb11mcxjro4g81OpOgJ1VHKU6hSIp5O4Gw"

// Create a single Supabase client for the application
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// You should install the required package:
// npm install @supabase/supabase-js