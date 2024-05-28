import { supabaseClient } from "@/services/supabase";

/**
 * Gets the count of all the portfolio item comments.
 * @returns The count of all the portfolio item comments.
 */
export async function getPortfolioItemCommentsCount(id: number) {
  const response = await supabaseClient
    .from("portfolio_item_comments")
    .select("id", { count: "exact", head: true });

  return response.error || response.count == null ? 0 : response.count;
}
