import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

/**
 * Gets all the portfolio items.
 * @returns All the portfolio items.
 */
export async function getPortfolioItems() {
  const { data, error } = await supabaseClient
    .from("portfolio_items")
    .select("*");

  // If there was an error
  if (error) {
    Bugsnag.notify(
      `getPortfolioItems() error: ${JSON.stringify(error)}`,
    );
    return [];
  }

  return data;
}
