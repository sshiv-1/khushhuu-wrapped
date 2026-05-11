import { NextResponse } from "next/server";
import { fetchPlaylistTracks } from "@/lib/spotify";

export async function GET() {
  try {
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID || "3q1my4gJY55vZMqUDXfP7w";
    const tracks = await fetchPlaylistTracks(playlistId);

    return NextResponse.json(tracks, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlist data" },
      { status: 500 }
    );
  }
}
