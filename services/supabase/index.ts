import { Database } from '@/constants/types/supabase';
import { createBrowserClient } from '@supabase/ssr';

const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export const supabaseClient = createClient();
