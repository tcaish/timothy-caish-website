import { TablesInsert } from "@/constants/types/supabase";
import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

/**
 * Adds a comment to the given portfolio item.
 */
export async function addPortfolioItemComment(
  data: TablesInsert<"portfolio_item_comments">,
) {
  const { error } = await supabaseClient
    .from("portfolio_item_comments")
    .insert(
      data,
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
