"use client";

import Slide01_TheYear from "./Slide01_TheYear";
import Slide02_TheMessages from "./Slide02_TheMessages";
import Slide03_TheReels from "./Slide03_TheReels";
import Slide04_TheHour from "./Slide04_TheHour";
import Slide05_TheWeekBegins from "./Slide05_TheWeekBegins";
import Slide06_TheWeekCount from "./Slide06_TheWeekCount";
import Slide07_TheSplit from "./Slide07_TheSplit";
import Slide08_ThePeakHour from "./Slide08_ThePeakHour";
import Slide09_TheReelsWeek from "./Slide09_TheReelsWeek";
import Slide10_TheEmoji from "./Slide10_TheEmoji";
import Slide11_TheHearts from "./Slide11_TheHearts";
import Slide12_TheReelThatSaidIt from "./Slide12_TheReelThatSaidIt";
import Slide13_TheTransition from "./Slide13_TheTransition";
import Slide14_ThePlaylist from "./Slide14_ThePlaylist";
import SpotifyButton from "./SpotifyButton";

export default function WrappedSection() {
  return (
    <section aria-label="One Year — Wrapped">
      {/* Part One: The Year */}
      <Slide01_TheYear />
      <Slide02_TheMessages />
      <Slide03_TheReels />
      <Slide04_TheHour />

      {/* Part Two: The Week */}
      <Slide05_TheWeekBegins />
      <Slide06_TheWeekCount />
      <Slide07_TheSplit />
      <Slide08_ThePeakHour />
      <Slide09_TheReelsWeek />
      <Slide10_TheEmoji />
      <Slide11_TheHearts />
      <Slide12_TheReelThatSaidIt />

      {/* Part Three: The Music */}
      <Slide13_TheTransition />
      <Slide14_ThePlaylist />
      <SpotifyButton />
    </section>
  );
}
