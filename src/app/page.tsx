import WrappedSection from "@/components/wrapped/WrappedSection";
import { fetchPlaylistTracks } from "@/lib/spotify";

export default async function HomePage() {
  const tracks = await fetchPlaylistTracks("luv luv luv");
  
  return (
    <main className="bg-sp-dark">
      <WrappedSection tracks={tracks} />
    </main>
  );
}