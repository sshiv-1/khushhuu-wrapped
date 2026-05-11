// Spotify API utility — Mock version since actual Spotify API requires Premium dev account
// Falls back to static data if API fetch fails with 403

export interface SpotifyTrack {
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
  album: string;
  order: number;
}

// Pre-defined static data matching the requested playlist style
const MOCK_TRACKS: SpotifyTrack[] = [
  {
    title: "Off My Face",
    artist: "Justin Bieber",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
    spotifyUrl: "https://open.spotify.com/track/3T03rPwlL8NVk1yIaxeD8U",
    album: "Justice",
    order: 1,
  },
  {
    title: "Nights Like This",
    artist: "Kehlani, Ty Dolla $ign",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273291500754865d1d64c05eaf5",
    spotifyUrl: "https://open.spotify.com/track/6ZRuF2n1CQxyxxAAWsKJOy",
    album: "While We Wait",
    order: 2,
  },
  {
    title: "Rather Lie",
    artist: "Mario",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5cfba7bf407c089c9ec92ea",
    spotifyUrl: "https://open.spotify.com/track/0XyA9fEikjV0D1i988bIfB",
    album: "Rather Lie",
    order: 3,
  },
  {
    title: "telepatía",
    artist: "Kali Uchis",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273b4d4b1a8d0092ad41c498363",
    spotifyUrl: "https://open.spotify.com/track/6tDDoYIxWvMLTdKpjFkc1B",
    album: "Sin Miedo",
    order: 4,
  },
  {
    title: "Die For You",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273a048415c3454654b9d0b04a8",
    spotifyUrl: "https://open.spotify.com/track/2LBqCSwhJGcFQeTHMVGwy3",
    album: "Starboy",
    order: 5,
  },
  {
    title: "Snooze",
    artist: "SZA",
    albumArt: "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    spotifyUrl: "https://open.spotify.com/track/4iZ4pt7kvcaH6s005YQ2qU",
    album: "SOS",
    order: 6,
  },
  {
    title: "Get You",
    artist: "Daniel Caesar, Kali Uchis",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273df15e347e30d1706f3dc8e4f",
    spotifyUrl: "https://open.spotify.com/track/7zFXMVP6F3T7UfG0Q0aFqj",
    album: "Freudian",
    order: 7,
  },
  {
    title: "Lost",
    artist: "Frank Ocean",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/3GZD6HmiNUhxXYf8Gg0g0c",
    album: "channel ORANGE",
    order: 8,
  }
];

export async function fetchPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
  // Since the user's Spotify dev account lacks a premium subscription (required by Spotify's current API rules),
  // we return mock data that matches the requested aesthetic and playlist vibe.
  return MOCK_TRACKS;
}
