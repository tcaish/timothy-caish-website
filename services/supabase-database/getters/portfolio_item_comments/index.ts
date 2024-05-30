import { CONTENT_SIZE_LIMIT } from "@/constants/settings";
import { supabaseClient } from "@/services/supabase";
import Bugsnag from "@bugsnag/js";

let lastVisibleCommentId = 0;

/**
 * Gets all the portfolio item comments.
 * @returns All the portfolio items.
 */
export async function getPortfolioItemComments(
  portfolioItemId: number,
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
      portfolio_item_id: portfolioItemId,
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
export async function getPortfolioItemCommentsCount(portfolioItemId: number) {
  const response = await supabaseClient
    .from("portfolio_item_comments")
    .select("id", { count: "exact", head: true })
    .match({
      portfolio_item_id: portfolioItemId,
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

/**
 * Checks if the user has commented on the portfolio item.
 * @param hashedIpAddress The hashed IPV4 or IPV6 address of the user.
 * @param portfolioItemId The id of the portfolio item.
 * @returns
 */
export async function hasUserCommentedOnPortfolioItem(
  hashedIpAddress: string,
  portfolioItemId: number,
) {
  const response = await supabaseClient
    .from("portfolio_item_comments")
    .select("id", { count: "exact", head: true })
    .match({
      portfolio_item_id: portfolioItemId,
      hashed_ip: hashedIpAddress,
    });

  // If there was an error
  if (response.error || response.count == null) {
    Bugsnag.notify(
      `hasUserCommentedOnPortfolioItem() error: ${
        JSON.stringify(response.error)
      }`,
    );
    return null;
  }

  return response.count > 0;
}
