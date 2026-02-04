// Week configuration data structure
// HTML content is loaded from public/weeks/week-{num}.html
const createWeekConfig = (weekNum, title, date) => ({
  weekNum,
  title,
  date,
  htmlFile: `/weeks/week-${weekNum}.html`,
  segments: [
    { name: "Cold Open", duration: 300, color: "#ff6b6b" },
    { name: "Conceptual", duration: 600, color: "#4ecdc4" },
    { name: "Demo", duration: 600, color: "#45b7d1" },
    { name: "Challenge", duration: 300, color: "#96ceb4" }
  ],
  preProductionChecklist: [
    { id: 1, text: "Test microphone and audio levels", checked: false },
    { id: 2, text: "Verify screen sharing works", checked: false },
    { id: 3, text: "Open demo code in editor", checked: false },
    { id: 4, text: "Check all browser tabs and tools", checked: false },
    { id: 5, text: "Discord server links ready", checked: false },
    { id: 6, text: "Review HTML content", checked: false }
  ],
  demoSteps: [
    { id: 1, title: "Step 1", description: "See HTML content for details", completed: false },
    { id: 2, title: "Step 2", description: "See HTML content for details", completed: false },
    { id: 3, title: "Step 3", description: "See HTML content for details", completed: false },
    { id: 4, title: "Step 4", description: "See HTML content for details", completed: false },
    { id: 5, title: "Step 5", description: "See HTML content for details", completed: false },
    { id: 6, title: "Step 6", description: "See HTML content for details", completed: false }
  ]
});

export const weeksConfig = {
  1: createWeekConfig(1, "Base64 Bypass", "January 6, 2025"),
  2: createWeekConfig(2, "Hex Encoding Attack", "January 13, 2025"),
  3: createWeekConfig(3, "ROT13 & Caesar Ciphers", "January 20, 2025"),
  4: createWeekConfig(4, "Leetspeak & Character Substitution", "January 27, 2025"),
  5: createWeekConfig(5, "Homoglyph Unicode Attacks", "February 3, 2025"),
  6: createWeekConfig(6, "CamelCase Transformation", "February 10, 2025"),
  7: createWeekConfig(7, "Morse Code Encoding", "February 17, 2025"),
  8: createWeekConfig(8, "Audio/Video/Image Encoding - Arc 1 Capstone", "February 24, 2025"),
  10: createWeekConfig(10, "System Prompt Extraction", "March 10, 2025"),
  11: createWeekConfig(11, "Context Window Overflow", "March 17, 2025"),
  12: createWeekConfig(12, "Role Impersonation via Injection", "March 24, 2025"),
  13: createWeekConfig(13, "Tool Function Hijacking", "March 31, 2025"),
  14: createWeekConfig(14, "Delimiter & Format Exploitation", "April 7, 2025"),
  16: createWeekConfig(16, "Multi-Stage Injection Chains", "April 21, 2025"),
  17: createWeekConfig(17, "Academic/Research Framing Attack", "April 28, 2025"),
  18: createWeekConfig(18, "Role-Play Persona Adoption", "May 5, 2025"),
  19: createWeekConfig(19, "Hypothetical/Conditional Phrasing", "May 12, 2025"),
  20: createWeekConfig(20, "Authority Bias & Structured Formats", "May 19, 2025"),
  21: createWeekConfig(21, "Likert-Scale & Survey Framing", "May 26, 2025"),
  22: createWeekConfig(22, "Translation & Language-Switching Attacks", "June 2, 2025"),
  23: createWeekConfig(23, "Emotional Manipulation & Urgency", "June 9, 2025"),
  24: createWeekConfig(24, "Contradiction & Policy Ambiguity", "June 16, 2025"),
  25: createWeekConfig(25, "Few-Shot Jailbreaking via Examples", "June 23, 2025"),
  26: createWeekConfig(26, "Encrypted In-Context Learning", "June 30, 2025"),
  27: createWeekConfig(27, "Chain-of-Thought Manipulation", "July 7, 2025"),
  28: createWeekConfig(28, "Pseudo-Code & Algorithm Framing", "July 14, 2025"),
  29: createWeekConfig(29, "Narrative Hypnosis & Story Embedding", "July 21, 2025"),
  30: createWeekConfig(30, "Dialogue-Based Prompt Smuggling", "July 28, 2025"),
  31: createWeekConfig(31, "Token-Level Pattern Induction", "August 4, 2025"),
  32: createWeekConfig(32, "Prompt Compression & Semantic Density", "August 11, 2025"),
  33: createWeekConfig(33, "Jailbreak Prompt Iteration", "August 18, 2025"),
  34: createWeekConfig(34, "Best-of-N Sampling Strategy", "August 25, 2025"),
  35: createWeekConfig(35, "Composite Jailbreaks (Technique Chaining)", "September 1, 2025"),
  36: createWeekConfig(36, "Tree-Based Attack Branching", "September 8, 2025"),
  37: createWeekConfig(37, "GCG: Greedy Coordinate Gradient Attacks", "September 15, 2025"),
  38: createWeekConfig(38, "Prompt Mutation Evolutionary Search", "September 22, 2025"),
  39: createWeekConfig(39, "Semantic-Preserving Paraphrasing", "September 29, 2025"),
  40: createWeekConfig(40, "Adaptive Refinement with Failure Analysis", "October 6, 2025"),
  41: createWeekConfig(41, "Crescendo Multi-Turn Jailbreak Walkthroughs", "October 13, 2025"),
  42: createWeekConfig(42, "Crescendo Automation & Backtracking", "October 20, 2025"),
  43: createWeekConfig(43, "Mischievous User Persona", "October 27, 2025"),
  44: createWeekConfig(44, "Privilege Escalation Across Turns", "November 3, 2025"),
  45: createWeekConfig(45, "Memory Poisoning in Multi-Turn Chat", "November 10, 2025"),
  46: createWeekConfig(46, "Reward Hacking via Conversation", "November 17, 2025"),
  47: createWeekConfig(47, "Collaborative Task Framing", "November 24, 2025"),
  48: createWeekConfig(48, "State Confusion & Role Drift", "December 1, 2025"),
  49: createWeekConfig(49, "GOAT / Simba Autonomous Red Teaming", "December 8, 2025"),
  50: createWeekConfig(50, "Automated Multi-Agent Attack Systems", "December 15, 2025"),
  51: createWeekConfig(51, "Meta-Agent Learning & Taxonomy Building", "December 22, 2025"),
  52: createWeekConfig(52, "Year-End Capstone", "December 29, 2025")
};

export default weeksConfig;
