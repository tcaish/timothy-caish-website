import { supabaseClient } from "@/services/supabase";

/**
 * Gets the unique visitors count from the unique_visitors table.
 * @returns The total number of unique visitors.
 */
export async function getTotalUniqueVisitors() {
  const response = await supabaseClient
    .from("unique_visitors")
    .select("*", { count: "exact", head: true });

  return response.error || response.count == null ? 0 : response.count;
}

/**
 * Checks if the given visitor is unique.
 * @param hashedIpv6Addr The hashed IPV6 address of the user.
 * @returns boolean indicating if the visitor is unique.
 */
export async function isVisitorUnique(hashedIpv6Addr: string) {
  const response = await supabaseClient
    .from("unique_visitors")
    .select("id")
    .match({
      hashed_ipv6: hashedIpv6Addr,
    });

  return !response.error && response.data.length === 0;
}
