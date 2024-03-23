import { supabaseClient } from '@/services/supabase';

/**
 * Adds a unique visitor to the database.
 * @param deviceId The Mixpanel's distinct ID for the user.
 */
export async function addUniqueVisitor(deviceId: string) {
  try {
    await supabaseClient.from('unique_visitors').insert({
      device_id: deviceId
    });
  } catch (err) {
    // This will happen if the user has already viewed this page, so
    // we can ignore it.
  }
}
