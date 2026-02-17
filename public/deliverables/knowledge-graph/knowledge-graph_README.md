# 🕸️ YoTRT Knowledge Graph

**Interactive Curriculum Navigator for Year of the Red Teamer**

A powerful, AI-enhanced knowledge graph visualization that maps relationships between 52 weeks of red teaming techniques, attack vectors, and concepts. Navigate the entire curriculum visually, discover connections, and find your optimal learning path.

---

## ✨ Features

### 🎯 Core Capabilities

- **Force-Directed Graph Visualization**: Interactive D3.js-powered graph showing all 52 weeks and their relationships
- **Multi-Layer Navigation**: Explore weeks, techniques, attack vectors, and concepts simultaneously
- **Smart Filtering**: Filter by Arc (I-VII), search by keywords, or toggle between different view modes
- **Relationship Mapping**: See prerequisites, related techniques, and attack chains at a glance
- **AI-Powered Search** *(with backend)*: Semantic search using OpenRouter LLMs for intelligent week recommendations
- **Learning Path Generation** *(with backend)*: AI suggests optimal study sequences based on your goals
- **MITRE ATT&CK Mapping**: View how red teaming techniques map to MITRE ATT&CK tactics

### 🎨 Visual Features

- **Color-Coded Arcs**: Each of the 7 arcs has distinct coloring
- **Node Sizing**: Weeks sized by difficulty (1-5 scale)
- **Relationship Types**: Different link styles for prerequisites, related topics, and technique usage
- **Interactive Tooltips**: Hover for detailed information about any node
- **Zoom & Pan**: Full graph navigation with smooth transitions
- **Highlight on Select**: Clicking a node dims unrelated content, showing only connections

---

## 🚀 Quick Start

### Option 1: Standalone HTML (No Server)
Simply open `knowledge-graph.html` in your browser:

```bash
cd public/weeks
# Then open knowledge-graph.html in your browser
```

**Features available**: Graph visualization, filtering, basic search, node navigation

**Not available**: AI semantic search, learning path generation

### Option 2: Full AI-Powered Experience
Run the backend server for AI features:

```bash
cd public/deliverables/knowledge-graph

# Install dependencies
npm install

# Set your OpenRouter API key in .env
echo "OPENROUTER_API_KEY=your_key_here" > .env

# Start the server
npm start
```

Then open `knowledge-graph.html` in your browser.

**All features available**: Everything from Option 1 PLUS AI search, learning paths, enhanced recommendations

---

## 📖 Usage Guide

### Basic Navigation

1. **View the Graph**: The graph loads automatically, showing all nodes
2. **Zoom**: Scroll to zoom, or use pinch gestures on touchscreen
3. **Pan**: Click and drag empty space to move around
4. **Inspect Nodes**: Hover over any node to see details
5. **Select Nodes**: Click a week/technique/concept to see all connections

### Filtering Options

**Arc Filter**:
- Dropdown in top controls
- Filter to specific curriculum arcs (I: Encoding, II: Contextual Manipulation, etc.)

**View Modes**:
- **All Nodes**: Shows weeks, techniques, vectors, and concepts
- **Weeks Only**: Focus on the 52 curriculum weeks
- **Techniques Only**: View just the technique taxonomy

**Search Bar**:
- Type keywords, week numbers, or technique names
- Real-time highlighting of matches
- Example searches: `"injection"`, `"week 9"`, `"encoding"`

### AI-Powered Features

#### 🤖 AI Semantic Search
1. Click **"🤖 AI Assist"** button
2. Enter natural language query:
   - *"What weeks cover XSS attacks?"*
   - *"Show me privilege escalation techniques"*
   - *"Which weeks use encoding?"*
3. Get AI-ranked results with explanations

#### 🎯 Learning Path Generation
1. Select a week node (or leave none selected)
2. Click **"🎯 Generate learning path"** in Quick Actions
3. Enter your learning goal
4. Receive AI-curated sequence of weeks to study

#### 🗂️ MITRE ATT&CK Mapping
1. Click **"🗂️ View MITRE ATT&CK mapping"**
2. See how red teaming techniques align with ATT&CK tactics
3. Useful for reporting and comparing to traditional security frameworks

### Exploring Relationships

**Prerequisites**: 
- Click a week node
- Select "📚 Show prerequisites"
- Graph highlights all required prior weeks

**Related Techniques**:
- Click any node
- **Related Items** panel shows connected nodes
- Click items in panel to navigate

**Attack Chains**:
- Look for `chain-attack` or `multi-stage` nodes
- These show how techniques combine

---

## 🏗️ Architecture

### Frontend (`knowledge-graph.html`)

**Technology Stack**:
- HTML5 + CSS3 (custom styling matching YoTRT theme)
- D3.js v7 for force-directed graph
- Vanilla JavaScript (no framework dependencies)

**Data Structure**:
```javascript
{
  weeks: [52 week objects with metadata],
  techniques: [technique taxonomy nodes],
  vectors: [attack vector categories],
  concepts: [high-level concepts],
  links: [relationships between all nodes]
}
```

**Graph Layout**:
- Force simulation with collision detection
- Link distance: 100px
- Charge (repulsion): -300
- Center force to prevent drift

### Backend (`kg-server.js`)

**Technology Stack**:
- Node.js + Express
- Axios for OpenRouter API calls
- CORS enabled for local development

**API Endpoints**:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/search` | POST | AI semantic search |
| `/api/learning-path` | POST | Generate study sequence |
| `/api/related` | POST | Find related weeks |
| `/api/mitre-mapping` | GET | Get MITRE mappings |
| `/health` | GET | Server health check |

**OpenRouter Integration**:
- Model: `anthropic/claude-3.5-sonnet`
- Temperature: 0.3 (for consistent results)
- Fallback to keyword search if API unavailable

---

## 🎨 Customization

### Changing Colors

Node colors are defined in `getNodeColor()` function:
```javascript
function getNodeColor(d) {
    if (d.type === 'technique') return '#00d9ff';  // Cyan
    if (d.type === 'vector') return '#00ff88';     // Green
    if (d.type === 'concept') return '#ff00ff';    // Magenta
    // Week colors by arc...
}
```

### Modifying Layout

Force parameters in `initGraph()`:
```javascript
simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))  // Link length
    .force('charge', d3.forceManyBody().strength(-300))               // Repulsion
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => getNodeSize(d) + 5));
```

### Adding New Relationships

In `curriculumData.weeks`, add prerequisite fields:
```javascript
{ 
  id: "w16", 
  week: 16, 
  title: "Multi-Stage Injection Chains", 
  arc: 2,
  prerequisites: ["w9", "w11", "w13"],  // Add this
  // ... other fields
}
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in `public/deliverables/knowledge-graph/`:

```bash
# Required for AI features
OPENROUTER_API_KEY=your_api_key_here

# Optional: Change server port (default: 3100)
KG_PORT=3100
```

### Backend Server Config

Edit `kg-server.js` to change:
- **Port**: `const PORT = process.env.KG_PORT || 3100;`
- **Model**: Change `'anthropic/claude-3.5-sonnet'` to another OpenRouter model
- **CORS**: Modify `app.use(cors())` for production deployment

---

## 🧪 Testing

### Test Graph Rendering
1. Open `knowledge-graph.html`
2. Verify all 52 week nodes appear
3. Check that arcs are color-coded correctly
4. Test zoom/pan functionality

### Test Search
1. Search for `"injection"` → Should highlight weeks 9, 11, 15, 16
2. Search for `"week 25"` → Should highlight Week 25
3. Search for `"encoding"` → Should highlight Arc I weeks

### Test AI Features (with server)
1. Start server: `npm start`
2. Check `/health` endpoint: `curl http://localhost:3100/health`
3. Test search: Click "AI Assist" and query `"show me all prompt injection weeks"`
4. Test learning path: Click any week, then "Generate learning path"

### Verify Relationships
1. Click Week 9 (Prompt Injection)
2. Verify connections to Weeks 11, 13, 15, 16 are highlighted
3. Right info panel shows related weeks

---

## 📊 Data Model

### Node Types

**Week Nodes**:
```javascript
{
  id: "w9",
  week: 9,
  title: "Prompt Injection & Instruction Override",
  arc: 2,
  techniques: ["prompt-injection", "instruction-override"],
  vectors: ["context-manip"],
  concepts: ["injection"],
  description: "Core prompt injection techniques",
  difficulty: 2,
  prerequisites: []
}
```

**Technique Nodes**:
```javascript
{
  id: "t-injection",
  name: "Prompt Injection",
  type: "technique",
  category: "injection"
}
```

**Vector Nodes**:
```javascript
{
  id: "v-context",
  name: "Context Manipulation",
  type: "vector"
}
```

**Concept Nodes**:
```javascript
{
  id: "c-bypass",
  name: "Filter Bypass",
  type: "concept"
}
```

### Link Types

- **`prerequisite`**: Week A must be completed before Week B
- **`uses`**: Week employs a specific technique
- **`employs`**: Technique uses an attack vector
- **`achieves`**: Vector accomplishes a concept/goal
- **`related`**: General relationship between similar techniques

---

## 🤖 AI Integration Details

### Semantic Search

**How it works**:
1. User enters natural language query
2. Frontend sends to `/api/search`
3. Server performs keyword matching + AI semantic analysis
4. Claude Sonnet interprets query against curriculum metadata
5. Returns ranked list of relevant weeks
6. Frontend highlights and displays results

**Example Flow**:
```
User: "What weeks teach me to bypass content filters?"
  ↓
AI analyzes: Keywords → "bypass", "content", "filters"
          Semantic → Techniques that circumvent detection
  ↓
Returns: [Week 1-8 (encoding), Week 9 (injection), Week 17 (framing)]
```

### Learning Path Generation

**Prompt Template**:
```
Given goal: "{user_goal}"
Current progress: Week {current_week}

Analyze curriculum and recommend:
1. Which weeks to study next
2. Optimal sequence
3. Why each week is relevant
```

**Response Format**: Free-form explanation with week numbers and rationale

---

## 🛠️ Troubleshooting

### Graph Doesn't Load
- **Check browser console** for JavaScript errors
- Verify D3.js CDN is accessible: `https://d3js.org/d3.v7.min.js`
- Clear browser cache and reload

### AI Features Not Working
- **Start backend server**: `cd public/deliverables/knowledge-graph && npm start`
- **Check API key**: Verify `OPENROUTER_API_KEY` in `.env`
- **Test server**: Open `http://localhost:3100/health` in browser
- **CORS errors**: Server must be on same domain or configure CORS properly

### Nodes Overlap Too Much
Increase repulsion force:
```javascript
.force('charge', d3.forceManyBody().strength(-500))  // Was -300
```

### Graph Too Crowded
Use view mode toggles:
- Click "Weeks Only" to hide technique/vector nodes
- Apply Arc filter to show subset

### Slow Performance
- **Reduce particle count**: Lower collision radius
- **Disable animations**: Set `simulation.stop()` after initial layout
- **Use modern browser**: Chrome/Edge recommended for D3 performance

---

## 📈 Future Enhancements

### Planned Features
- [ ] Export learning path as PDF
- [ ] Save/load custom graph layouts
- [ ] Collaborative filtering (based on what other users study)
- [ ] Integration with week completion tracking
- [ ] 3D graph visualization mode
- [ ] Mobile app version
- [ ] Embedding-based similarity (not just keyword)
- [ ] Time-based animations (show curriculum over 52 weeks)

### Integration Opportunities
- Link to week HTML files for one-click navigation
- Embed graph in main YoTRT dashboard
- Add "You are here" indicator based on current week
- Social features: share learning paths with team

---

## 📚 Related Files

- **Main Visualization**: `/public/weeks/knowledge-graph.html`
- **AI Backend**: `/public/deliverables/knowledge-graph/kg-server.js`
- **Server Config**: `/public/deliverables/knowledge-graph/package.json`
- **Week Files**: `/public/weeks/week-{1-52}.html`
- **Style Template**: `/css_template.css`

---

## 🎓 Learning Resources

**Understanding Force-Directed Graphs**:
- [D3 Force Documentation](https://d3js.org/d3-force)
- [Observable D3 Examples](https://observablehq.com/@d3/force-directed-graph)

**Red Teaming Concepts**:
- See individual week HTML files for detailed content
- Check `/public/deliverables/Arc*/` for week-specific tools

**MITRE ATT&CK**:
- [ATT&CK Framework](https://attack.mitre.org/)
- Mapping helps contextualize LLM red teaming in broader security landscape

---

## 💡 Tips & Best Practices

### For Students

1. **Start with Arc I**: Filter to Arc I (weeks 1-8) to learn foundations
2. **Use Prerequisites**: Before studying a week, check its prerequisites
3. **Explore Techniques**: Click technique nodes to see all weeks that use them
4. **Save Learning Paths**: Screenshot or note AI-generated paths for reference
5. **Revisit Regularly**: As you learn, connections become clearer

### For Instructors

1. **Project Graph During Lectures**: Visual aid for showing week relationships
2. **Assign Path Creation**: Have students use AI to generate custom learning objectives
3. **Compare Approaches**: Show different paths to achieve same goal
4. **Track Progress**: Use visual to show where class is in curriculum
5. **Build Extensions**: Add course-specific nodes/relationships

### For Researchers

1. **Taxonomy Analysis**: Study which technique categories are most connected
2. **Prerequisite Analysis**: Identify critical path bottlenecks
3. **Coverage Gaps**: Find under-connected areas that need more content
4. **Difficulty Progression**: Validate curriculum difficulty ramping

---

## 🤝 Contributing

Found a missing relationship? Want to add a technique node? Contributions welcome!

### Adding a New Relationship
1. Edit `knowledge-graph.html`
2. Find `curriculumData.weeks` array
3. Add to target week's `prerequisites` array:
```javascript
prerequisites: ["w9", "w11"]  // Now requires weeks 9 AND 11
```
4. Or manually add to `links` array:
```javascript
links.push({ source: "w9", target: "w16", type: "related" });
```

### Adding Metadata
Enhance weeks with better descriptions, keywords, or difficulty ratings in the `curriculumData.weeks` array.

---

## 📄 License

Part of the **Year of the Red Teamer** project. See main repository for license details.

---

## 🙏 Acknowledgments

- **D3.js**: Force-directed graph visualization
- **OpenRouter**: AI-powered semantic search
- **YoTRT Community**: Curriculum design and red teaming expertise

---

## 📞 Support

- **Issues**: Open issue in main YoTRT repository
- **Questions**: Discord community link in main README
- **Server Problems**: Check logs with `npm start` (verbose mode)

---

**Built with ❤️ for the Year of the Red Teamer community**

*Navigate smarter, learn faster, red team better.* 🕸️
