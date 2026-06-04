// Spotify utility — static playlist data for "luv luv luv"
// albumArt and spotifyUrl retained for PolarizedTracks (existing chapter).
// Wrapped Slide 14 uses only title, artist, duration, and order.

export interface SpotifyTrack {
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
  album: string;
  duration: string; // mm:ss
  order: number;
}

// "luv luv luv" — 24 tracks — 1 hr 22 min
// Tracks 10 and 11 are TODO placeholders.
const PLAYLIST_TRACKS: SpotifyTrack[] = [
  {
    title: "Get You (feat. Kali Uchis)",
    artist: "Daniel Caesar, Kali Uchis",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273df15e347e30d1706f3dc8e4f",
    spotifyUrl: "https://open.spotify.com/track/7zFXMVP6F3T7UfG0Q0aFqj",
    album: "Freudian",
    duration: "4:38",
    order: 1,
  },
  {
    title: "Thinkin Bout You",
    artist: "Frank Ocean",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/2PT4m6H09HuLsz6OFBLSJk",
    album: "channel ORANGE",
    duration: "3:21",
    order: 2,
  },
  {
    title: "Best Part (feat. H.E.R.)",
    artist: "Daniel Caesar, H.E.R.",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273df15e347e30d1706f3dc8e4f",
    spotifyUrl: "https://open.spotify.com/track/0u2P5u6lvoDfwTYjAADbn4",
    album: "Freudian",
    duration: "3:30",
    order: 3,
  },
  {
    title: "TBH",
    artist: "PARTYNEXTDOOR",
    albumArt: "",
    spotifyUrl: "",
    album: "PARTYNEXTDOOR 3",
    duration: "2:03",
    order: 4,
  },
  {
    title: "SOMETHING ABOUT YOU",
    artist: "PARTYNEXTDOOR, Drake",
    albumArt: "",
    spotifyUrl: "",
    album: "PARTYNEXTDOOR 3",
    duration: "3:39",
    order: 5,
  },
  {
    title: "RATHER LIE (with The Weeknd)",
    artist: "Playboi Carti, The Weeknd",
    albumArt: "",
    spotifyUrl: "",
    album: "MUSIC",
    duration: "3:30",
    order: 6,
  },
  {
    title: "The Color Violet",
    artist: "Tory Lanez",
    albumArt: "",
    spotifyUrl: "",
    album: "Alone at Prom",
    duration: "3:46",
    order: 7,
  },
  {
    title: "RATHER LIE (with The Weeknd)",
    artist: "Playboi Carti, The Weeknd",
    albumArt: "",
    spotifyUrl: "",
    album: "MUSIC",
    duration: "3:30",
    order: 8,
  },
  {
    title: "Sensation",
    artist: "Zehr Vibe, Intense, Sardar Khehra",
    albumArt: "",
    spotifyUrl: "",
    album: "Sensation",
    duration: "2:48",
    order: 9,
  },
  // TODO: fill in track 10
  {
    title: "—",
    artist: "—",
    albumArt: "",
    spotifyUrl: "",
    album: "",
    duration: "",
    order: 10,
  },
  // TODO: fill in track 11
  {
    title: "—",
    artist: "—",
    albumArt: "",
    spotifyUrl: "",
    album: "",
    duration: "",
    order: 11,
  },
  {
    title: "The Abyss (feat. Lana Del Rey)",
    artist: "The Weeknd, Lana Del Rey",
    albumArt: "",
    spotifyUrl: "",
    album: "Hurry Up Tomorrow",
    duration: "4:43",
    order: 12,
  },
  {
    title: "Piche Tere",
    artist: "Kunwarr, Dishant",
    albumArt: "",
    spotifyUrl: "",
    album: "Piche Tere",
    duration: "2:00",
    order: 13,
  },
  {
    title: "I Really Do...",
    artist: "Karan Aujla, Ikky",
    albumArt: "",
    spotifyUrl: "",
    album: "Making Memories",
    duration: "3:14",
    order: 14,
  },
  {
    title: "Margaret (feat. Bleachers)",
    artist: "Lana Del Rey, Bleachers",
    albumArt: "",
    spotifyUrl: "",
    album: "Did You Know That There's a Tunnel Under Ocean Blvd",
    duration: "5:40",
    order: 15,
  },
  {
    title: "Cardigan",
    artist: "Don Toliver",
    albumArt: "",
    spotifyUrl: "",
    album: "Love Sick",
    duration: "2:39",
    order: 16,
  },
  {
    title: "K.",
    artist: "Cigarettes After Sex",
    albumArt: "",
    spotifyUrl: "",
    album: "Cry",
    duration: "5:20",
    order: 17,
  },
  {
    title: "STAY (with Justin Bieber)",
    artist: "The Kid LAROI, Justin Bieber",
    albumArt: "",
    spotifyUrl: "",
    album: "F*CK LOVE 3: OVER YOU",
    duration: "2:22",
    order: 18,
  },
  {
    title: "Flatline",
    artist: "Justin Bieber",
    albumArt: "",
    spotifyUrl: "",
    album: "Justice",
    duration: "3:39",
    order: 19,
  },
  {
    title: "NIGHTS LIKE THIS",
    artist: "The Kid LAROI",
    albumArt: "",
    spotifyUrl: "",
    album: "F*CK LOVE",
    duration: "1:27",
    order: 20,
  },
  {
    title: "You (feat. Travis Scott)",
    artist: "Don Toliver, Travis Scott",
    albumArt: "",
    spotifyUrl: "",
    album: "Love Sick",
    duration: "3:34",
    order: 21,
  },
  {
    title: "Open Arms (feat. Travis Scott)",
    artist: "SZA, Travis Scott",
    albumArt: "",
    spotifyUrl: "",
    album: "SOS",
    duration: "4:00",
    order: 22,
  },
  {
    title: "Raindance (feat. Tems)",
    artist: "Dave, Tems",
    albumArt: "",
    spotifyUrl: "",
    album: "We're All Alone in This Together",
    duration: "3:40",
    order: 23,
  },
  {
    title: "Passionfruit",
    artist: "Drake",
    albumArt: "",
    spotifyUrl: "",
    album: "More Life",
    duration: "4:59",
    order: 24,
  },
];

// Direct export for components that need the data synchronously (no async)
export const luvLuvLuvTracks: SpotifyTrack[] = PLAYLIST_TRACKS;

export async function fetchPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
  // Returns the real "luv luv luv" playlist. Static — no API call needed.
  return PLAYLIST_TRACKS;
}
