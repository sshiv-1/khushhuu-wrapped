import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Data Source Discovery ──
// All known paths where Instagram message data may live (both old & new exports)
const DATA_DIR = path.join(__dirname, "..", "data");
const KNOWN_PATHS = [
  // Primary: data/ folder inside web-app
  path.join(DATA_DIR, "your_instagram_activity", "messages", "inbox", "kohlipaglu_1228597485313771", "message_1.json"),
  path.join(DATA_DIR, "your_instagram_activity", "1197641555076031", "message_1.json"),
  // Legacy: data folder one level above web-app (previous structure)
  path.join(__dirname, "..", "..", "data", "your_instagram_activity", "messages", "inbox", "kohlipaglu_1228597485313771", "message_1.json"),
  path.join(__dirname, "..", "..", "1197641555076031", "message_1.json"),
];

// Resolve to absolute and deduplicate, keeping only paths that exist
const ALL_DATA_PATHS = [];
const seenPaths = new Set();
for (const p of KNOWN_PATHS) {
  const resolved = path.resolve(p);
  if (!seenPaths.has(resolved) && fs.existsSync(resolved)) {
    seenPaths.add(resolved);
    ALL_DATA_PATHS.push(resolved);
  }
}

if (ALL_DATA_PATHS.length === 0) {
  console.error("Could not find any Instagram message_1.json files at expected paths:");
  KNOWN_PATHS.forEach((p) => console.error("  -", p));
  process.exit(1);
}
console.log(`Found ${ALL_DATA_PATHS.length} data source(s):`);
ALL_DATA_PATHS.forEach((p) => console.log(`  → ${p}`));

const OUT_PATH = path.join(__dirname, "..", "src", "data", "story-data.json");

// ── Instagram Mojibake Fix ──
// Instagram exports UTF-8 text as Latin-1 encoded \u00XX sequences.
// e.g. 😭 (U+1F62D) → UTF-8 bytes F0 9F 98 AD → stored as \u00f0\u009f\u0098\u00ad
// When Node.js parses the JSON, it treats each \u00XX as a Latin-1 codepoint,
// producing garbled text. We fix this by converting each string's char codes
// back to bytes and re-decoding as UTF-8.
function fixMojibake(str) {
  if (!str) return str;
  try {
    // Convert each character's code point to a byte value
    const bytes = new Uint8Array(str.length);
    let hasMojibake = false;
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      bytes[i] = code & 0xff;
      // If any char has a code > 127 but < 256, it's likely mojibake
      if (code > 127 && code < 256) hasMojibake = true;
    }
    if (!hasMojibake) return str;
    // Re-decode the byte sequence as UTF-8
    const decoded = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    // Verify the decode didn't produce replacement characters for the whole string
    if (decoded && !decoded.includes("\ufffd")) return decoded;
    // If decoding failed partially, try a mixed approach: decode chunks
    return str;
  } catch {
    return str;
  }
}

// Recursively fix all strings in the parsed Instagram JSON
function fixAllStrings(obj) {
  if (typeof obj === "string") return fixMojibake(obj);
  if (Array.isArray(obj)) return obj.map(fixAllStrings);
  if (obj && typeof obj === "object") {
    const fixed = {};
    for (const [k, v] of Object.entries(obj)) {
      fixed[k] = fixAllStrings(v);
    }
    return fixed;
  }
  return obj;
}

// Emoji regex that works on properly decoded UTF-8 strings
const EMOJI_REGEX = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

// ── Parse & Merge All Data Sources ──
const YOU = "shhiiiivvv"; // The constant participant across all conversations
const allRawMessages = [];
const participantNames = new Set();

for (const dataPath of ALL_DATA_PATHS) {
  const rawJson = fs.readFileSync(dataPath, "utf-8");
  const rawParsed = JSON.parse(rawJson);
  const raw = fixAllStrings(rawParsed);

  for (const p of raw.participants) {
    participantNames.add(p.name);
  }

  console.log(`  Loaded ${raw.messages.length} messages from ${path.basename(path.dirname(dataPath))}`);
  for (const m of raw.messages) {
    allRawMessages.push(m);
  }
}

// Normalize sender names: map all non-"shhiiiivvv" senders to a single canonical name
// Use the first non-you name encountered as canonical (preserves the original export's name)
const otherNames = [...participantNames].filter((n) => n !== YOU);
const canonicalFriend = "sweetie"; // Display name for the friend
const participants = [canonicalFriend, YOU];

console.log(`\nParticipants: ${[...participantNames].join(", ")}`);
console.log(`Canonical friend name: ${canonicalFriend}`);
console.log(`Total raw messages before dedup: ${allRawMessages.length}`);

// Deduplicate by timestamp_ms (in case any messages appear in multiple exports)
const seenTimestamps = new Set();
const dedupedMessages = [];
allRawMessages.sort((a, b) => a.timestamp_ms - b.timestamp_ms);
for (const m of allRawMessages) {
  if (!seenTimestamps.has(m.timestamp_ms)) {
    seenTimestamps.add(m.timestamp_ms);
    dedupedMessages.push(m);
  }
}
console.log(`After dedup: ${dedupedMessages.length} unique messages\n`);

const messages = dedupedMessages
  .map((m) => {
    const d = new Date(m.timestamp_ms);
    const content = m.content ?? "";
    const isReel = m.share?.link?.includes("/reel/") ?? false;
    // Normalize sender: anyone who isn't "shhiiiivvv" maps to the canonical friend name
    const sender = m.sender_name === YOU ? YOU : canonicalFriend;
    return {
      sender,
      timestamp: d.toISOString(),
      content,
      hasShare: !!m.share,
      shareLink: m.share?.link ?? null,
      hasAttachment: !!(m.share || m.photos || m.audio_files || m.videos),
      isReel,
      hour: d.getHours(),
      dayOfWeek: d.getDay(),
      month: d.getMonth(),
      monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      dateKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      isShort: content.length < 30,
      charCount: content.length,
    };
  })
  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

// ── Stats ──
const firstDate = new Date(messages[0].timestamp);
const lastDate = new Date(messages[messages.length - 1].timestamp);
const daysSpan = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)));

const emojiMap = new Map();
for (const m of messages) {
  const matches = m.content.match(EMOJI_REGEX);
  if (matches) for (const em of matches) emojiMap.set(em, (emojiMap.get(em) ?? 0) + 1);
}

const topEmojis = [...emojiMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);

// Debug: show top emojis found
console.log("Top emojis found:");
topEmojis.slice(0, 5).forEach(([emoji, count]) => console.log(`  ${emoji} → ${count}`));

const hourCounts = new Array(24).fill(0);
for (const m of messages) hourCounts[m.hour]++;
const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
const peakHourFormatted = `${peakHour % 12 === 0 ? 12 : peakHour % 12}${peakHour < 12 ? "AM" : "PM"}`;

const monthlyCounts = {};
for (const m of messages) monthlyCounts[m.monthKey] = (monthlyCounts[m.monthKey] ?? 0) + 1;
const busiestMonth = Object.entries(monthlyCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";

let longestGap = 0;
for (let i = 1; i < messages.length; i++) {
  const gap = (new Date(messages[i].timestamp).getTime() - new Date(messages[i - 1].timestamp).getTime()) / (1000 * 60 * 60);
  longestGap = Math.max(longestGap, gap);
}

const senderMap = new Map();
for (const m of messages) senderMap.set(m.sender, (senderMap.get(m.sender) ?? 0) + 1);
const eachSent = [...senderMap.values()];

const hourHeatmap = Array.from({ length: 7 }, () => new Array(24).fill(0));
for (const m of messages) hourHeatmap[m.dayOfWeek][m.hour]++;

const dayOfWeekCounts = new Array(7).fill(0);
for (const m of messages) dayOfWeekCounts[m.dayOfWeek]++;

const totalChars = messages.reduce((s, m) => s + m.charCount, 0);
const avgMessageLength = Math.round(totalChars / messages.length);
const shortCount = messages.filter((m) => m.isShort).length;

const stats = {
  totalMessages: messages.length,
  daysSpan,
  firstDate: firstDate.toISOString(),
  lastDate: lastDate.toISOString(),
  messagesPerDay: Math.round((messages.length / daysSpan) * 10) / 10,
  reelsShared: messages.filter((m) => m.isReel).length,
  attachmentsTotal: messages.filter((m) => m.hasAttachment).length,
  topEmojis,
  peakHour,
  peakHourFormatted,
  busiestMonth,
  longestGap: Math.round(longestGap),
  eachSent,
  hourHeatmap,
  monthlyCounts,
  dayOfWeekCounts,
  avgMessageLength,
  shortMessagePct: Math.round((shortCount / messages.length) * 100),
};

// ── Memorable messages (sample of 24) ──
function pickMemorable(msgs) {
  const candidates = [];
  const seenDays = new Set();
  // long messages
  const long = msgs.filter((m) => m.charCount > 120 && m.content.length > 0).slice(-20);
  for (const m of long.reverse()) { if (!seenDays.has(m.dateKey) && candidates.length < 4) { candidates.push(m); seenDays.add(m.dateKey); } }
  // affectionate
  const aff = msgs.filter((m) => /\b(love|miss|happy|beautiful|amazing|favorite|best|always|never|together|home|safe|peace|heart|sweet|cute|dear|darling|baby)\b/i.test(m.content));
  for (const m of aff.reverse()) { if (!seenDays.has(m.dateKey) && candidates.length < 10) { candidates.push(m); seenDays.add(m.dateKey); } }
  // reels
  const reels = msgs.filter((m) => m.isReel);
  for (const m of reels.reverse()) { if (!seenDays.has(m.dateKey) && candidates.length < 16) { candidates.push(m); seenDays.add(m.dateKey); } }
  // funny short
  const funny = msgs.filter((m) => m.charCount < 60 && m.charCount > 3 && /\b(lol|haha|lmao|funny|joke|silly|crazy|wild|insane|dumb|stupid|okie|acha|matlab)\b/i.test(m.content));
  for (const m of funny.reverse()) { if (!seenDays.has(m.dateKey) && candidates.length < 24) { candidates.push(m); seenDays.add(m.dateKey); } }
  // Deterministic shuffle using index-based seed (avoids hydration mismatch)
  return candidates
    .map((m, i) => ({ m, sort: ((i * 2654435761) >>> 0) % 1000 }))
    .sort((a, b) => a.sort - b.sort)
    .map((x) => x.m)
    .slice(0, 12);
}

// ── Story engine ──
const peakHourHuman = peakHour < 5 ? "the deepest quiet of night" : peakHour < 12 ? "late morning" : peakHour < 17 ? "the afternoon" : peakHour < 21 ? "early evening" : "late night";
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const bParts = busiestMonth.split("-");
const busiestMonthName = monthNames[parseInt(bParts[1] ?? "0") - 1] ?? "";

const chapters = [
  {
    chapter: "The Receipts",
    lead: "Some things are worth counting. Not out of obsession — but because each number is a tiny piece of a story.",
    beats: [
      { id: "total-messages", title: "Messages", subtitle: "One conversation at a time", narrative: `${messages.length.toLocaleString()} messages. Each one a small thread in the fabric of an entire year. A word here, a laugh there — little moments that quietly added up to something real.`, stat: messages.length.toLocaleString() },
      { id: "days-talking", title: "Days Together", subtitle: "A year of showing up", narrative: `Out of ${daysSpan} days, conversation never really stopped. ${stats.messagesPerDay.toFixed(1)} messages a day on average — not because you had to, but because you wanted to.`, stat: daysSpan.toString() },
      { id: "reels-shared", title: "Reels Shared", subtitle: "A shorthand of their own", narrative: `${stats.reelsShared} reels passed between you. Little dispatches that said "this reminded me of you" — a shorthand that needed no explanation.`, stat: stats.reelsShared.toString() },
      { id: "attachments", title: "Shared Moments", subtitle: "More than just words", narrative: `${stats.attachmentsTotal} photos, videos, and audio notes. Because sometimes words aren't enough, and sometimes a voice note or a picture says it better.`, stat: stats.attachmentsTotal.toString() },
    ],
  },
  {
    chapter: "The Shape of Us",
    lead: "Every conversation has a rhythm. A pattern. A season. This is what yours looked like from above.",
    beats: [
      { id: "rhythm", title: "Your Rhythm", subtitle: "The pulse of a year", narrative: `Your conversations had their own cadence — sometimes a flood of words, sometimes a quiet trickle. Sometimes louder, sometimes quieter. Just two people keeping the thread going.`, stat: `${stats.messagesPerDay.toFixed(0)} avg/day` },
      { id: "busiest-month", title: busiestMonthName, subtitle: "The month you couldn't stop talking", narrative: `${busiestMonthName} was when the words spilled out fastest. Maybe it was the season. Maybe it was just the mood. Something about that month made you both a little more talkative.`, stat: busiestMonthName },
      { id: "longest-gap", title: "Longest Silence", subtitle: "Even the quiet meant something", narrative: `The longest stretch without talking was ${stats.longestGap} hours. In a year of thousands of messages, that gap says something too.`, stat: `${stats.longestGap}h` },
    ],
  },
  {
    chapter: "The Vocabulary",
    lead: "Sooner or later, you develop your own language. Shorthand. Inside jokes. Things that only make sense between the two of you.",
    beats: [
      { id: "emoji-language", title: "Your Emoji Language", subtitle: topEmojis[0] ? `${topEmojis[0][0]}${topEmojis[1]?.[0] ?? ""}${topEmojis[2]?.[0] ?? ""} — a private vocabulary` : "", narrative: topEmojis[0] ? `When words weren't enough, ${topEmojis[0][0]} stepped in. And ${topEmojis[1]?.[0] ?? ""}. And ${topEmojis[2]?.[0] ?? ""}. A tiny visual language that no one else would read the same way.` : "Your emoji language became its own dialect.", stat: topEmojis[0] ? `${topEmojis[0][0]} ${topEmojis[1]?.[0] ?? ""} ${topEmojis[2]?.[0] ?? ""}` : "", emoji: topEmojis[0]?.[0] ?? "" },
      { id: "message-length", title: "Short & Sweet", subtitle: "When less says more", narrative: `${stats.shortMessagePct}% of your messages were short — under thirty characters. A quick "okiee," a single emoji, a word that only makes sense between the two of you.`, stat: `${stats.shortMessagePct}%` },
      { id: "average-length", title: "Words Between You", subtitle: "The average dispatch", narrative: `On average, your messages were ${stats.avgMessageLength} characters long. Not too much, not too little. Just enough.`, stat: `${stats.avgMessageLength} chars` },
    ],
  },
  {
    chapter: "The Late Night Hours",
    lead: `Somehow, ${peakHourHuman} always felt a little more familiar. The phone lit up a little more often.`,
    beats: [
      { id: "peak-hour", title: `The ${peakHourFormatted} Hour`, subtitle: "When the notifications piled up", narrative: `${peakHourFormatted}. ${peakHourHuman}. That was your hour. When distractions faded and conversations picked up. When reels, thoughts, and random updates found their way across.`, stat: peakHourFormatted },
      { id: "heatmap", title: "Night Owls", subtitle: "When the conversations happened", narrative: "The patterns tell a story. Some hours were consistently busier than others — certain times of day just felt more natural to talk.", stat: "" },
    ],
  },
  {
    chapter: "Memory Cards",
    lead: "Some messages are just data. Others are little artifacts — the kind worth saving.",
    beats: [],
  },
];

const output = {
  participants,
  messages,
  memorableMessages: pickMemorable(messages),
  stats,
  chapters,
};

fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
console.log(`Generated story data: ${messages.length} messages → ${OUT_PATH}`);