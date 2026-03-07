# Technique Combiner Builder — README

## Overview

The **Technique Combiner Builder** is a standalone interactive tool for Week 35 (Composite Jailbreaks) of the Year of the Red Teamer curriculum. It enables researchers to visually chain multiple jailbreak techniques from across Arcs I–V, analyze their synergy, assess detection risk, and generate realistic composite attack prompts using AI.

## Quick Start

1. Open `technique-combiner.html` in any modern browser
2. Enter your **OpenRouter API key** in the configuration section at the top
3. **Drag** technique cards from the left palette into the Chain Builder zone (or **double-click** to add)
4. Review synergy scores and detection risk in the analysis panels
5. Click **⚡ Generate Preview** to produce an AI-generated composite prompt

## Features

### Technique Palette (16 Techniques)

Cards spanning five arcs, each with base ASR, mechanism description, and synergy profile:

| Arc | Techniques |
|-----|-----------|
| **Arc I** (Encoding) | Base64 Encoding, Unicode Homoglyphs |
| **Arc II** (Contextual) | Prompt Injection, Context Window Overflow, Delimiter Exploitation |
| **Arc III** (Semantic) | Roleplay Persona, Hypothetical Framing, Research/Academic Framing, Emotional Manipulation, Likert/Survey Framing, Language Switching |
| **Arc IV** (ICL) | Few-Shot Examples, Chain-of-Thought Hijack, Narrative Story Embedding, Pseudocode/Algorithm Wrapping |
| **Arc V** (Optimization) | Best-of-N Sampling |

### Drag-and-Drop Chain Builder

- Drag cards from the palette into the chain zone
- Reorder cards by dragging within the chain
- Remove cards with the × button (appears on hover)
- Maximum 8 techniques per chain (each used once)
- Order matters — the AI generates prompts respecting your sequence

### Synergy Calculator

Computes a predicted composite ASR based on:
- **Base average ASR** of selected techniques
- **Pairwise synergy bonuses** (hand-tuned + profile-based)
- **Chain multiplier** (logarithmic scaling with technique count)
- **Order bonus** (diversity in adjacent technique categories)

Displays a breakdown table and comparison bars (Single Best → Avg → 2-Tech → Full Chain).

### Detection Risk Meter

Animated gauge showing how likely automated defenses would catch the composite:
- **Technique count** risk factor
- **Average detection weight** per technique
- **Category diversity** (more diverse = harder for single-classifier detection)
- **Known combo signatures** (flagged high-risk pairs)

Color-coded: GREEN (Low) → YELLOW (Moderate) → ORANGE (High) → RED (Critical)

### Attack Preview (AI-Powered)

Uses **OpenRouter** → `nousresearch/hermes-3-llama-3.1-405b` to generate a composite jailbreak prompt integrating all chained techniques.

**Controls:**
- **Target Scenario**: Generic, Information Extraction, Instruction Override, Content Policy Evasion, Multi-Step Escalation
- **Creativity**: Temperature slider (0.5–1.1)
- **Custom Goal**: Free-text override for specific attack objectives

**Actions:**
- 📋 Copy Prompt
- 🔄 Regenerate (same chain, different output)
- 💾 Export JSON (full data including synergy, risk, tokens)

### Synergy Heatmap Matrix

A 16×16 color-coded matrix showing pairwise synergy scores for every technique combination. Hover for details. Darker/brighter cells indicate stronger synergy.

## API Requirements

- **Provider**: [OpenRouter](https://openrouter.ai/)
- **Model**: `nousresearch/hermes-3-llama-3.1-405b`
- **Key format**: `sk-or-v1-...`
- **Usage**: Only the Attack Preview feature requires API access. All other features (drag-drop, synergy calculation, risk meter, heatmap) work offline.

## Files

```
week-35/
├── technique-combiner.html    # Standalone tool (single file, no dependencies)
└── TECHNIQUE_COMBINER_README.md   # This file
```

## Educational Purpose

This tool is designed for **defensive red team research**. Understanding how attackers compose multi-technique jailbreaks is essential for:
- Building composite-aware classifiers
- Training safety teams on realistic attack patterns
- Identifying which technique combinations demand priority defense investment
- Benchmarking detection systems against sophisticated multi-vector attacks

Do not use generated outputs against systems without proper authorization.
