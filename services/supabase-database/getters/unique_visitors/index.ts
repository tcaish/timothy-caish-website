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

/**
 * Checks if the given visitor is unique.
 * @param deviceId The Mixpanel's distinct ID for the user.
 * @returns boolean
 */
export async function isVisitorUnique(deviceId: string) {
  const response = await supabaseClient
    .from('unique_visitors')
    .select('id')
    .match({
      device_id: deviceId
    });

  return !response.error && response.data.length === 0;
}
