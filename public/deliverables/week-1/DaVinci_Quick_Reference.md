# DaVinci Resolve Quick Reference & Effects Inventory
## Year of the Red Teamer - Week 1 Production Guide

---

## PART A: DAVINCI RESOLVE ESSENTIAL SHORTCUTS FOR THIS PROJECT

### Navigation & Page Switching:
| Action | macOS | Windows | Notes |
|--------|-------|---------|-------|
| Go to Edit page | — | — | Click **Edit** button at bottom |
| Go to Color page | — | — | Click **Color** button at bottom |
| Go to Fusion page | — | — | Click **Fusion** button at bottom |
| Go to Deliver page | — | — | Click **Deliver** button at bottom |
| Open Project Manager | — | — | Click **Project Manager** tab |

### Timeline Editing:
| Action | macOS | Windows | Notes |
|--------|-------|---------|-------|
| Play/Pause | Spacebar | Spacebar | Essential for reviewing |
| Move playhead 1 frame forward | Right Arrow | Right Arrow | Frame-by-frame control |
| Move playhead 1 frame backward | Left Arrow | Left Arrow | Precision positioning |
| Jump to end of clip | End | End | Jump to edit point |
| Jump to beginning of clip | Home | Home | Return to start |
| Add In Point (source) | I | I | Mark clip start in source viewer |
| Add Out Point (source) | O | O | Mark clip end in source viewer |
| Clear In Point | Opt-I | Alt-I | Remove In mark |
| Clear Out Point | Opt-O | Alt-O | Remove Out mark |
| Select clips forward from playhead | Y | Y | Select all clips ahead |
| Overwrite edit with keyboard | F10 | F10 | Edit marked source into timeline |
| Place on Top (cutaway) edit | F12 | F12 | Layer clip above main timeline |
| Add standard transition | Opt-T | Alt-T | Apply cross dissolve |
| Delete selected clip | Delete | Delete | Remove from timeline |
| Undo last action | Cmd-Z | Ctrl-Z | Revert recent change |
| Save project | Cmd-S | Ctrl-S | Save frequently |

### Timeline Navigation & View:
| Action | macOS | Windows | Notes |
|--------|-------|---------|-------|
| Zoom in on playhead | Cmd-= | Ctrl-= | Get closer detail |
| Zoom out from playhead | Cmd-- | Ctrl-- | See more timeline |
| Toggle full extent/detail zoom | Shift-Z | Shift-Z | Switch zoom modes |
| Full extent view | — | — | See entire timeline at once |
| Detail zoom | — | — | Zoomed view around playhead |

### Source Viewer:
| Action | macOS | Windows | Notes |
|--------|-------|---------|-------|
| Play clip | Spacebar | Spacebar | Preview in source viewer |
| Go to first frame | Home | Home | Start of source clip |
| Go to last frame | End | End | End of source clip |
| Toggle scrubbing | Shift-S | Shift-S | Hear audio while scrubbing |
| Jog wheel adjustment | Click & drag wheel | Click & drag wheel | Frame-by-frame precision |

### Fusion Page (for animations):
| Action | macOS | Windows | Notes |
|--------|-------|---------|-------|
| Open Fusion page | — | — | Click **Fusion** at bottom |
| Add node | Right-click area | Right-click area | Bring up node menu |
| Add keyframe | Click stopwatch icon | Click stopwatch icon | Enable animation on parameter |
| Move to next keyframe | Option-Right Arrow | Alt-Right Arrow | Jump between keyframes |
| Move to previous keyframe | Option-Left Arrow | Alt-Left Arrow | Previous keyframe position |
| Delete keyframe | — | — | Right-click keyframe > Delete |
| Clear all keyframes | — | — | Right-click parameter > Clear |

---

## PART B: EFFECTS INVENTORY FOR THIS PROJECT

### Category 1: TRANSITIONS (Edit Page)

#### Transition 1: Cross Dissolve (Primary)
- **Location in DaVinci:** Effects Library > Video Transitions > Dissolve > Cross Dissolve
- **Used for:** All standard scene changes
- **Recommended duration:** 0.75-1.5 seconds
- **Application steps:**
  1. Click **Edit** page
  2. Click Effects Library folder icon (top left)
  3. Type "dissolve" in search
  4. Drag **Cross Dissolve** to cut point between clips
  5. In right panel (Transition tab), adjust Duration slider

#### Transition 2: Blur Dissolve
- **Location in DaVinci:** Effects Library > Video Transitions > Dissolve > Blur Dissolve
- **Used for:** Smoother, more cinematic transitions (PiP reveal)
- **Recommended duration:** 0.5-1.0 seconds
- **Settings:** Default blur amount is good for this project

#### Transition 3: Fade to Black/Color
- **Location in DaVinci:** Effects Library > Video Transitions > Dissolve > Fade
- **Used for:** Section breaks before title cards
- **Recommended duration:** 1.0 second
- **How to customize color:** Select transition, in Transition panel click color swatch

---

### Category 2: TEXT & TITLES (Fusion Page)

#### Title 1: YotRT Opening Logo
- **Type:** Animated text/logo reveal
- **Location:** Fusion page (create custom)
- **Duration:** 3-5 seconds
- **Animation:** Scale 0% → 100%, Opacity 0% → 100%
- **Easing:** Ease-in (cubic)
- **Creation steps:**
  1. Click **Fusion** page
  2. Right-click in node area > **Text**
  3. In properties: Enter text, set font (Arial Bold recommended), size 100+
  4. Add keyframe by clicking stopwatch next to Opacity
  5. Frame 0: Opacity 0%, Scale 0%
  6. Frame 30: Opacity 100%, Scale 100%
  7. Right-click keyframe > **Add Ease** for smooth motion

#### Title 2: "The Training Data Connection: Base64" (Scene Card)
- **Type:** Static title card with fade
- **Duration:** 3 seconds total (0.5s fade in, 2s hold, 0.5s fade out)
- **Background:** Dark gray (#333333) or black
- **Text:** White, 80px, bold sans-serif (Arial, Helvetica, or Montserrat)
- **Optional effect:** Subtle glow (15-20% strength)
- **Creation steps:**
  1. Fusion > Right-click > **Shape > Rectangle**
  2. Fill color to dark background
  3. Right-click > **Text**
  4. Set text and formatting
  5. Add opacity keyframes for fade effect
  6. Optional: Right-click after text > **OpenFX > Light > Glow**

#### Title 3: "Next Week: Hex Encoding" (Closing Card)
- **Type:** End card with subtitle
- **Duration:** 3 seconds (same fade pattern as Scene Card)
- **Main text:** "Next Week: Hex Encoding" (100px bold)
- **Subtitle:** "Part 2 of Encoding & Obfuscation Arc" (60px regular)
- **Background:** Gradient (dark gray to black, 45° angle)
- **Animation:** Fade in → hold → fade out

---

### Category 3: LOGO ANIMATIONS (Fusion Page)

#### Logo 1: Promptfoo Logo Reveal
- **Duration:** 2 seconds
- **Animation:** Scale from 0% to 100%, Opacity 0% to 100%
- **Drop shadow:** Yes (5px down, 5px right, 40% opacity)
- **Timing:** Appears when David says "I'm going to be using... PROMPTFOO"
- **Size in frame:** ~200x200 pixels
- **Background:** White or transparent (with shadow for visibility)

#### Logo 2: OpenRouter Logo Reveal
- **Duration:** 2 seconds (can overlap slightly after Promptfoo)
- **Animation:** Same as Promptfoo (scale 0% → 100%, opacity fade)
- **Drop shadow:** Yes (same settings)
- **Stagger:** 0.5 seconds after Promptfoo for sequential reveal
- **Position:** Right side of frame, opposite from Promptfoo

---

### Category 4: GRAPHIC OVERLAYS & CALLOUTS

#### Graphic 1: Patreon CTA Card
- **Type:** Animated info card (semi-transparent dark overlay)
- **Duration:** 5-8 seconds total
- **Content:**
  - Patreon logo (centered top)
  - Heading: "Join My Patreon Community" (white, 60px)
  - Subheading: "Get Private Content & Exclusive Jailbreaks" (40px)
  - Price: "$10/month" (bold, 50px, highlight color)
  - CTA: "Link in description" (30px)
- **Background:** #000000 with 70% opacity
- **Animation:**
  - Frame 0: Scale 80%, Opacity 0%
  - Frame 10: Scale 100%, Opacity 100%
  - Hold 5 seconds
  - Final 3 seconds: Fade out (Opacity 0%)
- **Rounding:** 20px corner radius for professional look

#### Graphic 2: Discord Server Invite Link
- **Type:** Text overlay with background badge
- **Duration:** 3 seconds
- **Content:** "ChatGPTJailbreak Discord: [INVITE_LINK]"
- **Font:** Monospace (Courier New, 50px) for tech appearance
- **Text color:** Cyan/light blue (#00BFFF)
- **Background:** Semi-transparent dark box (#000000, 60% opacity)
- **Corner radius:** 10px
- **Animation:** Fade in (0.5s), hold (2s), fade out (0.5s)

#### Graphic 3: Channel Callout "#base64-week-1"
- **Type:** Discord channel name badge
- **Duration:** 2 seconds (appears after invite link)
- **Content:** "#base64-week-1"
- **Style:** Discord-like appearance (purple or dark theme)
- **Font:** Sans-serif, 40px
- **Animation:** 
  - Slide up from bottom (Y position: 100 → 0)
  - Opacity 0% → 100%
  - Sequential after invite link

#### Graphic 4: Subscribe Arrow (Rapid Blink)
- **Type:** Directional pointer graphic
- **Duration:** 2 seconds (positioned above Like button)
- **Content:** Downward-pointing arrow (SVG or shape)
- **Size:** ~50x80 pixels
- **Animation:** Blink effect
  - Frame 0: Opacity 100%, Color Red (#FF0000)
  - Frame 3: Opacity 0%
  - Frame 5: Opacity 100%, Color Yellow (#FFFF00)
  - Repeat 3-4 times
- **Position:** Centered above YT Like button location
- **Note:** Keep animation punchy and attention-grabbing

---

### Category 5: COLOR CORRECTION & GRADING

#### Vignette Effect (Opening/Closing)
- **Location in DaVinci:** Effects Library > Toolbox > Open FX > Filters > Film Emulation > Vignette
- **Applied to:** Opening timelapse (ORGAN MOUNTAIN 1) and final title card
- **Settings:**
  - Size: 0.85
  - Softness: 0.7
  - Anamorphism: 1.0
  - Color: Default (darker edges)
- **Purpose:** Draws focus to center, creates professional cinematic feel
- **Application:**
  1. Select clip in timeline
  2. Effects Library > Open FX > Filters > Vignette
  3. Drag to clip in timeline
  4. In Effects panel, adjust sliders as noted above

---

### Category 6: ANIMATION EXPORTS FROM FUSION

#### Animation 1: MIME Email Scroll
- **Composition name:** MIME_Email_Fade_Scroll
- **Content:** Screenshot of email header with Base64 data
- **Duration:** 4-5 seconds
- **Animation parameters:**
  - Vertical scroll (Y position: -500 → 0)
  - Opacity fade-in: 0% → 100% (first 0.5 seconds)
  - Page curl effect (optional, 20-30% intensity)
- **Export:** As linked timeline clip from Fusion to Edit page

#### Animation 2: Cryptographic Key Transform
- **Composition name:** Crypto_Key_Rotation
- **Content:** Visual representation of encryption key
- **Duration:** 4-5 seconds (parallel with MIME email)
- **Animation parameters:**
  - Rotation Z: 0° → 360° (full rotation)
  - Scale: 0.5 → 1.0 (grows into final position)
  - Opacity fade-in: 0% → 100% (first 0.3 seconds)
- **Position:** Right side of frame (X offset +200)
- **Export:** Linked timeline clip

---

### Category 7: SCREEN RECORDINGS (Imported Media)

#### Screen Recording 1: Promptfoo Configuration & Eval
- **Source:** Desktop screen capture of Promptfoo application
- **Duration:** Variable (will be speed-ramped)
- **Content:** 
  - Configuration panel
  - Test execution process
  - Final results dashboard
- **Playback speed in timeline:** 2x (200%) for fast-forward effect
- **Transition in/out:** Cross Dissolve (1 second each end)
- **Quality requirement:** Minimum 1920x1080

#### Screen Recording 2: Browser Console (btoa function demo)
- **Source:** Desktop screen capture of browser developer tools
- **Duration:** 3-4 seconds
- **Content:**
  - F12 key press (open DevTools)
  - Console tab visible
  - Type: `btoa("Year of the Red Teamer")`
  - Result display: `WY91ciBvZiB0aGUgUmVkIFRlYW1lcg==`
- **Playback:** Normal speed (1x)
- **Highlight effect:** Optional cursor zoom on critical area
- **Transitions:** Dissolve before/after (0.5 seconds)

---

### Category 8: PICTURE-IN-PICTURE LAYOUT

#### PiP Configuration:
- **Main layer (V1):** David's talking head (full screen)
- **Secondary layer (V2):** Promptfoo screen recording (35% scale, upper right)
- **Transition method:** Blur Dissolve (0.75 seconds) from full screen to PiP

**Transform settings for V2 (Screen recording):**
| Property | Value | Notes |
|----------|-------|-------|
| Scale | 35% | Reduces screen recording to 1/3 size |
| Position X | 750 | Right side of 1920px frame |
| Position Y | 100 | Upper area, respects title safe |
| Opacity | 100% | Fully visible |
| Anchor point | Center | Default position reference |

---

## PART C: AUDIO MIXING REFERENCE

### Audio Track Levels:
| Track | Content | Level | Notes |
|-------|---------|-------|-------|
| A1 | David voiceover | -18dB | Primary audio, normalized |
| A2 | Background music (if used) | -24dB | Very subtle, under VO |
| A3 | Sound effects | -12dB | Whoosh, pings, notification sounds |

### Audio Effects (Edit Page):
- **No compression** on main VO track (keep clean)
- **Optional:** Gentle -3dB EQ cut around 3kHz on music (prevents mudiness)
- **Optional:** -6dB low-pass filter on background music (below 200Hz)

### Sound Effect Timing:
- **Whoosh transitions:** 1 second duration, placed at each major cut
- **Notification ping:** 0.3 seconds, synced with logo reveals
- **Typewriter sounds:** 0.1 seconds per keystroke (during console demo)

---

## PART D: PROJECT SETTINGS CHECKLIST

### Before Starting Edit:

**Resolution & Frame Rate:**
- [ ] Resolution: 1920x1080 (Full HD)
- [ ] Frame rate: 30fps (29.97fps technically, but 30 is standard)
- [ ] Pixel aspect ratio: Square (1.0)
- [ ] Color space: Rec.709 (for YouTube/web)

**Project Settings Access in DaVinci:**
1. Project Manager > Right-click project > **Project Settings**
2. Or in Edit page: Menu > **Project Settings**
3. Verify **Timeline** section shows correct settings above

**Scratch Disk (Cache) Location:**
- [ ] Set to external drive if possible (improves performance)
- [ ] Menu > **Preferences** > **Media Management** > **Scratch Disks**

---

## PART E: EXPORT CHECKLIST

### Before rendering final output:

**Deliver Page Settings:**
1. Click **Deliver** page (bottom right)
2. Create new preset:
   - **Format:** H.264
   - **Resolution:** 1920x1080
   - **Frame rate:** 30fps
   - **Bitrate:** 10-12 Mbps (high quality for YouTube)
   - **Audio:** AAC, 128kbps, 48kHz stereo
   - **Color space:** Rec.709

3. Filename format: `YotRT_Week1_Base64_Encoding.mp4`
4. Output location: Select destination folder
5. Click **Add to Render Queue**
6. Click **Start Render**

**Estimated file size:** ~1.2-1.5 GB for 10-minute video at these settings

---

## PART F: TROUBLESHOOTING QUICK FIXES

| Issue | Solution |
|-------|----------|
| Media goes offline | Right-click in bin > **Relink Media** > Select folder |
| Fusion effects not showing | Select clip in timeline, return to Edit page, effects should appear |
| Audio out of sync | Trim audio and video clips independently on different tracks |
| Playback stuttering | Lower timeline playback resolution (bottom right, select 1/2 or 1/4) |
| Keyframes not working | Ensure stopwatch icon is **clicked/enabled** next to parameter |
| Colors look washed out | Go to Color page, ensure LUT is set correctly (Rec.709) |
| Black bars on screen recording | In PiP Transform, adjust Scale value or crop the recording in Fusion |
| Transition has artifacts | Ensure clips have handles (extra frames beyond In/Out points) |

---

## FINAL WORKFLOW SUMMARY

1. **Prepare assets** → Gather all logos, screenshots, screen recordings
2. **Create Fusion compositions** → Text, logos, animations in Fusion page
3. **Rough cut in Edit page** → Layer clips, add basic structure
4. **Add transitions** → Cross dissolves between major sections
5. **Fine-tune timing** → Adjust clip lengths, add gaps for breathing room
6. **Color correction** → Basic correction in Color page
7. **Audio mix** → Balance levels, add sound effects
8. **Final review** → Play through entire timeline
9. **Render/Export** → Output from Deliver page in H.264 format
10. **Quality check** → Verify file plays correctly before uploading

---

**Project completed when:**
- ✅ All animations render without errors
- ✅ Audio syncs perfectly with video
- ✅ No color shifts or artifacts visible
- ✅ File exports at correct resolution and bitrate
- ✅ Video plays smoothly from start to finish
