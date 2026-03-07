---
name: "Repurpose Livestream Content"
description: "Transform week HTML files or markdown from livestream/presentation format into standalone educational material. Use when: repurposing stream content, removing stream segments, converting live demo scripts to walkthroughs, stripping viewer engagement elements, or converting presenter-oriented language to self-directed learning format."
argument-hint: "Path(s) to file(s) or directory to repurpose (e.g. public/weeks/week-12.html)"
agent: "agent"
---

Repurpose the files or directories provided as arguments (or, if none are given, any files already open or referenced in the conversation) from livestream/presentation format into standalone educational material.

## What to Remove

- "Livestream" or "Live Demo" in titles and headers
- "Script", "Narrative Arc", or "Segment" references (section headings, labels, IDs)
- Viewer/audience engagement elements: live comments, real-time challenges, chat prompts, "during stream" callouts
- Presenter-oriented language: "we'll show", "on-stream", "let's demonstrate", "join us", "tune in"
- Time-based segment markers: "Segment 1: 0–15 min", countdown timers used as pacing cues
- Interactive viewer participation callouts ("submit your answer", "drop a comment")
- "Top submissions" or stream-competition references

## What to Preserve

- All technical explanations and educational content
- Code examples and implementation details
- Interactive tools (encoders, calculators, embedded HTML widgets)
- Research findings and citations
- Conceptual explanations and analogies
- Step-by-step walkthroughs — reframe as practical examples or experimentation guides
- Success metrics and testing approaches
- Defense mechanism discussions
- Sequential logic (order of ideas must remain intact even when time labels are dropped)

## Transformation Rules

| Original phrasing | Replacement |
|---|---|
| "Conceptual Script" / "Script" | "Key Concepts" or "Core Principles" |
| "Live Demo" | "Practical Walkthrough" or "Hands-On Example" |
| "Viewer Challenge" | "Experimentation Guide" or "Practice Exercise" |
| "During Livestream" | "Testing Approach" or "Exploration Exercise" |
| "Narrative Arc" | "Learning Arc" or remove entirely |
| "Segment N: X–Y min" | Remove the label; keep the content that follows |
| "Let's demonstrate on-stream" | "The following example demonstrates" |
| "Tune in to see…" | State the concept directly |

## Process

1. Read each target file fully before making any edits.
2. Apply all removals and transformations in a single pass per file.
3. Do **not** alter technical content, code blocks, tool markup, or CSS/JS logic.
4. Preserve the existing visual style and HTML structure exactly — only modify text nodes and human-readable labels.
5. After editing, confirm the file has no remaining livestream-oriented language.
6. Do **not** create summary files or changelogs — only edit the requested files.
