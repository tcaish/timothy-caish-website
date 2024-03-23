import { supabaseClient } from '@/services/supabase';
import { isVisitorUnique } from '@/services/supabase-database/getters/unique_visitors';

/**
 * Adds a unique visitor to the database.
 * @param deviceId The Mixpanel's distinct ID for the user.
 */
export async function addUniqueVisitor(deviceId: string) {
  const isUnique = await isVisitorUnique(deviceId);

  // If the visitor is not unique, bail out
  if (!isUnique) return;

  // Add the unique visitor to the database
  await supabaseClient.from('unique_visitors').insert({
    device_id: deviceId
  });
}
