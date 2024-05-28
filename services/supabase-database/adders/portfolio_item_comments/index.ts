import { supabaseClient } from "@/services/supabase";

/**
 * Adds a comment to the given portfolio item.
 */
export async function addPortfolioItemComment(
  comment: string,
  id: number,
  name: string,
) {
  const updatedName = name || null;

  const { error } = await supabaseClient
    .from("portfolio_item_comments")
    .insert(
      {
        comment,
        portfolio_item_id: id,
        name: updatedName,
      },
    );

  return error == null;
}
