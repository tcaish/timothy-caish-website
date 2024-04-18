import { supabaseClient } from "@/services/supabase";
import { isVisitorUnique } from "@/services/supabase-database/getters/unique_visitors";

/**
 * Adds a unique visitor to the database.
 * @param hashedIpv6Addr The hashed IPV6 address of the user.
 */
export async function addUniqueVisitor(hashedIpv6Addr: string) {
  const isUnique = await isVisitorUnique(hashedIpv6Addr);

  // If the visitor is not unique, bail out
  if (!isUnique) return;

  // Add the unique visitor to the database
  await supabaseClient.from("unique_visitors").insert({
    hashed_ipv6: hashedIpv6Addr,
  });
}
