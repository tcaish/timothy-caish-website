import { supabaseClient } from "@/services/supabase";

/**
 * Updates the total likes of a portfolio item depending on the action.
 */
export async function updatePortfolioItemTotalLikes(
  action: "increment" | "decrement",
  id: number,
) {
  if (action === "decrement") {
    const { error } = await supabaseClient
      .rpc("decrement_portfolio_item_likes", {
        id_of_portfolio_item: id,
      });

    return error == null;
  }

  const { error } = await supabaseClient
    .rpc("increment_portfolio_item_likes", {
      id_of_portfolio_item: id,
    });

  return error == null;
}
