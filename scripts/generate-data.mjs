import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "..", "1197641555076031", "message_1.json");
const OUT_PATH = path.join(__dirname, "..", "src", "data", "story-data.json");

const EMOJI_REGEX = /(\p{Emoji_Presentation}|\p{Emoji}️|\u{200D}|\p{Extended_Pictographic})/gu;

// ── Parse ──
const raw = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const participants = raw.participants.map((p) => p.name);

const messages = raw.messages
  .map((m) => {
    const d = new Date(m.timestamp_ms);
    const content = m.content ?? "";
    const isReel = m.share?.link?.includes("/reel/") ?? false;
    return {
      sender: m.sender_name,
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
  return candidates.sort(() => Math.random() - 0.5).slice(0, 12);
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
      { id: "total-messages", title: "Messages", subtitle: "Little ways of finding each other", narrative: `${messages.length.toLocaleString()} messages. Each one a thread in the fabric of an entire year. A word here, a laugh there — small moments that quietly built something extraordinary.`, stat: messages.length.toLocaleString() },
      { id: "days-talking", title: "Days Together", subtitle: "Even when apart, never distant", narrative: `Out of ${daysSpan} days, conversation never really stopped. ${stats.messagesPerDay.toFixed(1)} messages a day on average — not because you had to talk, but because you wanted to.`, stat: daysSpan.toString() },
      { id: "reels-shared", title: "Reels Shared", subtitle: "A language of their own", narrative: `${stats.reelsShared} reels passed between you. Little dispatches that said "this made me think of you" — maybe the quietest way of saying the biggest thing.`, stat: stats.reelsShared.toString() },
      { id: "attachments", title: "Shared Moments", subtitle: "More than just words", narrative: `${stats.attachmentsTotal} photos, videos, and audio notes. Because sometimes words aren't enough, and sometimes a voice or a picture carries everything that text cannot.`, stat: stats.attachmentsTotal.toString() },
    ],
  },
  {
    chapter: "The Shape of Us",
    lead: "Every relationship has a rhythm. A shape. A season. This is what yours looked like from above.",
    beats: [
      { id: "rhythm", title: "Your Rhythm", subtitle: "The pulse of a year", narrative: `Your conversations had their own gentle cadence — sometimes a flood of words, sometimes a quiet trickle. But never silence. Never distance. Just the steady hum of two people staying close.`, stat: `${stats.messagesPerDay.toFixed(0)} avg/day` },
      { id: "busiest-month", title: busiestMonthName, subtitle: "The month you couldn't stop talking", narrative: `${busiestMonthName} was when the words spilled out fastest. Maybe it was the season. Maybe it was something in the air. But something about that month made you both reach for each other more.`, stat: busiestMonthName },
      { id: "longest-gap", title: "Longest Silence", subtitle: "Even the quiet meant something", narrative: `The longest stretch without talking was ${stats.longestGap} hours. In a year of thousands of messages, that's remarkable — and says more than any word count ever could.`, stat: `${stats.longestGap}h` },
    ],
  },
  {
    chapter: "The Vocabulary",
    lead: "Every couple develops their own language. Inside jokes. Shorthand. A private dictionary that only two people in the world understand.",
    beats: [
      { id: "emoji-language", title: "Your Emoji Language", subtitle: topEmojis[0] ? `${topEmojis[0][0]}${topEmojis[1]?.[0] ?? ""}${topEmojis[2]?.[0] ?? ""} — a private vocabulary` : "", narrative: topEmojis[0] ? `When words failed, ${topEmojis[0][0]} stepped in. And ${topEmojis[1]?.[0] ?? ""}. And ${topEmojis[2]?.[0] ?? ""}. A tiny visual language that no one else would read the same way.` : "Your emoji language became its own dialect.", stat: topEmojis[0] ? `${topEmojis[0][0]} ${topEmojis[1]?.[0] ?? ""} ${topEmojis[2]?.[0] ?? ""}` : "", emoji: topEmojis[0]?.[0] ?? "" },
      { id: "message-length", title: "Short & Sweet", subtitle: "When less says more", narrative: `${stats.shortMessagePct}% of your messages were short — under thirty characters. A quick "okiee," a single emoji, a word that only makes sense to the two of you.`, stat: `${stats.shortMessagePct}%` },
      { id: "average-length", title: "Words Between You", subtitle: "Every message a small gift", narrative: `On average, your messages were ${stats.avgMessageLength} characters long. Not too much, not too little. Just enough.`, stat: `${stats.avgMessageLength} chars` },
    ],
  },
  {
    chapter: "The Late Night Hours",
    lead: `Somehow, ${peakHourHuman} always became yours. The world got quiet, and your conversation came alive.`,
    beats: [
      { id: "peak-hour", title: `The ${peakHourFormatted} Hour`, subtitle: "When the world fell away", narrative: `${peakHourFormatted}. ${peakHourHuman}. That was your hour. When distractions faded and conversations deepened. When reels, thoughts, and quiet confessions found their way across the distance between you.`, stat: peakHourFormatted },
      { id: "heatmap", title: "Night Owls", subtitle: "The hours that held you together", narrative: "The patterns trace themselves across days and nights. You belonged to the quiet hours — when the rest of the world was asleep and there was only each other's words on the screen.", stat: "" },
    ],
  },
  {
    chapter: "Memory Cards",
    lead: "Some messages are numbers in a spreadsheet. Others are little monuments — moments worth pulling out and holding up to the light.",
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