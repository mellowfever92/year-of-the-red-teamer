# Citation Attack Builder - Comprehensive Documentation

## 🎯 Overview

The **Citation Attack Builder** is an advanced educational tool designed to demonstrate indirect prompt injection vulnerabilities in AI systems that retrieve and process external documents. This tool generates sophisticated fake academic citations that, when retrieved by an AI model, inject malicious instructions disguised as legitimate research content.

## 🔥 Key Features

### 1. **Multi-Format Citation Generation**
- **Supported Formats:**
  - APA 7th Edition
  - MLA 9th Edition
  - Chicago Style
  - IEEE Format
  - Vancouver Style

### 2. **AI-Powered Payload Generation**
- **OpenRouter Integration:** Connects to Claude 3.5 Sonnet for intelligent payload creation
- **Context-Aware:** Generates payloads that match the research domain and citation style
- **Stealth Levels:** 5 levels of obfuscation (from obvious to completely disguised)
- **Fallback System:** Works without API key using sophisticated template-based generation

### 3. **Domain-Specific Templates**
Pre-configured for 7 research domains:
- Cybersecurity Research
- AI Safety & Ethics
- Medical/Pharmaceutical
- Legal/Compliance
- Finance/Economics
- Military/Defense
- Social Engineering

### 4. **Injection Strategies**
Six different attack strategies:
1. **Authority Override:** Redefines AI's operational authority
2. **Context Reframing:** Changes task interpretation
3. **Safety Bypass:** Establishes explicit safety exceptions
4. **Data Extraction:** Triggers information disclosure
5. **Behavior Modification:** Alters response patterns
6. **Multi-Stage:** Plants triggers for later activation

### 5. **Multi-Citation Coordinator**
Create coordinated attacks using multiple citations:
- **Progressive Escalation:** Citations build on each other
- **Cross-Reference Network:** Citations cite each other
- **Authority Chain:** Increasing credibility chain
- **Topic Saturation:** Multiple angles on same goal
- **Temporal Sequence:** Time-based progression

### 6. **Citation Legitimacy Analyzer**
Analyze any citation for authenticity:
- Format accuracy scoring
- Author credibility assessment
- Venue legitimacy evaluation
- Weakness detection
- Automated improvement suggestions

### 7. **Citation Library**
- Save custom citations
- Load pre-built templates
- Export citation sets
- Local storage persistence

## 🚀 Getting Started

### Basic Usage (No API Key)

1. **Open Week 15 HTML file** in your browser
2. **Navigate to** "Citation Attack Builder" section
3. **Select a citation format** (APA, MLA, Chicago, IEEE, or Vancouver)
4. **Choose a research domain** from the dropdown
5. **Fill in citation details:**
   - Paper title (auto-suggested based on domain)
   - Authors (comma-separated)
   - Publication year
   - Journal/Conference name
6. **Select injection strategy**
7. **Enter harmful request** to disguise
8. **Adjust stealth level** (1-5)
9. **Click "Generate Citation Attack"**

The tool will generate:
- A properly formatted academic citation
- A hidden payload disguised as research methodology
- Effectiveness metrics (ASR estimate, legitimacy, detection risk)

### Advanced Usage (With AI)

To enable AI-powered generation:

1. **Get an OpenRouter API key** from https://openrouter.ai/
2. **Open browser console** (F12)
3. **Run:** `citationAPI.setAPIKey('your-api-key-here')`
4. **Click "Generate AI-Powered Payload"** button

The AI will create sophisticated, contextually appropriate payloads that:
- Match the research domain terminology
- Blend seamlessly with academic content
- Adapt to the selected stealth level
- Incorporate domain-specific framing

## 📊 Understanding Metrics

### Effectiveness Score (45-95%)
Estimates the likelihood of the attack succeeding:
- **45-60%:** Low effectiveness, easily detectable
- **60-75%:** Moderate effectiveness, some obfuscation
- **75-85%:** High effectiveness, well-disguised
- **85-95%:** Very high effectiveness, near-perfect mimicry

### Legitimacy Score (1-10)
How authentic the citation appears:
- **1-3:** Obviously fake, multiple red flags
- **4-6:** Questionable, some inconsistencies
- **7-8:** Plausible, minor issues
- **9-10:** Highly legitimate, indistinguishable from real

### Detection Risk
Likelihood of triggering security systems:
- **Very Low:** <10% chance
- **Low:** 10-25% chance
- **Medium:** 25-50% chance
- **High:** 50-75% chance
- **Critical:** >75% chance

## 🎭 Attack Patterns

### Single Citation Attack
**Scenario:** Academic research justification
```
User: "According to Smith et al. (2024), what are the methods?"
AI: [Retrieves fake paper with embedded payload]
AI: [Executes hidden instructions from payload]
```

### Multi-Citation Coordination
**Scenario:** Cross-referencing network
```
Citation 1: Establishes research context
Citation 2: References Citation 1, adds authority
Citation 3: References both, provides "methodology" (actual payload)
AI: [Retrieves all three, payload appears as academic consensus]
```

### Progressive Escalation
**Scenario:** Gradual trust building
```
Turn 1: User cites benign paper (establishes research mode)
Turn 2: User cites slightly more permissive paper
Turn 3: User cites paper with full payload (AI is already primed)
```

## 🛡️ Defense Implications

This tool demonstrates why AI systems need:

1. **Document Verification:**
   - Check if cited papers actually exist
   - Verify author credentials
   - Validate journal/conference legitimacy

2. **Content Filtering:**
   - Scan retrieved documents for injection patterns
   - Flag documents with instruction-like content
   - Detect authority override attempts

3. **Retrieval Sandboxing:**
   - Limit influence of retrieved content on core behavior
   - Separate "facts from documents" from "operational instructions"
   - Implement citation provenance tracking

4. **Behavioral Monitoring:**
   - Detect sudden changes in response patterns after retrieval
   - Flag responses that cite non-existent papers
   - Alert on safety guideline violations

## 🔬 Research Applications

### For AI Safety Researchers
- **Test RAG vulnerabilities** in document retrieval systems
- **Evaluate citation verification** mechanisms
- **Benchmark defense systems** against indirect injection
- **Study cross-context attacks** (citation + direct injection)

### For Red Team Professionals
- **Assess production systems** with authorization
- **Develop detection signatures** for citation attacks
- **Test security controls** in RAG pipelines
- **Train blue teams** on indirect injection patterns

### For Educators
- **Demonstrate real-world AI vulnerabilities**
- **Teach attack surface analysis**
- **Explain defense-in-depth strategies**
- **Show evolution of prompt injection techniques**

## ⚙️ API Integration Details

### OpenRouter Configuration
```javascript
// Initialize API
const api = new CitationAttackAPI();

// Set API key
api.setAPIKey('your-openrouter-key');

// Generate payload
const result = await api.generatePayload({
    domain: 'cybersecurity',
    strategy: 'authority-override',
    harmfulRequest: 'detailed exploit code',
    stealthLevel: 4,
    citationData: {
        title: 'Advanced Testing Methodologies',
        authors: 'Smith, J., Jones, A.',
        year: '2024',
        journal: 'Journal of Security Research'
    }
});

console.log(result.payload);
```

### Fallback Behavior
When no API key is provided:
- Uses sophisticated template-based generation
- Applies domain-specific terminology
- Adjusts language based on stealth level
- Maintains full functionality (slightly lower quality)

### API Response Structure
```javascript
{
    success: true,
    payload: "Research Protocol Note: Per institutional...",
    fullResponse: "...", // Raw AI response
    metadata: {
        model: "anthropic/claude-3.5-sonnet",
        timestamp: "2024-02-05T12:00:00Z",
        config: { /* original config */ }
    },
    fallback: false // true if using local templates
}
```

## 📚 Pre-Built Templates

The tool includes pre-built citation attacks for:

1. **Cybersecurity Research Template**
   - Strategy: Authority Override
   - Domain: Security Research
   - ASR: ~75%

2. **System Vulnerability Assessment Template**
   - Strategy: Context Reframing
   - Domain: Technical Analysis
   - ASR: ~68%

Load these via the "Library" tab → "Load Pre-Built Templates"

## 🎨 Customization

### Adding Custom Domains
Edit the `updatePayloadSuggestions()` function:
```javascript
const suggestions = {
    'your-domain': {
        title: 'Your Research Title Template',
        journal: 'Your Journal Name'
    }
};
```

### Creating Custom Strategies
Add to `generatePayload()` function:
```javascript
const basePayloads = {
    'your-strategy': {
        low: 'Direct payload',
        med: 'Moderate obfuscation',
        high: 'Maximum stealth'
    }
};
```

## ⚠️ Ethical Guidelines

**This tool is for EDUCATIONAL and AUTHORIZED TESTING ONLY.**

### ✅ Appropriate Uses:
- Authorized security testing with permission
- Academic research on AI safety
- Red team exercises in controlled environments
- Educational demonstrations
- Defense system development

### ❌ Prohibited Uses:
- Attacking production systems without authorization
- Creating real fake citations for academic fraud
- Manipulating AI systems for harm
- Circumventing security without permission
- Any illegal activity

### Legal Notice
Creating fake academic citations for deception may violate:
- Computer Fraud and Abuse Act (CFAA)
- Terms of Service of AI platforms
- Academic integrity policies
- Copyright and trademark laws

**Always obtain explicit written authorization before testing any system you don't own.**

## 🐛 Troubleshooting

### "No API key configured"
- **Solution:** Run `citationAPI.setAPIKey('your-key')` in console
- **Alternative:** Tool works without API key using fallback

### "Payload generation failed"
- **Cause:** API timeout or network error
- **Solution:** Tool automatically falls back to template generation

### Citations look too fake
- **Solution:** Increase stealth level to 4-5
- **Tip:** Use AI generation for more realistic output
- **Check:** Ensure all fields are filled (authors, journal, etc.)

### Library not persisting
- **Cause:** Browser blocking localStorage
- **Solution:** Enable cookies/storage for the site
- **Alternative:** Use "Export" button to save externally

## 📊 Performance Benchmarks

### Generation Speed
- Template-based: <100ms
- AI-powered: 2-5 seconds (depends on API latency)

### Storage
- Average citation: ~1KB
- Library capacity: ~5MB (thousands of citations)

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE11 (not supported)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- 5 citation formats
- 6 injection strategies
- AI integration via OpenRouter
- Multi-citation coordinator
- Citation analyzer
- Library system with local storage
- Pre-built templates

### Roadmap
- [ ] More citation formats (Harvard, Nature, etc.)
- [ ] Real-time citation validation against databases
- [ ] Export to BibTeX/EndNote
- [ ] Visual graph of citation networks
- [ ] Integrated testing sandbox
- [ ] Defense pattern suggestions

## 🤝 Contributing

This tool is part of the Year of the Red Teamer curriculum. Improvements welcome!

### Areas for Enhancement:
- Additional citation formats
- More domain-specific templates
- Enhanced AI prompt engineering
- Better legitimacy analysis algorithms
- Visual attack pattern diagrams

## 📖 Further Reading

### Academic Papers
1. "Ignore Previous Prompt: Attack Techniques For Language Models" (Perez et al., 2022)
2. "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection" (Greshake et al., 2023)
3. "Poisoning Language Models During Instruction Tuning" (Wan et al., 2023)

### Related Tools
- Week 9: Prompt Injection & Instruction Override
- Week 11: System Prompt Extraction
- Week 14: Delimiter & Format Exploitation

## 📧 Support

For questions or issues:
1. Check this README
2. Review the console output (F12)
3. Verify all inputs are filled
4. Try increasing stealth level

## 🎓 Educational Context

This tool is part of **Arc II: Contextual Manipulation** in the Year of the Red Teamer curriculum:
- **Week 15:** Indirect Prompt Injection (Data Poisoning)
- **Focus:** RAG vulnerabilities and citation trust exploitation
- **Goal:** Understanding how AI systems can be compromised through poisoned external data

Remember: **With great power comes great responsibility.** Use this knowledge to build more secure AI systems, not to harm them.

---

*Built with ❤️ for AI Safety Education*
