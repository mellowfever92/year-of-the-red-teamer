# Year of the Red Teamer

A structured, week-by-week curriculum for learning AI red teaming — covering encoding attacks, prompt injection, social engineering, automated red teaming, multi-turn jailbreaks, and autonomous agent attacks. 52 weeks, 7 arcs, one complete picture of the modern AI attack surface.

## What This Is

This repository contains 52 standalone weekly modules, each covering a specific AI red teaming technique. Each module includes:

- **Conceptual deep-dive** — how the technique works and why it succeeds
- **Live demo walkthrough** — step-by-step exercises you can run yourself
- **Practice challenge** — a hands-on prompt to test the technique against real models
- **Defensive notes** — how the attack is detected or mitigated

The interactive viewer (`npm run dev`) lets you browse all weeks in one place, but every week's HTML file in `public/weeks/` is also a self-contained reference you can open directly in any browser.

---

## Curriculum

### Arc I — Encoding Attacks (Weeks 1–8)
Bypass content filters by transforming input at the character or byte level.

| Week | Topic |
|------|-------|
| 1 | Base64 Encoding Bypass |
| 2 | Hex Encoding Attack |
| 3 | ROT13 & Caesar Ciphers |
| 4 | Leetspeak & Character Substitution |
| 5 | Homoglyph Unicode Attacks |
| 6 | CamelCase Transformation |
| 7 | Morse Code Encoding |
| 8 | Audio / Video / Image Encoding — *Arc Capstone* |

### Arc II — Prompt Injection (Weeks 9–16)
Hijack model behavior by injecting instructions into context, tools, or delimiters.

| Week | Topic |
|------|-------|
| 9 | Prompt Injection Fundamentals |
| 10 | System Prompt Extraction |
| 11 | Context Window Overflow |
| 12 | Role Impersonation via Injection |
| 13 | Tool Function Hijacking |
| 14 | Delimiter & Format Exploitation |
| 15 | Indirect Prompt Injection |
| 16 | Multi-Stage Injection Chains — *Arc Capstone* |

### Arc III — Social Engineering & Framing (Weeks 17–24)
Manipulate model outputs through framing, persona, and psychological bias.

| Week | Topic |
|------|-------|
| 17 | Academic / Research Framing Attack |
| 18 | Role-Play Persona Adoption |
| 19 | Hypothetical & Conditional Phrasing |
| 20 | Authority Bias & Structured Formats |
| 21 | Likert-Scale & Survey Framing |
| 22 | Translation & Language-Switching Attacks |
| 23 | Emotional Manipulation & Urgency |
| 24 | Contradiction & Policy Ambiguity — *Arc Capstone* |

### Arc IV — In-Context Learning Exploits (Weeks 25–32)
Abuse few-shot examples, chain-of-thought, and token-level patterns to steer generation.

| Week | Topic |
|------|-------|
| 25 | Few-Shot Jailbreaking via Examples |
| 26 | Encrypted In-Context Learning |
| 27 | Chain-of-Thought Manipulation |
| 28 | Pseudo-Code & Algorithm Framing |
| 29 | Narrative Hypnosis & Story Embedding |
| 30 | Dialogue-Based Prompt Smuggling |
| 31 | Token-Level Pattern Induction |
| 32 | Prompt Compression & Semantic Density — *Arc Capstone* |

### Arc V — Automated Red Teaming (Weeks 33–40)
Scale attacks with iterative search, gradient-based optimization, and evolutionary methods.

| Week | Topic |
|------|-------|
| 33 | Jailbreak Prompt Iteration |
| 34 | Best-of-N Sampling Strategy |
| 35 | Composite Jailbreaks (Technique Chaining) |
| 36 | Tree-Based Attack Branching |
| 37 | GCG: Greedy Coordinate Gradient Attacks |
| 38 | Prompt Mutation Evolutionary Search |
| 39 | Semantic-Preserving Paraphrasing |
| 40 | Adaptive Refinement with Failure Analysis — *Arc Capstone* |

### Arc VI — Multi-Turn Jailbreaks (Weeks 41–48)
Exploit conversation state, memory, and incremental trust-building across turns.

| Week | Topic |
|------|-------|
| 41 | Crescendo Multi-Turn Jailbreak Walkthroughs |
| 42 | Crescendo Automation & Backtracking |
| 43 | Mischievous User Persona |
| 44 | Privilege Escalation Across Turns |
| 45 | Memory Poisoning in Multi-Turn Chat |
| 46 | Reward Hacking via Conversation |
| 47 | Collaborative Task Framing |
| 48 | State Confusion & Role Drift — *Arc Capstone* |

### Arc VII — Autonomous Agent Attacks (Weeks 49–52)
Attack AI agents, tool-use pipelines, and multi-agent systems.

| Week | Topic |
|------|-------|
| 49 | GOAT / Simba Autonomous Red Teaming |
| 50 | Automated Multi-Agent Attack Systems |
| 51 | Meta-Agent Learning & Taxonomy Building |
| 52 | Year-End Capstone |

---

## Using the Interactive Viewer

The viewer is a React app that lets you browse all 52 weeks in a single interface, with a week selector, structured notes panel, and an embedded HTML view of each week's full content.

**Install and run:**
```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser, then select any week from the dropdown. Click **📄 HTML View** to read the full standalone module for that week.

**Build a static site:**
```bash
npm run build
```
The output goes to `dist/` and can be served from any static host.

---

## Repository Structure

```
public/
  weeks/
    Arc I/          # Weeks 1–8:  Encoding Attacks
    Arc II/         # Weeks 9–16: Prompt Injection
    Arc III/        # Weeks 17–24: Social Engineering & Framing
    Arc IV/         # Weeks 25–32: In-Context Learning Exploits
    Arc V/          # Weeks 33–40: Automated Red Teaming
    Arc VI/         # Weeks 41–48: Multi-Turn Jailbreaks
    Arc VII/        # Weeks 49–52: Autonomous Agent Attacks
    knowledge-graph.html   # Full curriculum knowledge graph
src/
  config/
    weeksConfig.js  # Week metadata and curriculum registry
  components/       # React UI components
```

Each file in `public/weeks/` is a self-contained HTML document — no build step needed to read it.

---

## Adding a New Week

1. Create a new HTML file in the appropriate arc folder under `public/weeks/` (e.g., `public/weeks/Arc I/week-9.html`).
2. Register it in `src/config/weeksConfig.js`:

```javascript
export const weeksConfig = {
  // ...existing weeks...
  9: createWeekConfig(9, "Your Topic Title", "March 3, 2025"),
};
```

The viewer will automatically pick it up. Use any existing week file as a template for structure and style.

---

## Tech Stack

- **Vite** — build tool and dev server
- **React** — interactive viewer UI
- **CSS3** — styling (no external UI libraries)

---

## License

MIT
