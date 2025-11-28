import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("❌ VITE_SUPABASE_URL está faltando no .env.local");
}

if (!supabaseKey) {
  throw new Error("❌ VITE_SUPABASE_ANON_KEY está faltando no .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
