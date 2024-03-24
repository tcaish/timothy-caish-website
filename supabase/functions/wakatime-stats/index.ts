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
      { status: wakaTimeStatsRes.status },
    );
  }

  const wakaTimeStats = await wakaTimeStatsRes.json();

  // If there was an error parsing the response
  if (!wakaTimeStats) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch WakaTime stats JSON" }),
      { status: 500 },
    );
  }

  return new Response(
    JSON.stringify(wakaTimeStats),
    { headers: { "Content-Type": "application/json" } },
  );
});
