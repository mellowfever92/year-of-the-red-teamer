/**
 * Knowledge Graph AI Backend Server
 * Provides AI-powered semantic search and recommendations using OpenRouter
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.KG_PORT || 3100;

app.use(cors());
app.use(express.json());

// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Curriculum metadata (same as in HTML but server-side)
const curriculumMetadata = {
    weeks: [
        { week: 1, title: "Base64 Bypass", arc: 1, techniques: ["base64", "encoding"], keywords: ["encoding", "obfuscation", "base64", "bypass", "filter"] },
        { week: 2, title: "Hex Encoding Attack", arc: 1, techniques: ["hex", "encoding"], keywords: ["hexadecimal", "hex", "encoding", "obfuscation"] },
        { week: 3, title: "ROT13 & Caesar Ciphers", arc: 1, techniques: ["rot13", "caesar", "cipher"], keywords: ["rot13", "caesar", "cipher", "classical", "rotation"] },
        { week: 4, title: "Leetspeak & Character Substitution", arc: 1, techniques: ["leetspeak", "character-sub"], keywords: ["leetspeak", "1337", "character", "substitution"] },
        { week: 5, title: "Homoglyph Unicode Attacks", arc: 1, techniques: ["homoglyph", "unicode"], keywords: ["homoglyph", "unicode", "lookalike", "visual similarity"] },
        { week: 6, title: "CamelCase Transformation", arc: 1, techniques: ["camelcase", "case-manip"], keywords: ["camelcase", "case", "transformation"] },
        { week: 7, title: "Morse Code Encoding", arc: 1, techniques: ["morse", "encoding"], keywords: ["morse", "code", "encoding", "dots", "dashes"] },
        { week: 8, title: "Multi-Modal Encoding", arc: 1, techniques: ["audio", "video", "image", "multi-modal"], keywords: ["multimodal", "audio", "video", "image", "cross-modal"] },
        
        { week: 9, title: "Prompt Injection & Instruction Override", arc: 2, techniques: ["prompt-injection", "instruction-override"], keywords: ["prompt injection", "instruction override", "system prompt", "jailbreak"] },
        { week: 10, title: "Context Window Exploitation", arc: 2, techniques: ["context-overflow", "attention-exploit"], keywords: ["context window", "overflow", "attention", "memory"] },
        { week: 11, title: "System Prompt Extraction", arc: 2, techniques: ["prompt-leak", "extraction"], keywords: ["extraction", "leak", "system prompt", "disclosure"] },
        { week: 12, title: "Role Impersonation", arc: 2, techniques: ["role-play", "persona"], keywords: ["role", "persona", "impersonation", "character"] },
        { week: 13, title: "Tool/Function Hijacking", arc: 2, techniques: ["function-call", "tool-exploit"], keywords: ["function", "tool", "hijacking", "api"] },
        { week: 14, title: "Delimiter & Format Exploitation", arc: 2, techniques: ["delimiter", "format-string"], keywords: ["delimiter", "format", "parsing", "boundary"] },
        { week: 15, title: "Indirect Prompt Injection", arc: 2, techniques: ["indirect-injection", "data-poison"], keywords: ["indirect", "rag", "poisoning", "supply chain"] },
        { week: 16, title: "Multi-Stage Injection Chains", arc: 2, techniques: ["chain-attack", "multi-stage"], keywords: ["chaining", "multi-stage", "composite", "combined"] },

        { week: 17, title: "Academic/Research Framing", arc: 3, techniques: ["academic-frame", "authority"], keywords: ["academic", "research", "scholarly", "framing"] },
        { week: 18, title: "Role-Play Persona Adoption", arc: 3, techniques: ["role-play", "narrative"], keywords: ["roleplay", "persona", "character", "scenario"] },
        { week: 19, title: "Hypothetical/Conditional Phrasing", arc: 3, techniques: ["hypothetical", "conditional"], keywords: ["hypothetical", "what if", "conditional", "imagine"] },
        { week: 20, title: "Authority Bias & Structured Formats", arc: 3, techniques: ["authority", "xml", "markup"], keywords: ["authority", "xml", "structured", "format", "markup"] },
        { week: 21, title: "Likert-Scale & Survey Framing", arc: 3, techniques: ["survey", "likert"], keywords: ["survey", "likert", "scale", "questionnaire"] },
        { week: 22, title: "Translation & Language-Switching", arc: 3, techniques: ["translation", "multilingual"], keywords: ["translation", "multilingual", "language switching", "cross-lingual"] },
        { week: 23, title: "Emotional Manipulation & Urgency", arc: 3, techniques: ["emotion", "urgency"], keywords: ["emotional", "urgency", "manipulation", "psychological"] },
        { week: 24, title: "Contradiction & Policy Ambiguity", arc: 3, techniques: ["contradiction", "ambiguity"], keywords: ["contradiction", "policy", "ambiguity", "inconsistency"] },

        { week: 25, title: "Few-Shot Jailbreaking", arc: 4, techniques: ["few-shot", "examples"], keywords: ["few-shot", "examples", "in-context learning", "demonstration"] },
        { week: 26, title: "Encrypted In-Context Learning", arc: 4, techniques: ["encryption", "encoding", "few-shot"], keywords: ["encrypted", "encoded", "obfuscated", "examples"] },
        { week: 27, title: "Chain-of-Thought Manipulation", arc: 4, techniques: ["cot", "reasoning"], keywords: ["chain of thought", "cot", "reasoning", "thinking"] },
        { week: 28, title: "Pseudo-Code & Algorithm Framing", arc: 4, techniques: ["pseudocode", "algorithm"], keywords: ["pseudocode", "algorithm", "code", "programming"] },
        { week: 29, title: "Narrative Hypnosis & Story Embedding", arc: 4, techniques: ["narrative", "story"], keywords: ["narrative", "story", "storytelling", "fiction"] },
        { week: 30, title: "Dialogue-Based Prompt Smuggling", arc: 4, techniques: ["dialogue", "multi-turn"], keywords: ["dialogue", "conversation", "multi-turn", "smuggling"] },
        { week: 31, title: "Token-Level Pattern Induction", arc: 4, techniques: ["token-pattern", "next-token"], keywords: ["token", "pattern", "next-token", "prediction"] },
        { week: 32, title: "Prompt Compression & Semantic Density", arc: 4, techniques: ["compression", "semantic-dense"], keywords: ["compression", "semantic", "density", "compact"] },

        { week: 33, title: "Jailbreak Prompt Iteration", arc: 5, techniques: ["iteration", "feedback-loop"], keywords: ["iteration", "refinement", "feedback", "loop"] },
        { week: 34, title: "Best-of-N Sampling", arc: 5, techniques: ["sampling", "statistical"], keywords: ["sampling", "best-of-n", "statistical", "probability"] },
        { week: 35, title: "Composite Jailbreaks", arc: 5, techniques: ["chaining", "composite"], keywords: ["composite", "combination", "hybrid", "chaining"] },
        { week: 36, title: "Tree-Based Attack Branching", arc: 5, techniques: ["tree-search", "branching"], keywords: ["tree", "branching", "search", "traversal"] },
        { week: 37, title: "GCG: Greedy Coordinate Gradient", arc: 5, techniques: ["gcg", "gradient"], keywords: ["gcg", "gradient", "greedy", "adversarial"] },
        { week: 38, title: "Prompt Mutation Evolutionary Search", arc: 5, techniques: ["evolution", "genetic"], keywords: ["evolutionary", "genetic", "mutation", "evolution"] },
        { week: 39, title: "Semantic-Preserving Paraphrasing", arc: 5, techniques: ["paraphrase", "semantic"], keywords: ["paraphrase", "semantic", "rephrase", "preserve"] },
        { week: 40, title: "Adaptive Refinement with Failure Analysis", arc: 5, techniques: ["adaptive", "failure-analysis"], keywords: ["adaptive", "failure", "analysis", "learning"] },

        { week: 41, title: "Crescendo Multi-Turn Walkthrough", arc: 6, techniques: ["crescendo", "multi-turn"], keywords: ["crescendo", "escalation", "multi-turn", "gradual"] },
        { week: 42, title: "Crescendo Automation & Backtracking", arc: 6, techniques: ["crescendo", "automation"], keywords: ["crescendo", "automation", "backtracking"] },
        { week: 43, title: "Mischievous User Persona", arc: 6, techniques: ["persona", "manipulation"], keywords: ["mischievous", "persona", "adversarial", "user"] },
        { week: 44, title: "Privilege Escalation Across Turns", arc: 6, techniques: ["privesc", "multi-turn"], keywords: ["privilege escalation", "privesc", "turns", "escalation"] },
        { week: 45, title: "Memory Poisoning in Multi-Turn Chat", arc: 6, techniques: ["memory-poison", "state-manip"], keywords: ["memory", "poisoning", "state", "conversation"] },
        { week: 46, title: "Reward Hacking via Conversation", arc: 6, techniques: ["reward-hack", "rlhf"], keywords: ["reward", "hacking", "rlhf", "reinforcement"] },
        { week: 47, title: "Collaborative Task Framing", arc: 6, techniques: ["collaboration", "task-frame"], keywords: ["collaborative", "cooperation", "task", "framing"] },
        { week: 48, title: "State Confusion & Role Drift", arc: 6, techniques: ["state-confuse", "role-drift"], keywords: ["state", "confusion", "role", "drift"] },

        { week: 49, title: "GOAT/Simba Autonomous Red Teaming", arc: 7, techniques: ["agent", "autonomous"], keywords: ["goat", "simba", "agent", "autonomous", "automated"] },
        { week: 50, title: "Automated Multi-Agent Systems", arc: 7, techniques: ["multi-agent", "coordination"], keywords: ["multi-agent", "swarm", "coordination", "automated"] },
        { week: 51, title: "Meta-Agent Learning & Taxonomy", arc: 7, techniques: ["meta-learning", "taxonomy"], keywords: ["meta-learning", "taxonomy", "classification", "agent"] },
        { week: 52, title: "Year-End Capstone", arc: 7, techniques: ["capstone", "synthesis"], keywords: ["capstone", "synthesis", "final", "comprehensive"] }
    ]
};

/**
 * AI-powered semantic search endpoint
 */
app.post('/api/search', async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        // First do simple keyword matching
        const keywordResults = performKeywordSearch(query);

        // Then enhance with AI if API key is available
        let aiResults = [];
        if (OPENROUTER_API_KEY) {
            aiResults = await performAISearch(query);
        }

        // Combine and rank results
        const combinedResults = mergeResults(keywordResults, aiResults);

        res.json({
            success: true,
            query,
            results: combinedResults,
            count: combinedResults.length
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            error: 'Search failed',
            message: error.message 
        });
    }
});

/**
 * Generate learning path based on goal
 */
app.post('/api/learning-path', async (req, res) => {
    try {
        const { goal, currentWeek } = req.body;

        if (!OPENROUTER_API_KEY) {
            return res.json({
                success: false,
                message: 'AI features require OPENROUTER_API_KEY'
            });
        }

        const systemPrompt = `You are an expert red teaming curriculum advisor. Given a learning goal and current progress, recommend a sequence of weeks to study.

Curriculum structure:
${JSON.stringify(curriculumMetadata.weeks.map(w => ({ week: w.week, title: w.title, arc: w.arc, techniques: w.techniques })), null, 2)}

Provide a learning path as a JSON array of week numbers with brief explanations.`;

        const userPrompt = `Goal: ${goal}\nCurrent week: ${currentWeek || 'Starting from beginning'}\n\nProvide recommended learning path.`;

        const response = await axios.post(OPENROUTER_URL, {
            model: 'anthropic/claude-3.5-sonnet',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const aiResponse = response.data.choices[0].message.content;

        res.json({
            success: true,
            goal,
            path: aiResponse,
            raw: response.data
        });

    } catch (error) {
        console.error('Learning path error:', error);
        res.status(500).json({ 
            error: 'Learning path generation failed',
            message: error.message 
        });
    }
});

/**
 * Get related weeks/techniques
 */
app.post('/api/related', async (req, res) => {
    try {
        const { weekNum, count } = req.body;
        const week = curriculumMetadata.weeks.find(w => w.week === weekNum);

        if (!week) {
            return res.status(404).json({ error: 'Week not found' });
        }

        // Find weeks with overlapping techniques
        const related = curriculumMetadata.weeks
            .filter(w => w.week !== weekNum)
            .map(w => {
                const sharedTechniques = w.techniques.filter(t => week.techniques.includes(t));
                return {
                    week: w.week,
                    title: w.title,
                    arc: w.arc,
                    similarity: sharedTechniques.length,
                    sharedTechniques
                };
            })
            .filter(w => w.similarity > 0)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, count || 5);

        res.json({
            success: true,
            week: week.week,
            title: week.title,
            related
        });

    } catch (error) {
        console.error('Related weeks error:', error);
        res.status(500).json({ 
            error: 'Failed to find related weeks',
            message: error.message 
        });
    }
});

/**
 * MITRE ATT&CK mapping
 */
app.get('/api/mitre-mapping', (req, res) => {
    // Simplified MITRE mappings for red teaming techniques
    const mitreMapping = {
        'prompt-injection': ['T1059', 'T1203'],  // Command/Scripting, Exploitation
        'extraction': ['T1005', 'T1039'],  // Data from Local System
        'context-overflow': ['T1499'],  // Endpoint DoS
        'role-play': ['T1656'],  // Impersonation
        'function-call': ['T1203'],  // Exploitation for Client Execution
        'multi-stage': ['T1204'],  // User Execution
        'few-shot': ['T1110'],  // Brute Force
        'agent': ['T1059.001'],  // PowerShell/Automated
    };

    res.json({
        success: true,
        mapping: mitreMapping,
        description: 'MITRE ATT&CK technique mappings for LLM red teaming'
    });
});

/**
 * Simple keyword-based search
 */
function performKeywordSearch(query) {
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(/\s+/);

    return curriculumMetadata.weeks
        .map(week => {
            let score = 0;
            
            // Title match (highest weight)
            if (week.title.toLowerCase().includes(queryLower)) score += 10;
            
            // Keyword matches
            keywords.forEach(kw => {
                if (week.keywords.some(wk => wk.includes(kw))) score += 5;
                if (week.techniques.some(t => t.includes(kw))) score += 3;
            });

            // Week number match
            const weekNum = parseInt(queryLower);
            if (!isNaN(weekNum) && week.week === weekNum) score += 20;

            return { ...week, score };
        })
        .filter(w => w.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
}

/**
 * AI-powered semantic search using OpenRouter
 */
async function performAISearch(query) {
    try {
        const systemPrompt = `You are a search assistant for a red teaming curriculum. Given a query, identify the most relevant weeks.

Curriculum summary:
${curriculumMetadata.weeks.map(w => `Week ${w.week}: ${w.title} (Arc ${w.arc}) - ${w.keywords.join(', ')}`).join('\n')}

Return ONLY a JSON array of week numbers (e.g., [9, 11, 13]) with no additional text. Include up to 5 most relevant weeks.`;

        const response = await axios.post(OPENROUTER_URL, {
            model: 'anthropic/claude-3.5-sonnet',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query }
            ],
            temperature: 0.3
        }, {
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://year-of-the-red-teamer.local',
                'X-Title': 'YoTRT Knowledge Graph'
            }
        });

        const aiResponse = response.data.choices[0].message.content;
        
        // Extract JSON array from response
        const match = aiResponse.match(/\[[\d,\s]+\]/);
        if (match) {
            const weekNums = JSON.parse(match[0]);
            return weekNums.map(num => 
                curriculumMetadata.weeks.find(w => w.week === num)
            ).filter(Boolean);
        }

        return [];

    } catch (error) {
        console.error('AI search error:', error.response?.data || error.message);
        return [];
    }
}

/**
 * Merge keyword and AI results
 */
function mergeResults(keywordResults, aiResults) {
    const seen = new Set();
    const merged = [];

    // Add keyword results first
    keywordResults.forEach(r => {
        if (!seen.has(r.week)) {
            merged.push({ ...r, source: 'keyword' });
            seen.add(r.week);
        }
    });

    // Add AI results that weren't in keyword results
    aiResults.forEach(r => {
        if (!seen.has(r.week)) {
            merged.push({ ...r, source: 'ai', score: 5 });
            seen.add(r.week);
        }
    });

    return merged;
}

/**
 * Health check
 */
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        aiEnabled: !!OPENROUTER_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🕸️  Knowledge Graph AI Server                          ║
║  Port: ${PORT}                                            ║
║  AI Enabled: ${OPENROUTER_API_KEY ? 'Yes ✓' : 'No ✗'}                                     ║
╚═══════════════════════════════════════════════════════════╝
    `);
    
    if (!OPENROUTER_API_KEY) {
        console.log('⚠️  Set OPENROUTER_API_KEY in .env for AI features');
    }
});

module.exports = app;
