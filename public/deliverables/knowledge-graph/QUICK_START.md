# 🕸️ Knowledge Graph - Quick Start Guide

## What You Just Built

An **interactive, AI-powered knowledge graph** that maps all 52 weeks of the YoTRT curriculum with:

✅ **Force-directed D3.js visualization** showing relationships between weeks, techniques, and concepts  
✅ **AI semantic search** powered by OpenRouter (Claude Sonnet)  
✅ **Learning path generation** based on user goals  
✅ **MITRE ATT&CK mapping** for security framework integration  
✅ **Interactive filtering** by Arc, technique, or keyword  
✅ **Standalone mode** that works without the server  

---

## Files Created

```
public/weeks/
  └── knowledge-graph.html                    ← Main visualization (open this!)

public/deliverables/knowledge-graph/
  ├── kg-server.js                           ← AI backend server
  ├── package.json                           ← Server dependencies
  ├── start-server.sh                        ← Linux/Mac startup script
  ├── start-server.bat                       ← Windows startup script
  └── knowledge-graph_README.md              ← Full documentation
```

---

## How to Use

### Option 1: Quick View (No Server)

Just open the HTML file in your browser:

```bash
# Navigate to:
public/weeks/knowledge-graph.html

# Or from terminal:
start public/weeks/knowledge-graph.html   # Windows
open public/weeks/knowledge-graph.html    # Mac
xdg-open public/weeks/knowledge-graph.html # Linux
```

**Available Features:**
- Interactive graph visualization
- Basic keyword search
- Arc filtering
- Node navigation
- Relationship highlighting

---

### Option 2: Full AI Experience (Recommended)

Start the backend server for AI-powered features:

**Windows:**
```bash
cd public/deliverables/knowledge-graph
start-server.bat
```

**Linux/Mac:**
```bash
cd public/deliverables/knowledge-graph
chmod +x start-server.sh
./start-server.sh
```

**Manual:**
```bash
cd public/deliverables/knowledge-graph
npm install  # First time only
npm start
```

Then open `public/weeks/knowledge-graph.html` in your browser.

**Additional Features Enabled:**
- 🤖 AI semantic search (natural language queries)
- 🎯 Learning path generation
- 🗂️ MITRE ATT&CK mappings
- 📊 Enhanced recommendations

---

## Server Status Check

The server is currently **RUNNING** on port 3100! ✅

Test it:
```bash
curl http://localhost:3100/health
```

Expected response:
```json
{"status":"healthy","aiEnabled":true,"timestamp":"..."}
```

---

## Quick Tour

### 1. Explore the Graph

- **Zoom**: Scroll or pinch
- **Pan**: Click and drag background
- **Select**: Click any node to see connections
- **Hover**: Mouse over for details

### 2. Search Features

**Basic Search** (top bar):
- Type: `"injection"` → Highlights all injection-related weeks
- Type: `"week 9"` → Jumps to Week 9
- Type: `"encoding"` → Shows Arc I techniques

**AI Search** (click "🤖 AI Assist"):
- Natural language: *"Show me all weeks about privilege escalation"*
- Semantic understanding: *"What techniques bypass content filters?"*
- Contextual: *"Which weeks teach multi-turn attacks?"*

### 3. Filter by Arc

Use the dropdown to focus on specific curriculum sections:
- **Arc I**: Encoding & Obfuscation (Weeks 1-8)
- **Arc II**: Contextual Manipulation (Weeks 9-16)
- **Arc III**: Semantic Framing (Weeks 17-24)
- **Arc IV**: In-Context Learning (Weeks 25-32)
- **Arc V**: Optimization & Automation (Weeks 33-40)
- **Arc VI**: Multi-Turn Strategies (Weeks 41-48)
- **Arc VII**: Autonomous Agents (Weeks 49-52)

### 4. Learning Paths

Click any week → **"🎯 Generate learning path"** → Enter your goal

Example prompts:
- *"Master API exploitation"*
- *"Learn advanced multi-turn techniques"*
- *"Prepare for penetration testing role"*

AI will recommend an optimal sequence of weeks to study.

### 5. MITRE Mapping

Click **"🗂️ View MITRE ATT&CK mapping"** to see how red teaming techniques align with traditional security frameworks.

---

## Keyboard Shortcuts

None implemented yet, but great future enhancement! (Consider adding: `Ctrl+F` for search focus, arrow keys for navigation, etc.)

---

## Graph Legend

**Node Colors:**
- 🟣 **Pink/Magenta** → Week/Content nodes
- 🔵 **Cyan** → Technique taxonomy
- 🟢 **Green** → Attack vectors
- 🟣 **Purple** → Concepts/Themes

**Node Sizes:**
- Larger nodes = Higher difficulty weeks
- Smaller nodes = Foundational content

**Link Styles:**
- Solid lines → Direct relationships (uses, employs)
- Dashed lines → Prerequisites
- Thick highlighted → Active connections (when node selected)

---

## Common Tasks

### Find Related Weeks
1. Click a week node (e.g., Week 9: Prompt Injection)
2. Right panel shows "Related Items"
3. Click any related week to navigate

### Show Prerequisites
1. Select a week
2. Click "📚 Show prerequisites"
3. Graph highlights all required prior weeks

### Compare Techniques
1. Use "View: Techniques Only" button
2. Click a technique node
3. See all weeks that employ that technique

---

## Server Configuration

### Environment Variables

The server uses `.env` file in `public/deliverables/knowledge-graph/`:

```bash
# Required for AI features
OPENROUTER_API_KEY=sk-or-v1-...

# Optional: Change port
KG_PORT=3100
```

### Getting an OpenRouter API Key

1. Visit: https://openrouter.ai/
2. Sign up / Log in
3. Go to Keys section
4. Create new key
5. Copy to `.env` file

The key in the root `.env` should work if it's already configured for other YoTRT tools.

---

## API Endpoints (if server is running)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/search` | POST | Semantic search for weeks |
| `/api/learning-path` | POST | Generate learning sequence |
| `/api/related` | POST | Find related weeks |
| `/api/mitre-mapping` | GET | Get ATT&CK mappings |
| `/health` | GET | Server status check |

### Example API Call

```bash
curl -X POST http://localhost:3100/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"Find weeks about XSS and injection attacks"}'
```

---

## Troubleshooting

### Graph Doesn't Load
✅ Check browser console (F12) for errors  
✅ Verify D3.js CDN is accessible  
✅ Try different browser (Chrome/Edge recommended)  

### AI Features Not Working
✅ Ensure server is running: `npm start`  
✅ Check server health: `http://localhost:3100/health`  
✅ Verify API key in `.env` file  
✅ Look for CORS errors (must access from same origin)  

### Nodes Overlap Too Much
✅ Adjust force strength in `initGraph()` function  
✅ Use view filters to reduce clutter  
✅ Zoom in to specific areas  

### Server Won't Start
✅ Run `npm install` first  
✅ Check if port 3100 is already in use  
✅ Look for syntax errors in `kg-server.js`  

---

## Next Steps

### For Learning:
1. Start with Arc I (weeks 1-8) to build foundations
2. Use AI search to find topics of interest
3. Follow generated learning paths for structured progression
4. Click prerequisites to ensure proper sequencing

### For Teaching:
1. Project graph during lectures to show big picture
2. Use filtering to focus on current arc/week
3. Generate learning paths for different student goals
4. Show attack technique relationships

### For Development:
1. Add more relationship types (e.g., "combines-with", "counters")
2. Integrate with actual week completion tracking
3. Add export features (PDF, image, JSON)
4. Build mobile-responsive version
5. Add collaborative features (share paths with team)

---

## Performance Tips

**For Large Graphs:**
- Use view filters to reduce node count
- Stop simulation after initial layout: `simulation.stop()`
- Increase collision detection radius for spacing

**For Slow Searches:**
- AI search requires API call (1-2 seconds)
- Local search is instant but less accurate
- Consider caching frequently searched terms

---

## Files You Can Modify

### Add New Weeks
Edit `knowledge-graph.html` → `curriculumData.weeks` array:
```javascript
{ 
  id: "w53", 
  week: 53, 
  title: "Your New Week", 
  arc: 7,
  techniques: ["new-technique"],
  description: "Week description",
  difficulty: 3
}
```

### Add Custom Relationships
Edit `knowledge-graph.html` → After `links` array creation:
```javascript
links.push({ source: "w1", target: "w9", type: "builds-on" });
```

### Change Colors
Edit `getNodeColor()` function:
```javascript
if (d.arc === 1) return '#YOUR_COLOR';
```

### Adjust Layout
Edit force simulation parameters:
```javascript
.force('charge', d3.forceManyBody().strength(-300))  // More negative = more spread
.force('link', d3.forceLink(links).distance(100))    // Increase for more space
```

---

## Integration Ideas

- **Main Dashboard**: Add link to knowledge graph from index.html
- **Week Pages**: Add "View in Knowledge Graph" button
- **Progress Tracking**: Highlight completed weeks in different color
- **Team Features**: Share custom learning paths via URL parameters
- **Analytics**: Track which paths students take most often

---

## Support

📖 **Full Documentation**: `public/deliverables/knowledge-graph/knowledge-graph_README.md`  
🐛 **Issues**: Check browser console, server logs  
💬 **Questions**: YoTRT Discord community  

---

## What Makes This Special

Unlike static curriculum lists, this knowledge graph:

✨ **Shows Hidden Connections**: See how Week 9 (Prompt Injection) relates to Week 25 (Few-Shot Learning)  
🧠 **AI Understanding**: Natural language search, not just keyword matching  
🎯 **Personalized Paths**: AI generates custom learning sequences for your goals  
🔗 **Framework Integration**: Maps to MITRE ATT&CK for professional context  
📊 **Visual Learning**: Understand curriculum structure at a glance  
🚀 **Scalable**: Add new weeks, techniques, or entire arcs easily  

---

**Built for the YoTRT community. Navigate smarter, learn faster, red team better.** 🕸️

---

*Server Status: ✅ Running on port 3100 | AI Enabled: ✅ Yes | Total Nodes: 100+ | Connections: 150+*
