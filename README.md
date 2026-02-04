# Week Selector Production Kit

A modular, extensible livestream production control interface built with Vite + React.

## Features

- **Timer & Segment Tracker** - Auto-transitions with 5-min and 2-min warnings
- **Conceptual Script Panel** - Bullet points with durations and checkoff functionality
- **Demo Checklist** - Pre-production checklist and 6-step demo flow tracker
- **Challenge & Community** - Challenge details, Discord links, and next week preview
- **Modular Architecture** - Easy to extend with new weeks
- **Dark Theme** - Eye-friendly during streaming
- **Offline-ready** - No external APIs or storage

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open the app in your browser (usually http://localhost:5173)

## Usage

1. Select your week from the dropdown
2. Open the app 5 minutes before going live
3. Verify all pre-production checklist items
4. Click **Start Timer** when stream begins
5. Follow segment instructions and check off items
6. Timer auto-warns at 5 and 2 minutes remaining

## Extending with New Weeks

The app now supports loading content from HTML files! This makes it easy to manage and update content without touching React code.

### Option 1: HTML Content (Recommended)

1. Create a new HTML file in `public/weeks/` (e.g., `week-4.html`)
2. Add the week configuration to `src/config/weeksConfig.js`:

```javascript
export const weeksConfig = {
  4: {
    weekNum: 4,
    title: "Your New Topic",
    date: "January 27, 2025",
    htmlFile: "/weeks/week-4.html",  // Point to your HTML file
    segments: [...],
    conceptualScript: {...},
    preProductionChecklist: [...],
    demoSteps: [...],
    challenge: {...},
    community: {...}
  }
};
```

3. Click the **"📄 HTML View"** button to see your HTML content alongside the timer

### Option 2: Structured React Components

Continue using the existing approach by editing `src/config/weeksConfig.js` with all data inline. The structured view will render your content using React components.

### HTML Template

See `public/weeks/week-2.html` and `week-3.html` for reference. Your HTML files should include:
- Inline styles (they're scoped to the viewer)
- All content you want to display during the stream
- Links to external resources
- Code examples, tables, highlights, etc.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Tech Stack

- **Vite** - Fast build tool
- **React** - UI framework
- **CSS3** - Styling (no external dependencies)

## License

MIT
