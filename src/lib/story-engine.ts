// Import pre-computed story data generated at build time
import storyData from "@/data/story-data.json";
import type { StoryData, ParsedMessage } from "./parser";

export function useStory(): StoryData {
  return storyData as unknown as StoryData;
}

export function generateStory(): StoryData {
  return storyData as unknown as StoryData;
}

export function pickMemorableMessages(_messages: ParsedMessage[]): ParsedMessage[] {
  return (storyData as unknown as StoryData).memorableMessages;
}