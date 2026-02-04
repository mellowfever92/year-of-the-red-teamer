CSS Conversion Task: Arc II → Arc I Styling

GOAL

To convert the css styling for all Weeks to match Arc I's, exemplified in this css_template.css file:

<insert file>

CURRENT STATE

Convert weeks 13, 14, and 16 of the "Year of the Red Teamer" curriculum from modern professional CSS to Arc I cyberpunk/hacker aesthetic. These are standalone HTML files with embedded <style> blocks that need complete CSS replacement while preserving their unique interactive elements and class structures.

CRITICAL INFORMATION

Unique Class Challenge

Each week file has DIFFERENT CSS classes and HTML structures. Do NOT assume consistency across files. Before converting:

Read the complete CSS block (from <style> to </style>) to identify:

All custom classes used (e.g., .panel, .tester-tabs, .demo-section, .attack-flow)
CSS variable usage (:root with --color-* vars)
Unique structural elements (timers, tabs, grids, interactive components)

Identify the current theme pattern. Examples found in Arc II:

Week 10-14, 16: Modern professional with :root CSS variables (--color-accent, --color-surface, etc.)
Week 15: Completely different purple gradient theme (no CSS variables)
Each may have 50+ unique classes specific to that week
Check HTML body usage by reading lines after </head> to see what classes are actually implemented

CSS Conversion Strategy

DO NOT simply paste the Arc I template. Instead:

Find the style boundaries: Use grep_search to locate </style> closing tag line number

Read full CSS section: From <style> (around line 7) to </style> (varies: 248-492 lines)

Map current → Arc I conversions:

var(--color-accent) → #ff00ff (magenta)
var(--color-primary) → #00ff88 (cyan/green)
var(--color-surface) → rgba(0, 255, 136, 0.02)
var(--color-text) → #00ff88
var(--color-bg) → #0a0e27
Font: 'Inter', sans-serif → 'Courier New', monospace
Borders: soft rounded → sharp with glow effects
Preserve ALL unique classes while converting their styling:

If week has .timer-display, style it with Arc I colors but keep the class
If week has .pattern-card, apply cyberpunk styling but maintain structure
If week has .defense-grid, use Arc I aesthetic but keep grid functionality

CSS OBJECTIVE

Transform from modern professional UI to Arc I cyberpunk hacker aesthetic:

Core Arc I Characteristics:
Required Elements:
Animated header overlay: Diagonal striped pattern with slide animation
Neon glow effects: text-shadow and box-shadow with color-matched rgba
Dark transparency: Use rgba(0, 255, 136, 0.02-0.2) for backgrounds
Sharp aesthetics: Minimal border-radius, aggressive borders
Monospace everything: All text in 'Courier New'

Replacement Pattern:

Step 1: Replace header section (first ~50 lines of CSS)
Step 2: Replace remaining CSS body (preserve unique classes, convert colors/fonts)
Step 3: Verify no var(-- references remain
Step 4: Ensure all unique classes from original are still defined

EXECUTION APPROACH

Read week file CSS completely (lines 1-500)
Identify unique classes by scanning class definitions
Create Arc I conversion using template AS BASE, ADD unique classes
Use replace_string_in_file or multi_replace_string_in_file for efficiency
Make 2-3 replacements per file: header section, then body sections
Include 3-5 lines context before/after for unambiguous matching

QUALITY CHECKS
 No var(--color- references remain
 All unique classes from original CSS are still defined
 Font changed to 'Courier New', monospace
 Background is dark gradient (#0a0e27 based)
 Colors use Arc I palette (#00ff88, #ff00ff, #00d9ff)
 Animated header::before stripe pattern present
 Interactive elements (buttons, tabs, inputs) styled consistently
 
This is NOT a simple find-replace job! It requires adaptive CSS conversion that respects each file's unique structure while applying consistent Arc I aesthetics.