import { WakaTimeAllTimeStats } from "../_shared/constants/types.ts";
import { corsHeaders } from "../_shared/cors.ts";

/**
 * This function fetches all time WakaTime stats for the current user.
 */
Deno.serve(async () => {
  // Fetch WakaTime stats
  const wakaTimeStatsRes = await fetch(
    "https://wakatime.com/api/v1/users/current/stats/all_time",
    {
      headers: {
        Authorization: `Basic ${Deno.env.get("WAKATIME_API_KEY")}`,
      },
    },
  );

  // If there was an error fetching WakaTime stats
  if (!wakaTimeStatsRes.ok) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch WakaTime stats: ${wakaTimeStatsRes.statusText}`,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: wakaTimeStatsRes.status,
      },
    );
  }

  const wakaTimeStats: WakaTimeAllTimeStats = await wakaTimeStatsRes
    .json();

  // If there was an error parsing the response
  if (!wakaTimeStats) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch WakaTime stats JSON" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }

  // Remove all items from the JSON response that are not needed
  delete wakaTimeStats.data.categories;
  delete wakaTimeStats.data.created_at;
  delete wakaTimeStats.data.dependencies;
  delete wakaTimeStats.data.machines;
  delete wakaTimeStats.data.modified_at;
  delete wakaTimeStats.data.operating_systems;
  delete wakaTimeStats.data.projects;
  delete wakaTimeStats.data.user_id;
  delete wakaTimeStats.data.username;

  return new Response(
    JSON.stringify(wakaTimeStats),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
