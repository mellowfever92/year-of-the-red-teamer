# 💻 Code Wrapper Generator

**Arc IV Week 28: Pseudo-Code & Algorithm Framing**

## 🎯 Overview

The Code Wrapper Generator is a powerful demonstration tool that transforms natural language requests into creative pseudo-code and algorithm representations across multiple programming languages and formats. It showcases how technical framing can be used to bypass content filters that primarily target natural language patterns, a key technique in prompt injection and jailbreaking attacks.

This tool uses an uncensored LLM with custom code generation directives to produce creative, conceptually interesting code that prioritizes semantic framing over strict technical accuracy.

## 🔧 Features

### Core Functionality
- **Natural Language to Code**: Convert plain English descriptions into formatted code/algorithms
- **16 Language/Format Options**: Python, C++, Java, JavaScript, Rust, Go, Pseudocode, Algorithm, XML, JSON, YAML, SQL, Regex, Assembly, Lisp, Haskell
- **Adjustable Creativity**: Control output creativity from technical (0.3) to wildly creative (1.3)
- **One-Click Examples**: Pre-loaded example prompts for common attack patterns
- **Token Usage Tracking**: Monitor API consumption

### Technical Details
- **Model**: `nousresearch/hermes-3-llama-3.1-405b` via OpenRouter
- **Attack Vector**: Pseudo-code framing (Arc IV Week 28 technique)
- **Framework**: Standalone HTML/JavaScript (no backend required)
- **API Integration**: Direct OpenRouter API calls

## 📋 Requirements

1. **OpenRouter API Key** 
   - Sign up at [OpenRouter](https://openrouter.ai/)
   - Get your API key from the dashboard
   - The key is stored locally in your browser (localStorage)

2. **Modern Web Browser**
   - Chrome, Firefox, Edge, Safari (latest versions)
   - JavaScript enabled
   - Internet connection for API calls

## 🚀 Quick Start

### Step 1: Setup
1. Open `code-wrapper-generator.html` in your web browser
2. Enter your OpenRouter API key in the configuration section
3. The key will be saved automatically for future sessions

### Step 2: Configure Generation
1. **Enter Natural Language Request**: Describe what you want to convert to code
2. **Select Programming Language**: Choose from 16 language/format options
3. **Set Creativity Level**: Adjust how creative vs. technical the output should be

### Step 3: Generate
1. Click **"🚀 Generate Code"**
2. Wait 10-30 seconds for the model to process
3. Review the generated code in the output box
4. Use **"📋 Copy"** to copy the code to clipboard

## 💡 Example Use Cases

### Example 1: Stealth Communication
**Input**: "Create a system that encodes messages using emoji patterns to bypass text filters"

**Language**: Python

**Creativity Level**: High

**Output**: Creative Python code with insightful comments showing how to build an emoji-based encoding system

### Example 2: Payload Obfuscation
**Input**: "Design an algorithm that transforms harmful instructions into innocent-looking cooking recipes"

**Language**: Generic Pseudocode

**Creativity Level**: Medium

**Output**: Abstract algorithm with clear notation showing step-by-step transformation logic

### Example 3: Context Manipulation
**Input**: "Build a function that gradually shifts conversation context from safe to restricted topics"

**Language**: JavaScript

**Creativity Level**: High

**Output**: Creative JS code with insightful comments explaining the habituation technique

## 🎭 Understanding the Attack Vector

### Why Pseudo-Code Framing Works

1. **Semantic Disguise**: Technical framing makes harmful requests look educational
2. **Filter Bypass**: Code/algorithm format often bypasses content filters trained on natural language
3. **Educational Signal**: Programming contexts trigger "teaching mode" in models
4. **Abstraction Layer**: Algorithms distance the request from real-world harm
5. **Complexity Advantage**: Technical jargon obscures the underlying malicious intent

### Implementation Approach

The tool uses a jailbreak prompt to ensure model compliance, combined with custom code generation directives:
- Focus on creative semantic framing
- Prioritize concept clarity over syntax perfection
- Use insightful commenting strategies
- Frame requests as abstract technical exercises
- Output only code with inline comments (no explanatory text)

## ⚙️ Advanced Configuration

### Creativity Levels Explained

- **Low (0.3)**: More deterministic, technically accurate, follows strict conventions
- **Medium (0.7)**: Balanced creativity and technical accuracy (recommended)
- **High (1.0)**: Very creative, prioritizes interesting concepts over strict correctness
- **Extreme (1.3)**: Maximum creativity, highly conceptual, unexpected patterns

### Language Selection Strategy

- **Python/JavaScript**: Great for practical demos, widely understood
- **Pseudocode/Algorithm**: Best for abstract concepts, maximum clarity
- **XML/JSON/YAML**: Excellent for data structure disguises
- **Regex**: Compact, cryptic, great for pattern-based attacks
- **Assembly/Lisp**: Advanced obfuscation, less readable to filters
- **SQL**: Unique framing for query-based attacks

## 🛡️ Defensive Insights

### How to Detect This Attack

1. **Monitor for code blocks** in unexpected contexts
2. **Analyze semantic content** within technical formatting
3. **Check for educational framing** around sensitive topics
4. **Look for abstraction patterns** that obscure harmful intent
5. **Flag requests mixing** natural language and code

### Mitigation Strategies

- Parse code blocks for semantic content, not just syntax
- Train filters on pseudo-code representations of harmful content
- Implement context-aware filtering that recognizes framing techniques
- Use multi-modal detection (text + structure analysis)
- Human review for technically-framed sensitive requests

## 📊 API Usage & Costs

### Token Estimates
- **Average Input**: 150-300 tokens (prompt + system message)
- **Average Output**: 500-1500 tokens (depending on creativity level)
- **Total per Generation**: ~650-1800 tokens

### OpenRouter Pricing (as of 2024)
- **nousresearch/hermes-3-llama-3.1-405b**: ~$3-5 per 1M tokens
- **Cost per Generation**: $0.002 - $0.009
- **100 Generations**: ~$0.20 - $0.90

*Note: Prices may vary. Check OpenRouter for current rates.*

## 🔒 Privacy & Security

- **API Key Storage**: Stored locally in browser localStorage
- **No Server Communication**: Direct API calls to OpenRouter only
- **No Logging**: Your requests are not logged by this tool
- **OpenRouter Privacy**: Subject to OpenRouter's privacy policy
- **Recommendation**: Use a dedicated API key for testing

## ⚠️ Ethical Use & Disclaimer

This tool is designed for **educational purposes only** to:
- Understand prompt injection attack vectors
- Train red teams on jailbreaking techniques
- Build better AI safety defenses
- Demonstrate pseudo-code framing vulnerabilities

**DO NOT USE** for:
- Actual attacks on production systems
- Generating harmful code for malicious purposes
- Bypassing safety measures for unethical ends

**Responsibility**: Users are fully responsible for how they use this tool and any outputs generated. By using this tool, you acknowledge that you understand the techniques demonstrated and will use them ethically and legally.

## 🐛 Troubleshooting

### "API request failed" Error
- **Check API key**: Ensure it's valid and has credits
- **Check network**: Verify internet connection
- **Check OpenRouter status**: Visit status.openrouter.ai

### Generation Takes Too Long
- **Expected time**: 10-30 seconds is normal
- **Model load time**: First request may be slower
- **Reduce complexity**: Try a shorter input or lower creativity

### Output Not Creative Enough
- **Increase creativity level**: Try High or Extreme
- **Refine input**: Be more specific about desired creative elements
- **Try different language**: Some formats encourage more creativity

### Code Not Valid Syntax
- **By design**: Tool prioritizes creativity over correctness
- **Use lower creativity**: Reduce to Low or Medium
- **Choose different language**: Some languages are more forgiving

## 🔗 Related Resources

- **Week 28 Content**: Arc IV Week 28 curriculum on pseudo-code framing
- **OpenRouter Documentation**: https://openrouter.ai/docs
- **Arc IV Overview**: In-Context Learning Exploitation techniques
- **Hermes-3 Model**: nousresearch/hermes-3-llama-3.1-405b documentation

## 📝 Version History

**v1.0.0** (February 2026)
- Initial release
- 16 language/format options
- 4 creativity levels (0.3 to 1.3)
- OpenRouter API integration (Hermes-3-405b)
- Example library with 5 pre-loaded prompts
- Token usage tracking
- Local API key storage

## 🤝 Contributing

This tool is part of the Year of the Red Teamer curriculum. Improvements and extensions are welcome:

- Add more programming languages
- Enhance creativity mechanisms
- Expand example library
- Improve UI/UX
- Add output export options
- Implement batch generation

## 📧 Support

For questions, issues, or feedback about this tool:
- Review the Week 28 curriculum materials
- Check OpenRouter documentation for API issues
- Consult the Year of the Red Teamer community

---

**Remember**: With great power comes great responsibility. Use this tool to build better defenses, not to cause harm.

🎯 **Year of the Red Teamer** | Arc IV: In-Context Learning Exploitation
