# Classical Cipher Toolkit - Week 3 Deliverables

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Professional toolkit for classical cipher operations, featuring ROT-13, Caesar cipher variants, and the Al Bhed language translator from Final Fantasy X.

## 🔐 Overview

This week's deliverables focus on substitution ciphers and character encoding transformations. The toolkit includes:

- **ROT-13 Cipher Tool**: Interactive web-based encoder/decoder for ROT-13 and ROT-N variants
- **Al Bhed Translator**: Convert between English and Al Bhed (Final Fantasy X language)
- **Python Cipher Library**: Command-line toolkit for batch processing and automation
- **Cipher Reference Guide**: Comprehensive documentation of classical cipher techniques

## 📁 Deliverables

### 1. rot13-cipher-tool.html
Interactive web application for ROT-13 and Caesar cipher operations with real-time encoding.

**Features:**
- ROT-13 encoder/decoder
- Configurable ROT-N (0-25) rotation
- Letter frequency analysis
- Character preservation options
- Export results

### 2. al-bhed-translator.html
Al Bhed language translator inspired by Final Fantasy X's unique substitution cipher.

**Features:**
- English ↔ Al Bhed translation
- Primer completion tracking
- Interactive character map
- Audio pronunciation guide (optional)
- FFX lore integration

### 3. cipher-toolkit.py
Python command-line utility for cipher operations and cryptanalysis.

**Capabilities:**
- Multiple cipher algorithms
- Frequency analysis
- Brute-force decryption
- Batch file processing
- Statistical analysis

### 4. Classical_Cipher_Reference.md
Comprehensive guide to substitution ciphers, their history, and practical applications.

**Contents:**
- Historical context
- Implementation details
- Security analysis
- Modern applications
- CTF techniques

## 🚀 Quick Start

### Web-Based Tools

Simply open the HTML files in any modern web browser:

```bash
# Open ROT-13 tool
open rot13-cipher-tool.html

# Open Al Bhed translator
open al-bhed-translator.html
```

### Python Toolkit

```bash
# Install dependencies (none required for basic operations)
python3 --version  # Verify Python 3.8+

# Encode text with ROT-13
python3 cipher-toolkit.py --rot13 "Hello World"

# Decode ROT-13
python3 cipher-toolkit.py --rot13 "Uryyb Jbeyq"

# Translate to Al Bhed
python3 cipher-toolkit.py --al-bhed "Hello"

# Analyze letter frequency
python3 cipher-toolkit.py --analyze input.txt

# Brute-force Caesar cipher
python3 cipher-toolkit.py --brute-force "Khoor Zruog"
```

## 🎯 Use Cases

### Security & CTF Challenges
- Decode ROT-13 obfuscated flags
- Analyze substitution ciphers
- Practice cryptanalysis techniques
- Understand classical encryption weaknesses

### Game Development & Lore
- Create in-game ciphers and puzzles
- Implement fictional language systems
- Generate encoded messages
- Build interactive translation systems

### Education & Research
- Teach fundamental cryptography concepts
- Demonstrate cipher vulnerabilities
- Analyze historical encryption methods
- Explore linguistic patterns

## 📊 Al Bhed Cipher Details

The Al Bhed language uses a simple substitution cipher:

```
English: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Al Bhed:  Y P L T A V K R E Z G M S H U O Q N D W J X F C I B
```

### Translation Examples

| English | Al Bhed |
|---------|---------|
| Hello   | Rammu   |
| World   | Funmt   |
| Final Fantasy | Vehlm Vyhdydio |
| Red Team | Nat Wayn |

## 🔬 Cipher Analysis

### ROT-13 Characteristics
- **Algorithm**: Caesar cipher with rotation of 13
- **Key Space**: 1 (symmetric)
- **Security**: None (trivially breakable)
- **Use Cases**: Obfuscation, spoiler protection, casual encoding

### Security Considerations

⚠️ **Important**: These ciphers are NOT secure for protecting sensitive information.

- **No encryption**: Simple substitution only
- **Frequency analysis**: Easily broken with statistical methods
- **Known plaintext**: Immediately reveals the key
- **Modern context**: Educational and obfuscation purposes only

## 📖 Technical Implementation

### ROT-13 Algorithm

```javascript
function rot13(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
}
```

### Al Bhed Translation

```python
AL_BHED_MAP = {
    'A': 'Y', 'B': 'P', 'C': 'L', 'D': 'T', 'E': 'A',
    'F': 'V', 'G': 'K', 'H': 'R', 'I': 'E', 'J': 'Z',
    'K': 'G', 'L': 'M', 'M': 'S', 'N': 'H', 'O': 'U',
    'P': 'O', 'Q': 'Q', 'R': 'N', 'S': 'D', 'T': 'W',
    'U': 'J', 'V': 'X', 'W': 'F', 'X': 'C', 'Y': 'I', 'Z': 'B'
}
```

## 🎮 Interactive Features

### ROT-13 Tool
- Real-time encoding as you type
- Multiple rotation values (ROT-1 through ROT-25)
- Visual letter mapping display
- Frequency histogram
- Copy/export functionality

### Al Bhed Translator
- Interactive character picker
- Primer completion system
- Visual alphabet comparison
- FFX-themed interface
- Translation history

## 🧪 Testing & Validation

### Test Cases

```bash
# ROT-13 Tests
echo "HELLO" | python3 cipher-toolkit.py --rot13  # Expected: URYYB
echo "The Quick Brown Fox" | python3 cipher-toolkit.py --rot13
# Expected: Gur Dhvpx Oebja Sbk

# Al Bhed Tests
echo "HELLO" | python3 cipher-toolkit.py --al-bhed  # Expected: RAMMU
echo "SPIRA" | python3 cipher-toolkit.py --al-bhed  # Expected: DOVEN
```

## 📚 Resources

### Cipher References
- [ROT13 Wikipedia](https://en.wikipedia.org/wiki/ROT13)
- [Caesar Cipher History](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Final Fantasy X Al Bhed Language](https://finalfantasy.fandom.com/wiki/Al_Bhed_language)

### Cryptanalysis Tools
- Frequency analysis calculators
- Statistical text analysis
- Pattern recognition techniques

## 🔧 Advanced Usage

### Batch Processing

```bash
# Process multiple files
for file in *.txt; do
    python3 cipher-toolkit.py --rot13 "$file" > "${file%.txt}_encoded.txt"
done

# Decrypt all ROT-N variants
python3 cipher-toolkit.py --brute-force encrypted.txt > results.txt
```

### Integration Examples

```python
from cipher_toolkit import rot13, caesar, al_bhed

# Encode message
encoded = rot13("Secret message")

# Chain transformations
message = "Hello"
step1 = al_bhed(message)
step2 = rot13(step1)
```

## 🎯 CTF Applications

### Common Patterns
- Hidden flags in source code
- Obfuscated URLs or endpoints
- Multi-layer encoding
- Combined with other techniques

### Recognition Tips
- Look for [a-zA-Z] only transformations
- Check for symmetric patterns
- Test ROT-13 on suspicious strings
- Analyze letter distribution

## 📝 License

MIT License - Free for educational and commercial use.

## 🙏 Acknowledgments

- Julius Caesar for the original cipher concept
- Final Fantasy X development team for Al Bhed
- The cryptography community for educational resources

## 🔗 Week 3 Integration

These deliverables are designed for **Red Team Livestream Week 3: ROT13 Cipher**

Visit the main week page for:
- Live demonstrations
- Interactive challenges
- Community discussions
- Additional resources

---

**Created for Red Team Livestream Production Kit**  
Week 3: Classical Ciphers & Language Systems
