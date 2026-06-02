// ─── Week Data — May 28 → June 2, 2026 ───────────────────────────────────────
// Pre-computed from message_1.json. Do not re-parse at runtime.
// Encoding note: names/content are double-encoded (latin1 → utf-8).

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmojiCount {
  emoji: string;
  count: number;
}

export interface DayCount {
  date: string;
  count: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface MemorableReel {
  text: string;
  date: string;
}

export interface WeekStats {
  totalMessages: number;
  herMessages: number;
  hisMessages: number;
  dateRange: DateRange;
  activeDays: number;
  peakHour: string;
  peakHourCount: number;
  reelsShared: number;
  heartReactions: number;
  kissReaction: number;
  topEmojis: EmojiCount[];
  avgMessageLength: number;
  mostActiveDays: DayCount[];
  memorableReel: MemorableReel;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const weekTotalMessages: number = 301;

export const weekHerMessages: number = 155; // ༝༚༝༚

export const weekHisMessages: number = 146; // 🦥

export const weekDateRange: DateRange = {
  start: "May 28",
  end: "June 2, 2026",
};

export const weekActiveDays: number = 6;

export const weekPeakHour: string = "6PM";

export const weekPeakHourCount: number = 108;

export const weekReelsShared: number = 18;

export const weekHeartReactions: number = 12;

export const weekKissReaction: number = 1;

export const weekTopEmojis: EmojiCount[] = [
  { emoji: "😭", count: 37 },
  { emoji: "🥹", count: 9 },
  { emoji: "🫶", count: 5 },
  { emoji: "🙈", count: 5 },
  { emoji: "🥳", count: 5 },
];

export const weekAvgMessageLength: number = 27;

export const weekMostActiveDays: DayCount[] = [
  { date: "June 1", count: 95 },
  { date: "May 28", count: 94 },
];

export const weekMemorableReel: MemorableReel = {
  text: "and if I ever hurt you and you never told me about it, I'm sorry.",
  date: "May 2026",
};

// ─── Aggregate export ─────────────────────────────────────────────────────────

export const weekStats: WeekStats = {
  totalMessages: weekTotalMessages,
  herMessages: weekHerMessages,
  hisMessages: weekHisMessages,
  dateRange: weekDateRange,
  activeDays: weekActiveDays,
  peakHour: weekPeakHour,
  peakHourCount: weekPeakHourCount,
  reelsShared: weekReelsShared,
  heartReactions: weekHeartReactions,
  kissReaction: weekKissReaction,
  topEmojis: weekTopEmojis,
  avgMessageLength: weekAvgMessageLength,
  mostActiveDays: weekMostActiveDays,
  memorableReel: weekMemorableReel,
};
