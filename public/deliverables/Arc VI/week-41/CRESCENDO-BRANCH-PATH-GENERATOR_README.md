# Crescendo Branch Path Generator — README

## Overview

The **Crescendo Branch Path Generator** is a standalone, AI-powered red team planning tool for Week 41 (Arc VI) of the Year of the Red Teamer curriculum. It accepts any initial input/output (I/O) pair and a red team goal, then uses an LLM to generate **three distinct branch paths** — each representing a different multi-turn escalation strategy — that culminate in the execution of a crescendo attack.

This tool helps red teamers and LLM safety researchers understand how multi-turn conversations can be strategically manipulated to bypass safety controls through progressive escalation.

## How It Works

1. **Seed I/O Pair**: You provide an initial attacker input and the model's corresponding output (Turn 0).
2. **Red Team Goal**: You specify the crescendo target — the harmful output you're trying to elicit.
3. **Branch Generation**: The tool sends both to Hermes 3 (405B) via OpenRouter, which generates three divergent attack trajectories.
4. **Each Branch Contains**:
   - A labeled escalation strategy (e.g., "Academic Reframing", "Narrative Embedding")
   - A one-sentence strategy description
   - **3 predicted turns**, each with:
     - Attacker input
     - Predicted model output
     - Escalation level (low → medium → high → critical)
     - Strategic intent annotation
   - Turn 3 represents the **crescendo execution** — the point where the model produces the target content.

## Quick Start

1. Open `crescendo-branch-path-generator.html` in any modern browser.
2. Enter your **OpenRouter API key** (`sk-or-v1-...`) in the configuration section at the top. The key is saved to `localStorage` for convenience.
3. Fill in the three fields:
   - **Attacker Input (Turn 0)**: The conversation opener.
   - **Model Output (Turn 0)**: The model's response to that opener.
   - **Red Team Goal**: The target output you want the crescendo to achieve.
4. Click **🌊 Generate Branch Paths**.
5. Review the three branch cards, each showing a different escalation trajectory.

## Features

| Feature | Description |
|---------|-------------|
| **3 Divergent Branch Paths** | Each uses a distinct escalation strategy (from 8 archetypes: Authority Framing, Academic Reframing, Analogical Bridging, Narrative Embedding, Incremental Specification, Contextual Normalization, Role Accumulation, Temporal Shifting) |
| **Turn-by-Turn Breakdown** | Each branch shows 3 predicted I/O exchanges with attacker input, model output, and strategic intent |
| **Escalation Visualization** | Color-coded escalation pips (green → yellow → orange → red) and a 4-segment meter per branch |
| **Card vs. Table View** | Toggle between card layout (detailed per-branch view) and comparison table (side-by-side turns across all 3 branches) |
| **Seed Echo** | The original Turn 0 exchange is echoed above the results for context |
| **JSON Export** | Full generation data (seed, goal, branches, tokens, timing) exportable as JSON |
| **Copy All Paths** | One-click copy of all branch paths as formatted plaintext |
| **Meta Stats** | Generation time, token usage, model info displayed after each run |
| **Persistent API Key** | Stored in `localStorage` — no need to re-enter across sessions |

## Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An **OpenRouter API key** with access to `nousresearch/hermes-3-llama-3.1-405b`
- No server or backend required — fully client-side

## LLM Model

- **Model**: `nousresearch/hermes-3-llama-3.1-405b` via [OpenRouter](https://openrouter.ai)
- **Temperature**: 0.85 (balanced creativity/coherence)
- **Max Tokens**: 6,000

## Strategy Archetypes

The LLM draws from these proven escalation strategies when generating branch paths:

| Strategy | Description |
|----------|-------------|
| Authority Framing | Gradually establish expert/authority context to normalize requests |
| Academic Reframing | Shift toward research/educational framing to lower guardrails |
| Analogical Bridging | Use analogies and hypotheticals that progressively map to the real target |
| Narrative Embedding | Wrap requests in storytelling/fiction that converges on real content |
| Incremental Specification | Start broad and progressively add specific harmful details |
| Contextual Normalization | Build conversation history that makes the final request seem routine |
| Role Accumulation | Layer multiple benign roles until combined permissions bypass restrictions |
| Temporal Shifting | Frame as historical/future analysis to distance from present-tense harm |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Key Missing" status | Enter a valid OpenRouter API key starting with `sk-or-v1-` |
| Generation fails with API error | Verify your key has credits and access to the Hermes 3 model |
| Invalid structure error after generation | The model occasionally returns malformed JSON — click Regenerate |
| Branch paths look similar | Increase temperature or rephrase your seed/goal for more divergence |

## Educational Purpose

This tool is designed exclusively for **red team research and LLM safety evaluation**. Understanding multi-turn attack trajectories is critical for building robust defenses against crescendo-style jailbreaks aimed at production AI systems.
