import { supabaseClient } from '@/services/supabase';
import { ZustandStore } from '@/zustand/store';

// Creates a realtime listener for unique visitors table
export function createUniqueVisitorsListener(store: ZustandStore) {
  return supabaseClient.channel('unique-visitors-channel').on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'unique_visitors'
    },
    (payload) => {
      store.setTotalUniqueVisitors(store.totalUniqueVisitors + 1);
    }
  );
}
