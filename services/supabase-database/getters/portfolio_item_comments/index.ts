import { CONTENT_SIZE_LIMIT } from "@/constants/settings";
import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

let lastVisibleCommentId = 0;

/**
 * Gets all the portfolio item comments.
 * @returns All the portfolio items.
 */
export async function getPortfolioItemComments(
  id: number,
  fetchAdditional = false,
) {
  // If we do not want to fetch additional comments, start from the beginning
  if (!fetchAdditional) {
    lastVisibleCommentId = 0;
  }

  const response = await supabaseClient
    .from("portfolio_item_comments")
    .select("*")
    .match({
      approved: true,
      portfolio_item_id: id,
    })
    .order("created_at", { ascending: true })
    .limit(CONTENT_SIZE_LIMIT)
    .gt("id", lastVisibleCommentId === 0 ? -1 : lastVisibleCommentId);

  // If there was an error
  if (response.error) {
    Bugsnag.notify(
      `getPortfolioItemComments() error: ${JSON.stringify(response.error)}`,
    );
    return { error: true };
  } // If there was no error and data was returned
  else if (response.data.length > 0) {
    lastVisibleCommentId = response.data[response.data.length - 1].id;
  }

  return {
    comments: response.data.length > 0 ? response.data : [],
    error: false,
  };
}

/**
 * Gets the count of all the portfolio item comments.
 * @returns The count of all the portfolio item comments.
 */
export async function getPortfolioItemCommentsCount(id: number) {
  const response = await supabaseClient
    .from("portfolio_item_comments")
    .select("id", { count: "exact", head: true })
    .match({
      portfolio_item_id: id,
    });

  // If there was an error
  if (response.error) {
    Bugsnag.notify(
      `getPortfolioItemCommentsCount() error: ${
        JSON.stringify(response.error)
      }`,
    );
    return 0;
  }

  return response.count == null ? 0 : response.count;
}
