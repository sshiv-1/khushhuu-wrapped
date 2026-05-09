// Types — actual data comes from the build-time generated JSON

export interface ParsedMessage {
  sender: string;
  timestamp: string;
  content: string;
  hasShare: boolean;
  shareLink: string | null;
  hasAttachment: boolean;
  isReel: boolean;
  hour: number;
  dayOfWeek: number;
  month: number;
  monthKey: string;
  dateKey: string;
  isShort: boolean;
  charCount: number;
}

export interface StoryStats {
  totalMessages: number;
  daysSpan: number;
  firstDate: string;
  lastDate: string;
  messagesPerDay: number;
  reelsShared: number;
  attachmentsTotal: number;
  topEmojis: [string, number][];
  peakHour: number;
  peakHourFormatted: string;
  busiestMonth: string;
  longestGap: number;
  eachSent: number[];
  hourHeatmap: number[][];
  monthlyCounts: Record<string, number>;
  dayOfWeekCounts: number[];
  avgMessageLength: number;
  shortMessagePct: number;
}

export interface StoryBeat {
  id: string;
  title: string;
  subtitle: string;
  narrative: string;
  stat?: string;
  emoji?: string;
}

export interface ChapterStory {
  chapter: string;
  lead: string;
  beats: StoryBeat[];
}

export interface StoryData {
  participants: string[];
  messages: ParsedMessage[];
  memorableMessages: ParsedMessage[];
  stats: StoryStats;
  chapters: ChapterStory[];
}