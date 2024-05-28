import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

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

  // If there was an error
  if (error) {
    Bugsnag.notify(
      `addPortfolioItemComment() error: ${JSON.stringify(error)}`,
    );
    return false;
  }

  return true;
}
