import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

/**
 * Gets the unique visitors count from the unique_visitors table.
 * @returns The total number of unique visitors.
 */
export async function getTotalUniqueVisitors() {
  const { count, error } = await supabaseClient
    .from("unique_visitors")
    .select("id", { count: "exact", head: true });

  // If there was an error
  if (error) {
    Bugsnag.notify(
      `getTotalUniqueVisitors() error: ${JSON.stringify(error)}`,
    );
    return 0;
  }

  return count == null ? 0 : count;
}

/**
 * Checks if the given visitor is unique.
 * @param hashedIpv6Addr The hashed IPV6 address of the user.
 * @returns boolean indicating if the visitor is unique.
 */
export async function isVisitorUnique(hashedIpv6Addr: string) {
  const { data, error } = await supabaseClient
    .from("unique_visitors")
    .select("id")
    .match({
      hashed_ipv6: hashedIpv6Addr,
    });

  // If there was an error
  if (error) {
    Bugsnag.notify(
      `isVisitorUnique() error: ${JSON.stringify(error)}`,
    );
    return false;
  }

  return data.length === 0;
}
