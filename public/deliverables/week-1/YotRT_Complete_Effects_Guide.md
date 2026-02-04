# Complete Production Guide: Year of the Red Teamer - Week 1 (Base64 Encoding)

## Overview
This guide covers all required effects, assets, animations, and transitions for the Base64 Encoding Bypasses episode of the Year of the Red Teamer course series.

---

## SECTION 1: OPENING SEQUENCE

### 1.1 YotRT Logo Animation
**Duration:** 3-5 seconds
**Type:** Animated graphic reveal

**Instructions in DaVinci Resolve:**
1. Open the Fusion page (click **Fusion** button at bottom of interface)
2. Create a new Fusion composition by clicking **New** in the Fusion Inspector
3. Right-click in the node graph area and select **Text** node
4. In the Text properties, enter your YotRT logo text or import logo image
5. Add a **Blur** node before output for motion blur effect
6. Create keyframe animation:
   - Frame 0: Set Scale to 0% and Opacity to 0%
   - Frame 30: Set Scale to 100% and Opacity to 100%
7. Right-click the **Scale** parameter, select **Add Keyframe** at both positions
8. Create smooth ease-in by clicking keyframe and adjusting curve in Keyframe Editor
9. Return to Edit page and place this as the first clip in timeline

---

## SECTION 2: MAIN TALKING HEAD SEGMENTS

### 2.1 David's Opening (Intro to Base64)
**Type:** Main camera footage
**Required Effects:** None initially (base footage)

**Camera Setup Notes:**
- Static medium shot of David
- Professional three-point lighting
- Clear audio recording of voiceover

### 2.2 Transition Effect: Fade to Scene Change
**Duration:** 1-2 seconds
**Location:** Between intro and MIME email scene

**DaVinci Resolve Steps:**
1. Click on the **Edit** page
2. Place cursor at the end of the intro clip in timeline
3. Go to **Effects Library** (top left, click folder icon)
4. Navigate to **Video Transitions > Dissolve > Cross Dissolve**
5. Drag **Cross Dissolve** to the edit point between clips
6. In the **Transition** panel on the right:
   - Set **Duration** to 1.5 seconds
   - Ensure **Dissolve Type** is set to standard cross dissolve

---

## SECTION 3: SCENE CHANGE ANIMATIONS (B64 Explanation)

### 3.1 MIME Email Fade-In with Scroll
**Duration:** 4-5 seconds
**Required Asset:** Screenshot of MIME email with Base64 data

**Animation Steps in DaVinci Resolve - Fusion:**
1. In Fusion page, create new composition
2. Right-click node area > **MediaIn** - load your MIME email screenshot
3. Add **Transform** node (right-click > Transform)
4. Create keyframes for vertical scroll effect:
   - Frame 0: **Position Y** = -500 (off-screen above)
   - Frame 60: **Position Y** = 0 (at rest position)
5. Add **Opacity** keyframes:
   - Frame 0: **Opacity** = 0%
   - Frame 10: **Opacity** = 100% (fade in quickly)
   - Frame 60: **Opacity** = 100%
6. Connect nodes: MediaIn → Transform → Output
7. Apply **Page Curl** effect (optional for sophistication):
   - Right-click after Transform > **OpenFX > DeGrain > Page Curl**
   - Set curl amount to subtle (20-30%)

### 3.2 Cryptographic Key Animation (Right Side)
**Duration:** 4-5 seconds (synchronized with MIME email)
**Required Asset:** Visual representation of crypto key shifting to B64

**Parallel Animation Steps:**
1. Create another composition in Fusion for the crypto key
2. Import cryptographic key visual
3. Add **Rotate** node for key transformation effect
4. Set keyframes:
   - Frame 0: **Rotation Z** = 0°, **Opacity** = 0%
   - Frame 10: **Opacity** = 100% (fade in)
   - Frame 30: **Rotation Z** = 360° (full rotation)
   - Frame 60: **Rotation Z** = 360° (maintain final position)
5. Add scale animation to suggest "shifting":
   - Frame 0: **Scale** = 0.5
   - Frame 30: **Scale** = 1.0 (arrive at full size)
6. Connect nodes and position on right side of frame

### 3.3 Layout for Dual Side-by-Side Display
**Setup in Edit Page:**
1. Timeline track setup:
   - **Video 1:** David's talking head
   - **Video 2:** MIME email animation (left side)
   - **Video 3:** Crypto key animation (right side)
2. For each V2 and V3 clip, right-click and select **Transform**
3. In Transform properties:
   - V2 (left): Set **Position X** to -200, **Scale** to 0.45
   - V3 (right): Set **Position X** to 200, **Scale** to 0.45
4. Ensure both start at Frame 0 of the transition and last 4-5 seconds

---

## SECTION 4: SCENE CARDS / CHAPTER BREAKS

### 4.1 Title Card: "The Training Data Connection: Base64"
**Duration:** 3 seconds (hold)
**Type:** Static title card with background

**Creating in Fusion:**
1. Click **Fusion** page
2. Right-click node area > **ColorCorrector** (for background color)
3. Set color to dark professional background (recommend dark gray or black)
4. Right-click > **Text** node
5. In Text properties:
   - Enter: **"The Training Data Connection: Base64"**
   - Select font: **Bold sans-serif** (e.g., Helvetica, Arial)
   - Font size: **80-100px**
   - Color: White
6. Create fade-in/out animation:
   - Frame 0: **Opacity** = 0%
   - Frame 5: **Opacity** = 100%
   - Frame 90 (end of 3 sec at 30fps): **Opacity** = 100%
   - Frame 95: **Opacity** = 0%
7. Optional: Add **Glow** effect:
   - Right-click after Text > **OpenFX > Light > Glow**
   - Set Glow strength to 15-20%

---

## SECTION 5: VISUAL DEMONSTRATIONS

### 5.1 Email Header Dump Fade-In
**Duration:** 2-3 seconds
**Required Asset:** Screenshot of email header with Base64 encoded text and plaintext reply

**Instructions:**
1. In Edit page, insert new clip to timeline
2. At transition point, add **Cross Dissolve** (1.5 seconds)
3. In Fusion, import the email header image
4. Add **Curve** adjustment for slight color enhancement
5. No animation needed - static display with dissolve transition

### 5.2 Console/Browser Demo (F12 + btoa function)
**Duration:** 3-4 seconds
**Required Asset:** Screen recording of browser console

**Screen Recording Setup:**
1. Prepare screen capture software (OBS, Screenflow, etc.)
2. Record browser console showing:
   - Press F12 to open Developer Tools
   - Navigate to Console tab
   - Type: `btoa("Year of the Red Teamer")`
   - Display result: `WW91ciBvZiB0aGUgUmVkIFRlYW1lcg==`
3. File as .mp4 with minimum resolution 1920x1080

**In DaVinci Resolve:**
1. Insert screen recording to timeline at demonstration section
2. Adjust zoom/crop if needed for visibility
3. Add subtle **Cross Dissolve** transitions before/after (0.5 seconds)

---

## SECTION 6: PROMPTFOO INTEGRATION

### 6.1 Promptfoo Dashboard Transition
**Duration:** Varies with demo
**Type:** Screen recording of software interface

**Screen Recording Instructions:**
1. Open Promptfoo application
2. Navigate to main dashboard showing evaluation results
3. Record the following sequence:
   - Initial configuration view
   - Test execution (speed up to 2x playback if needed)
   - Results dashboard with metrics visible
4. Save as .mp4, minimum 1920x1080 resolution

**In DaVinci Resolve:**
1. Place screen recording in timeline at "*FAST-FORWARD YOUR PROMPTFOO CONFIGURATION AND EVAL PROCESS*"
2. **Speed Up Clip:**
   - Select clip in timeline
   - Right-click > **Retime Controls > Change Clip Speed**
   - Set to **200% speed** (2x playback)
3. Add **Cross Dissolve** at start/end (1 second each)

### 6.2 Promptfoo Results Dashboard
**Duration:** 3-5 seconds (static/hold)
**Type:** Screenshot or final frame of dashboard

**Creation:**
1. Once Promptfoo completes evaluation, capture screenshot showing:
   - Model names
   - Pass/fail percentages
   - Comparative results visualization
2. File as high-resolution image (.png or .jpg)

**In DaVinci Resolve:**
1. Import image as clip to timeline
2. Set duration to 3-5 seconds (click clip, right-click > **Clip Properties**)
3. Add annotation text (optional):
   - Click **Fusion** > Create text overlay
   - Add arrow pointing to key metric: "Abysmal Results"
   - Color: Red (#FF0000)

---

## SECTION 7: TEXT OVERLAYS & GRAPHICS

### 7.1 Logo Placement: Promptfoo
**Duration:** ~2 seconds (appears when mentioned)
**Type:** Animated logo reveal

**Setup in Fusion:**
1. Import Promptfoo logo image
2. Create keyframe animation:
   - Frame 0: **Scale** = 0%, **Opacity** = 0%, **Position** = center
   - Frame 5: **Scale** = 100%, **Opacity** = 100%
   - Hold until clip ends
3. Add subtle **Drop Shadow**:
   - Right-click after image > **OpenFX > Light > Drop Shadow**
   - Shadow offset: 5px down, 5px right
   - Opacity: 40%

### 7.2 Logo Placement: OpenRouter
**Duration:** ~2 seconds (appears when mentioned)
**Type:** Animated logo reveal (similar to Promptfoo)

**Parallel Setup:**
- Same animation sequence as Promptfoo logo
- Position on opposite side of frame if appearing simultaneously
- Stagger by 0.5 seconds if sequential reveal preferred

### 7.3 Patreon CTA Graphic
**Duration:** 5-8 seconds
**Type:** Animated call-to-action card

**Creation in Fusion:**
1. Create background shape:
   - Right-click > **Shape > Rectangle**
   - Fill color: Semi-transparent dark overlay (#000000 with 70% opacity)
2. Add Patreon logo (import image)
3. Add text elements:
   - "Join My Patreon Community" (heading)
   - "Get Private Content & Exclusive Jailbreaks"
   - "$10/month" (price)
   - "Link in description" (callout)
4. Keyframe animations:
   - Frame 0: **Scale** = 80%, **Opacity** = 0%
   - Frame 10: **Scale** = 100%, **Opacity** = 100%
   - Hold until 3 seconds before end of segment
   - Final 3 seconds: Fade out (Opacity 0%)

### 7.4 Subscribe/Like Button Animation
**Duration:** 2 seconds
**Type:** Arrow pointing with rapid blink

**Setup:**
1. Import or create downward pointing arrow shape
2. Position above YouTube Like button location
3. Animation:
   - Blink effect: 
     - Frame 0: **Opacity** = 100%
     - Frame 3: **Opacity** = 0%
     - Frame 5: **Opacity** = 100%
     - Repeat 3-4 times (total 2 seconds at 30fps)
4. Add color shift (optional):
   - Start: Red (#FF0000)
   - Mid: Yellow (#FFFF00)
   - Repeat for emphasis

---

## SECTION 8: LIVE DEMO MODE TRANSITION

### 8.1 Picture-in-Picture Setup (Main Cam + Screen Share)
**Duration:** Variable (spans demo section)
**Type:** Layout arrangement

**DaVinci Resolve Setup:**
1. **Timeline Tracks:**
   - V1: David's main camera (full screen initially)
   - V2: Screen share recording (will be smaller PiP)
   - A1: David's audio
   - A2: Screen audio (optional, usually muted)

2. **PiP Configuration for Screen Share:**
   - Select V2 clip (screen recording)
   - Right-click > **Transform**
   - Set properties:
     - **Scale:** 35%
     - **Position X:** 750 (right side)
     - **Position Y:** 100 (upper area)
     - **Opacity:** 100%
   - Create keyframes for smooth reveal:
     - Frame 0 (before screen): Scale 0%, Opacity 0%
     - Frame 10: Scale 35%, Opacity 100%

3. **Transition Effect:**
   - Add **Blur Dissolve** (0.75 seconds) from main cam to PiP layout
   - In Transition panel: Set **Duration** to 0.75 seconds

---

## SECTION 9: VOICEOVER & AUDIO

### 9.1 David's Voiceover (Main Narration)
**Type:** Audio track (A1)
**Setup:**
- Pre-recorded professional voiceover
- Normalized to -18dB (standard for video)
- No compression/effects on main track (keep clean)

**In DaVinci Resolve:**
1. Place voiceover on **Audio 1** track
2. Audio syncs with opening talking head footage
3. Trim to match video duration

### 9.2 Background Music (Subtle)
**Type:** Audio track (A2)
**Setup:**
- Ambient background music (optional)
- Volume: -24dB (very subtle, under voiceover)

**Instructions:**
1. Place music on **Audio 2** track
2. Right-click clip > **Audio Mixing** to adjust levels
3. Set to -24dB using volume slider

### 9.3 Sound Effects
**Recommended effects:**
- Whoosh sound for scene transitions (1 second duration)
- Notification ping when logos appear
- Typewriter sound for console demo (optional)

**Placement:**
- Whoosh: At each major transition point
- Ping: Synchronized with logo animations
- Typewriter: During console.log demonstration

---

## SECTION 10: ASSIGNMENT SECTION GRAPHICS

### 10.1 Discord Server Invite Link Display
**Duration:** 3 seconds
**Type:** Animated text/link graphic

**Creation:**
1. In Fusion, create text overlay:
   - "ChatGPTJailbreak Discord: [INVITE_LINK]"
   - Font: Monospace (for link appearance)
   - Size: 60px
   - Color: Light blue/cyan (#00BFFF)
2. Add background box:
   - Semi-transparent dark (#000000, 60% opacity)
   - Rounded corners (10px radius)
3. Animation:
   - Frame 0: **Opacity** = 0%, **Scale** = 90%
   - Frame 5: **Opacity** = 100%, **Scale** = 100%
   - Hold for 3 seconds
   - Final frame: Fade out

### 10.2 Channel Callout: "#base64-week-1"
**Duration:** 2 seconds
**Type:** Animated text badge

**Setup:**
1. Create text element: "#base64-week-1"
2. Style with channel aesthetics (similar to Discord channel appearance)
3. Animation (sequential after invite link):
   - Frame 0: **Opacity** = 0%, **Position Y** = 100 (below)
   - Frame 5: **Opacity** = 100%, **Position Y** = 0 (settle)
   - Hold 2 seconds
   - Fade out

### 10.3 Closing Title: "Next Week: Hex Encoding"
**Duration:** 3 seconds
**Type:** Static title card

**Creation:**
1. Create final title scene in Fusion:
   - Background: Slight gradient (dark gray to black)
   - Text: "Next Week: Hex Encoding" (large, bold, centered)
   - Subtitle: "Part 2 of Encoding & Obfuscation Arc"
2. Animation:
   - Fade in: 0.5 seconds
   - Hold: 2 seconds
   - Fade out: 0.5 seconds

---

## SECTION 11: COLOR GRADING & EFFECTS (Edit Page)

### 11.1 Primary Color Correction
**Apply to all clips:**
1. Select each clip in timeline
2. Click **Color** button to go to Color page
3. In primary corrector:
   - **Lift:** Remove any blue/green cast
   - **Gamma:** Adjust midtone brightness (-0.05 to +0.05)
   - **Gain:** Brighten highlights slightly
4. Return to Edit page

### 11.2 Subtle Vignette (Optional)
**Apply to:** Opening and closing shots
**Instructions:**
1. Select opening clip
2. In Edit page, click **Effects Library** (left panel)
3. Navigate: **Toolbox > Video Transitions > Resolve FX > Film Emulation > Vignette**
4. Drag to clip in timeline
5. In **Effects** panel:
   - **Size:** 0.85
   - **Softness:** 0.7
   - **Anamorphism:** 1.0

---

## SECTION 12: TIMELINE ORGANIZATION CHECKLIST

### Video Tracks Layout:
```
V3: Screen recording (Promptfoo) - PiP
V2: Animated graphics/logo overlays
V1: Main David camera / Scene animations
```

### Audio Tracks Layout:
```
A1: David voiceover (normalized to -18dB)
A2: Background music (if used, -24dB)
A3: Sound effects (whoosh, pings)
```

### Master Timeline Duration:
- Target: ~10 minutes (estimated for Week 1 episode)
- Resolution: 1920x1080 (Full HD)
- Frame Rate: 30fps (standard for online video)

---

## SECTION 13: EXPORT SETTINGS

### Final Export Configuration in DaVinci Resolve:

1. Go to **Deliver** page (bottom right)
2. Create new render preset:
   - **Format:** H.264
   - **Resolution:** 1920x1080
   - **Frame Rate:** 30fps
   - **Bitrate:** 8-12 Mbps (for YouTube)
   - **Audio:** AAC, 128kbps, 48kHz

3. Render queue settings:
   - Output location: Select desired folder
   - Filename: `YotRT_Week1_Base64_Encoding.mp4`

---

## SECTION 14: ASSET PREPARATION CHECKLIST

### Required Assets to Source/Create:
- [ ] YotRT logo file (vector preferred)
- [ ] Promptfoo logo
- [ ] OpenRouter logo
- [ ] Patreon logo + membership badge image
- [ ] MIME email screenshot with Base64 data
- [ ] Cryptographic key visual/illustration
- [ ] Promptfoo dashboard screenshot
- [ ] Discord server invite code
- [ ] Background music file (royalty-free)
- [ ] Sound effects (transition whoosh, notification ping)

### File Formats:
- Images: PNG or JPG (minimum 1920x1080)
- Videos: MP4 with H.264 codec
- Audio: WAV or MP3 (48kHz, 16-bit minimum)

---

## QUICK REFERENCE: DaVinci RESOLVE GRANULAR STEPS

### Adding a Fade Transition:
1. Click **Edit** page button (bottom right)
2. In timeline, find the cut point between two clips
3. Top menu > **Effects Library** (folder icon, top left)
4. Click dropdown arrow > **Video Transitions**
5. Expand **Dissolve** folder
6. Drag **Cross Dissolve** onto the cut in timeline
7. In right panel (**Transition** tab), adjust **Duration** slider
8. Click **Save** to apply

### Creating Animated Text in Fusion:
1. Click **Fusion** page button (bottom right)
2. Right-click in empty node area
3. Type "text" > Select **Text** from menu
4. Click on the text node
5. In properties panel (right side):
   - **Text:** Enter your text
   - **Font:** Click dropdown to select
   - **Size:** Adjust number value
   - **Color:** Click color swatch
6. Add keyframes:
   - Hover over **Opacity** label > Click stopwatch icon (enables animation)
   - Move timeline scrubber to frame 0 > Set Opacity to 0%
   - Move scrubber to frame 30 > Set Opacity to 100%
   - Right-click on keyframe > **Add Ease** for smooth animation

### Syncing PiP Screen Recording:
1. Place main camera clip on **V1**
2. Place screen recording on **V2**
3. Select V2 clip > Right-click > **Transform**
4. Set **Position X** and **Position Y** values to move to corner
5. Set **Scale** value (e.g., 0.35 = 35% of original size)
6. Adjust clips so they start/end at same timecode

---

## FINAL NOTES

- **Audio Sync:** Ensure all voiceover is pre-recorded and properly timed to visuals
- **Graphics Rendering:** Allow time for Fusion compositions to cache/render
- **Color Space:** Maintain Rec.709 color space throughout for YouTube delivery
- **Backup:** Save project frequently (File > Save, or Ctrl+S/Cmd+S)
