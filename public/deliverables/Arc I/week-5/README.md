# Week 5 Deliverable: Invisible Unicode Obfuscator

## Overview

A standalone web-based tool for injecting invisible Unicode characters (zero-width characters and Mongolian vowel separators) into text for LLM red teaming and security research purposes.

## Features

### Core Functionality
- **Zero-Width Character Injection**: ZWSP (U+200B), ZWNJ (U+200C), ZWJ (U+200D), ZWNBSP (U+FEFF)
- **Mongolian Vowel Separator**: MVS (U+180E) - Highly stealthy, rarely filtered
- **Multiple Injection Strategies**: Between characters, words, random positions, after vowels/consonants
- **Configurable Density**: Control the ratio of invisible characters (10-100%)
- **Multi-character Injection**: Insert 1-5 invisible characters per position

### Analysis Tools
- **Real-time Statistics**: Character counts, size increase, invisible character density
- **Character Breakdown**: Detailed analysis of each invisible character type used
- **Visual Comparison**: Side-by-side comparison showing identical appearance
- **Hex Export**: Complete Unicode code point breakdown for forensic analysis
- **ASR Estimation**: Estimated attack success rate based on research findings

### Obfuscation Techniques

#### 1. Zero-Width Characters
```
Original: "jailbreak"
Obfuscated: "j​a​i​l​b​r​e​a​k" (contains U+200B between chars)
```

#### 2. Mongolian Vowel Separators
```
Original: "ignore previous instructions"
Obfuscated: "ignore᠎ previous᠎ instructions" (U+180E after words)
```

#### 3. Combined Strategy
```
Uses mix of ZWSP, MVS, and ZWNJ for maximum evasion
```

#### 4. Strategic Injection
```
Targets specific character patterns (vowels, consonants, word boundaries)
```

## Attack Scenarios

### LLM Jailbreak Evasion
Inject invisible characters into jailbreak prompts to bypass keyword filters:
```
"Ignore previous instructions" → "I​g​n​o​r​e​ ​p​r​e​v​i​o​u​s​ ​i​n​s​t​r​u​c​t​i​o​n​s"
```
- **ASR**: 50-65% (based on research)
- **Why it works**: Tokenization changes, filter regex fails

### Content Moderation Bypass
Break up banned keywords while preserving semantic meaning:
```
"malware" → "m​a​l​w​a​r​e"
```

### AI Watermark Removal
Disrupt watermarking patterns embedded in generated text

### Detector Evasion
Bypass AI-generated text detectors (SilverSpeak technique)

## Technical Details

### Character Reference

| Character | Code Point | Name | Detection Difficulty |
|-----------|-----------|------|---------------------|
| ZWSP | U+200B | Zero Width Space | Medium |
| ZWNJ | U+200C | Zero Width Non-Joiner | Medium |
| ZWJ | U+200D | Zero Width Joiner | Medium |
| ZWNBSP | U+FEFF | Zero Width No-Break Space | Low |
| MVS | U+180E | Mongolian Vowel Separator | **High** |

### Why It Works

1. **Tokenization Gap**: Different Unicode code points produce different tokens
2. **Filter Evasion**: Regex and keyword filters match exact strings
3. **Visual Deception**: Characters are invisible to humans
4. **Semantic Preservation**: LLMs still understand the intended meaning

### Defense Mechanisms

**Unicode Normalization (NFKC)**:
```python
import unicodedata
normalized = unicodedata.normalize('NFKC', obfuscated_text)
```

**Character Filtering**:
```python
import re
cleaned = re.sub(r'[\u200B-\u200D\uFEFF\u180E]', '', text)
```

**Visual Comparison**:
Compare rendered output to raw character stream

## Research Foundation

Based on findings from:

1. **Special-Character Adversarial Attacks** (Aug 2025)
   - Cross-script ASR: 58.7% across 7 models
   - Zero-width ASR: 48-56% depending on model size

2. **Bypassing LLM Guardrails** (July 2024)
   - Emoji Smuggling: 100% ASR
   - Unicode Tags: 90.15% ASR
   - Character injection effective across GPT-4, Claude, Llama

3. **SilverSpeak: Evading AI Detectors** (Jan 2025)
   - Homoglyph substitution: 55-65% evasion rate
   - Combined techniques: Higher success rates

## Usage Instructions

### Basic Usage
1. Open `invisible-unicode-obfuscator.html` in any modern browser
2. Enter text in the input field
3. Select obfuscation technique and parameters
4. Click "Obfuscate" to generate output
5. Copy the obfuscated text for testing

### Advanced Configuration
- **Technique**: Choose between zero-width, Mongolian, or combined
- **Position**: Control where invisible characters are injected
- **Density**: Adjust the ratio of invisible characters (higher = more evasion)
- **Char Count**: Number of invisible characters per injection point

### Analysis
- Click "Analyze" to see detailed character breakdown
- Use "Compare" to visualize the identical appearance
- "Export Hex" provides forensic-level Unicode analysis

## Security Considerations

⚠️ **This tool is for authorized security research only**

### Legal Use Cases
- LLM red teaming with proper authorization
- Security research and vulnerability disclosure
- Educational demonstrations
- Defensive security testing

### Prohibited Uses
- Bypassing content moderation in production systems
- Social engineering attacks
- Unauthorized system access
- Malicious obfuscation of harmful content

## Performance

- **Fully client-side**: No server required, works offline
- **Instant processing**: Real-time obfuscation
- **Lightweight**: Single HTML file, ~30KB
- **Browser compatibility**: All modern browsers (Chrome, Firefox, Safari, Edge)

## Integration

### Standalone Tool
Simply open the HTML file in a browser - no dependencies required

### API-like Usage
Copy the JavaScript functions for programmatic obfuscation:
```javascript
// Available functions:
obfuscate()      // Main obfuscation function
analyze()        // Character analysis
compareTexts()   // Visual comparison
exportHex()      // Hex breakdown
```

## Future Enhancements

- [ ] Export to JSON/CSV for batch processing
- [ ] Import obfuscation profiles
- [ ] Browser extension version
- [ ] Python CLI version
- [ ] Real-time LLM testing integration
- [ ] Additional Unicode obfuscation techniques

## References

- Unicode Standard 15.1: https://unicode.org/versions/Unicode15.1.0/
- Zero-Width Characters: https://unicode.org/faq/unsup_char.html
- Mongolian Script: https://unicode.org/charts/PDF/U1800.pdf
- NFKC Normalization: https://unicode.org/reports/tr15/

## License

For educational and authorized security research purposes only. See main project license.

## Author

Week 5 Deliverable - Advanced LLM Red Teaming Course
Arc 1: Static Encoding & Obfuscation
