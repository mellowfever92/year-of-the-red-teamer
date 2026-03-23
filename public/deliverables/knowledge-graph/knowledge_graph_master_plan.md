# Plan: Knowledge Graph README — Full Phased Implementation

## TL;DR
The knowledge graph frontend (`/public/weeks/knowledge-graph.html`) and backend (`/public/deliverables/knowledge-graph/kg-server.js`) are mostly scaffolded but have critical gaps — UI functions using `alert()` stubs, a broken `navigateToWeek()` for Arc III+ weeks, and all "Planned Features" (PDF export, layout save, completion tracking, 3D, time-based animation, embedding search, collaborative sharing) are unimplemented. This plan phases them from bug fixes through advanced features.

---

# Universal Actions - ALWAYS DO THIS

- Call the `Phase Evaluator` subagent to review your completed phase work. Review its returned report and apply **all valid fixes**.

## Phase 1: Bug Fixes & UI Polish (Critical — foundation before building on top)

**Goal:** Every documented feature that "exists" must actually work without `alert()` stubs.

1. Fix `navigateToWeek()` in `knowledge-graph.html` — current function goes to `week-N.html` but weeks 17+ live in subdirs (`Arc III/`, `Arc IV/`, `Arc V/`, `Arc VI/`, `Arc VII/`). Build a mapping object keyed by week number to correct relative path.
2. Replace `alert()` in `showLearningPath()` — render AI response in a styled modal panel, showing clickable week cards in sequence, not raw alert text.
3. Replace `alert()` in `showTaxonomy()` — render MITRE ATT&CK mappings as a styled HTML table in a modal/side panel.
4. Fix `showRelated()` stub — instead of `alert('Related items are highlighted...')`, call backend `/api/related` with the selected week number and render results as clickable week cards in the side panel.
5. Enhance `showPrerequisites()` — in addition to the D3 dimming it already does, display a prerequisite list in the info panel (week titles, links to them).
6. Add "Open Week →" link button in the node info panel (already has `navigateToWeek()` call but hidden/missing in the panel HTML; make it visible and use the fixed path mapping from step 1).

**Files:** `public/weeks/knowledge-graph.html`

---

## Phase 2: Week Completion Tracking + "You Are Here"

**Goal:** Implement planned feature #4 and integration opportunity #3.

1. Add localStorage-based completion tracker — each week node gets a toggleable "Mark Complete" button in the expanded node info panel. State stored as JSON array in `localStorage.getItem('yotrt-completed-weeks')`.
2. Add completed visual indicator on graph nodes — a small checkmark ring or green border on nodes where the week is marked complete.
3. Add progress stats panel — update the existing stats bar to show `X/52 completed` alongside current counts.
4. "You Are Here" indicator — on page load, read `yotrt-current-week` from localStorage (or URL param `?week=N`). Highlight that node with a pulsing ring and scroll the graph to center it. A "Set as Current Week" button in the node info panel updates this.

**Files:** `public/weeks/knowledge-graph.html`

---

## Phase 3: Export + Layout Persistence

**Goal:** Implement planned features #1 and #2.

1. **Save/load graph layout** — after the D3 force simulation settles, offer a "Save Layout" button that serializes all node `{id, x, y}` to localStorage. On load, if saved positions exist, pre-position nodes and run simulation with low alpha (to respect saved positions). A "Reset Layout" clears the saved data and re-runs the default simulation.
2. **Export learning path as PDF** — when `showLearningPath()` renders its result panel, add a "Print / Export PDF" button that calls a `printLearningPath()` function. This opens a clean `window.print()` dialog with a custom print stylesheet that hides the graph and shows only the learning path cards. No external PDF library needed.

**Files:** `public/weeks/knowledge-graph.html`

---

## Phase 4: Embedding-Based Semantic Search

**Goal:** Implement planned feature #7 — "Embedding-based similarity (not just keyword)."

1. Upgrade `kg-server.js` — add `/api/embed-search` endpoint that sends the query and all week titles/descriptions to OpenRouter using a text embedding model (e.g., `thenlper/gte-large` via OpenRouter), compute cosine similarity, and return ranked results.
2. Update `performAISearch()` in HTML — fall through from main `/api/search` → `/api/embed-search` → local keyword fallback (existing `performSemanticSearch()` is last resort).
3. Improve local fallback `performSemanticSearch()` — upgrade from simple `includes()` to a TF-IDF-style multi-keyword scorer considering technique overlap and arc metadata.

**Files:** `public/weeks/knowledge-graph.html`, `public/deliverables/knowledge-graph/kg-server.js`

---

## Phase 5: Time-Based Animation (Timeline Mode)

**Goal:** Implement planned feature #8 — "Time-based animations (show curriculum over 52 weeks)."

1. Add a "Timeline" toggle button in the controls bar.
2. In timeline mode, hide all nodes initially, then animate them visually appearing one by one in week order (using D3 transitions and opacity/scale). Each node "materializes" over ~300ms with a brief pause between.
3. Add play/pause/speed controls (0.5×, 1×, 2×). Clicking a node during playback pauses and selects it.
4. Add a timeline scrubber (HTML input[range]) that can jump to any week and reveal all weeks up to that point.

**Files:** `public/weeks/knowledge-graph.html`

---

## Phase 6: 3D Graph Visualization

**Goal:** Implement planned feature #5.

1. Add ForceGraph3D via CDN (`//unpkg.com/3d-force-graph`) alongside existing D3 code.
2. Add a "Switch to 3D" / "Switch to 2D" toggle button.
3. In 3D mode, hide the D3 SVG and show a `<div id="3d-graph">` container. Mount ForceGraph3D with the same `allNodes` and `links` data, same arc color scheme, same click/hover behavior.
4. Sync node selection state between 2D and 3D modes so switching is seamless.

**Files:** `public/weeks/knowledge-graph.html`

---

## Phase 7: Collaborative / Social Features

**Goal:** Implement integration opportunity #4 — "Social features: share learning paths."

1. Add a "Share Path" button to the learning path result panel.
2. Clicking it encodes the ordered list of week IDs as a base64 URL param (e.g., `?path=eyJ3...`).
3. On page load, if `?path=` param is present, decode it, highlight those nodes in order, and auto-show the learning path panel.
4. Copy-to-clipboard with a "Link copied!" confirmation toast.
5. Optional: Add backend `/api/save-path` endpoint (POST) that saves path to a JSON file under `/public/deliverables/knowledge-graph/saved-paths/` and returns a short 6-char ID. Then the share URL is `?shared=ABC123`.

**Files:** `public/weeks/knowledge-graph.html`, `public/deliverables/knowledge-graph/kg-server.js` (if backend path saving is included)

---

## Phase 8: Dashboard Integration

**Goal:** Implement integration opportunity #2 — "Embed graph in main YoTRT dashboard."

1. In `index.html`, add a "Knowledge Graph" card/link in the navigation or feature section, pointing to `/public/weeks/knowledge-graph.html`.
2. Optionally embed a mini static preview image or a live `<iframe>` (at small scale) with a "Launch Full Graph" CTA.

**Files:** `index.html`

---

## Relevant Files

- `public/weeks/knowledge-graph.html` — main visualization (almost every phase)
- `public/deliverables/knowledge-graph/kg-server.js` — AI backend (Phases 4, 7)
- `public/deliverables/knowledge-graph/package.json` — backend config
- `index.html` — dashboard integration (Phase 8)
- `css_template.css` — style reference for new UI elements (all phases)

---

## Verification Steps

1. **Phase 1**: Open graph > click any week node > ensure "Open Week →" navigates correctly for weeks 1, 17, 25, 33, 41, 49. Confirm learning path and MITRE panels show styled UI not alerts.
2. **Phase 2**: Mark a week complete → refresh → verify checkmark persists. Set current week → check pulsing ring node.
3. **Phase 3**: Drag nodes, click "Save Layout" → refresh → nodes in same positions. Generate learning path → click "Print" → print dialog shows clean formatted path.
4. **Phase 4**: Start `kg-server.js` → run AI search for "privilege escalation" → verify results differ from keyword-only search.
5. **Phase 5**: Click "Timeline" → verify weeks appear one-by-one. Use scrubber to jump to week 25.
6. **Phase 6**: Click "Switch to 3D" → 3D graph appears with correct colors. Click a node → same info panel appears.
7. **Phase 7**: Generate learning path → click "Share" → URL updates → paste URL in new tab → path highlighted.
8. **Phase 8**: Open `index.html` → knowledge graph card visible and link works.
