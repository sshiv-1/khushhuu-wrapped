# CLAUDE.md — One Year

## What This Is
"One Year" is a personal, scroll-based web experience that visualizes a year
of a relationship — messages, music, memories, and moments. It's intimate,
poetic, and built to feel like something worth keeping.

V2 adds a new layer: a Spotify Wrapped-style experience built from two data
sources — the full year (already on the site), and a second JSON of the most
recent week (May 28 – June 2, 2026). The site ends with the playlist.

This is not a dashboard. This is not a data app. This is a love letter in code.

## Data Sources

### Year Data (already parsed, used in existing chapters)
The main conversation stats:
- 11,794 messages, 365 days, 254 reels, 698 photos/videos
- Peak hour: 12 AM

### Week Data — message_1.json
Raw Instagram DM export. Structure:
```json
{
  "participants": [{"name": "🦥"}, {"name": "༝༚༝༚"}],
  "messages": [
    {
      "sender_name": "🦥",
      "timestamp_ms": 1780402961184,
      "content": "...",
      "share": { "link": "...", "share_text": "..." },
      "photos": [...],
      "audio_files": [...],
      "reactions": [{ "reaction": "❤", "actor": "🦥", "timestamp": 1780400542 }],
      "is_geoblocked_for_viewer": false,
      "is_unsent_image_by_messenger_kid_parent": false
    }
  ]
}
```

**Encoding note:** Names and content are double-encoded (latin1 → utf-8).
Always decode with: `s.encode('latin1').decode('utf-8')`

**Pre-computed week stats (use these directly, don't re-parse):**
- Total messages: 301 (across 6 days)
- Her messages (༝༚༝༚): 155 | His messages (🦥): 146
- Date range: May 28 – June 2, 2026
- Peak hour: 6 PM (18:00) — 108 messages in that single hour
- Most active day: June 1 (95 msgs) and May 28 (94 msgs)
- Reels shared: 18
- Reactions: ❤ × 12, 💋 × 1
- Top emojis: 😭 (37), 🥹 (9), 🫶 (5), 🙈 (5), 🥳 (5)
- Avg message length: 27 characters
- Photos: 2 | Voice notes: 2

## Tech Stack
- Next.js (App Router), localhost:3000
- Tailwind CSS
- Framer Motion for scroll animations
- Recharts or D3 for charts
- Static/pre-computed data — no live API calls

## Visual Identity — DO NOT DEVIATE

### Colors
- Background: #f5f0e8 (warm cream)
- Text primary: #2c2c2c
- Text muted: #9a8f82
- Accent: #8fad88 (muted sage green, charts and highlights)
- Cards: white #ffffff, soft warm shadow

### Typography
- Chapter headings: serif (Playfair Display), italic weight
- Chapter labels ("CHAPTER X"): small-caps, tracked, muted — `text-xs tracking-[0.2em] uppercase`
- Narrative subtext: italic serif, centered, generous line-height
- Stat labels: uppercase tracked small — `tracking-widest text-xs`
- Hero numbers: serif, very large, NOT bold — elegance not weight

### Wrapped Slides (new in v2)
- Full viewport height (min-h-screen), centered
- One idea per slide — no clutter
- Hero element: huge serif number or word
- Small-caps label above, italic flavor below
- Entrance: fade + very subtle scale (0.97 → 1), once: true
- Background stays cream — NOT Spotify dark. Our palette only.
- Each slide should feel like a page in a book, not a story card

### Copy Tone
- Witty but tender. Never saccharine. Never corporate.
- Chapter names: short evocative nouns ("The Receipts", "The Shape of Us")
- Subtext: one italic sentence, the emotional frame
- Stat flavor: lowercase italic, specific and felt
- Good examples:
  - "not once did it actually go quiet."
  - "254 things that made one of you think of the other."
  - "146 vs 155. you were both showing up."
  - "the hour when everything felt easier to say."
- Banned words: journey, beautiful, magical, special, cherish

## Chapter & Slide Structure

### Existing Chapters (DO NOT BREAK)
- Chapter 1: The Receipts
- Chapter 2: The Shape of Us
- Chapter 3: The Conversation Pulse
- Chapter 4: The Vocabulary
- Chapter 5: Memory Cards
- Music cards section

### V2 Structure (new, add after existing)
Narrative arc: A year → then this week → then the music.
See V2 kickoff prompt for full slide breakdown.

## Coding Standards
- Components: /components/chapters/ named ChapterX_Name.tsx
- Shared UI: /components/ui/
- Data/constants: /data/ as typed objects
- All animations: Framer Motion whileInView, once: true
- One visual idea per component
- No hardcoded colors outside the design token set
- No dark mode, no gradients, no "app-like" UI elements
- No navigation bars, headers, footers
- No skeleton screens or loading spinners (data is static)