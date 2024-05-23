import { supabaseClient } from "@/services/supabase";

/**
 * Gets all the portfolio items.
 * @returns All the portfolio items.
 */
export async function getPortfolioItems() {
  const response = await supabaseClient
    .from("portfolio_items")
    .select("*");

  return response.error ? [] : response.data;
}
