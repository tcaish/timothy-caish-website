import { supabaseClient } from '@/services/supabase';

/**
 * Gets the unique visitors count from the unique_visitors table.
 */
export async function getTotalUniqueVisitors() {
  const response = await supabaseClient
    .from('unique_visitors')
    .select('*', { count: 'exact', head: true });

  return response.error || response.count == null ? 0 : response.count;
}
