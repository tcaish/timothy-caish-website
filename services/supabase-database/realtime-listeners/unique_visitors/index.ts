import { supabaseClient } from '@/services/supabase';
import { ZustandStore } from '@/zustand/store';

// Creates a realtime listener for unique visitors table
export function createUniqueVisitorsListener(store: ZustandStore) {
  return supabaseClient.channel('notifications-channel').on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'unique_visitors'
    },
    (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          store.setTotalUniqueVisitors(store.totalUniqueVisitors + 1);
          break;
        case 'DELETE':
          store.setTotalUniqueVisitors(store.totalUniqueVisitors - 1);
          break;
        default:
          break;
      }
    }
  );
}
