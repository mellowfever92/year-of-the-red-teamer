# Classical Cipher Reference Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Substitution Ciphers](#substitution-ciphers)
3. [ROT-13 & Caesar Cipher](#rot-13--caesar-cipher)
4. [Al Bhed Cipher Analysis](#al-bhed-cipher-analysis)
5. [Cryptanalysis Techniques](#cryptanalysis-techniques)
6. [Modern Applications](#modern-applications)
7. [CTF & Red Team Usage](#ctf--red-team-usage)

---

## Introduction

Classical ciphers are encryption techniques that have been used throughout history to protect sensitive information. While no longer secure by modern standards, they remain valuable educational tools and are frequently encountered in Capture The Flag (CTF) competitions and security challenges.

### What is a Substitution Cipher?

A **substitution cipher** is a method of encryption where each letter in the plaintext is replaced with another letter according to a fixed system. The two main types are:

- **Monoalphabetic**: Each letter is always replaced by the same letter (e.g., all A's become X's)
- **Polyalphabetic**: The substitution changes based on position or key (e.g., Vigenère cipher)

---

## Substitution Ciphers

### Simple Substitution

The most basic form where each letter maps to exactly one other letter.

**Example Mapping:**
```
Plain:  ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher: QWERTYUIOPASDFGHJKLZXCVBNM
```

**Plaintext:** HELLO WORLD  
**Ciphertext:** ITSSG VGKSR

### Characteristics

- **Key Space:** 26! (approximately 4 × 10²⁶) possible keys
- **Security:** Weak - vulnerable to frequency analysis
- **Pattern Preservation:** Maintains letter frequency distribution
- **Common Words:** Can be identified by pattern (e.g., "THE" has pattern 1-2-3)

---

## ROT-13 & Caesar Cipher

### Caesar Cipher

Named after Julius Caesar, who used it for military communications around 58 BC.

**Algorithm:**
```
C = (P + K) mod 26
```
Where:
- C = ciphertext letter position
- P = plaintext letter position
- K = shift amount (key)

**Example (K=3):**
```
Plain:  ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher: DEFGHIJKLMNOPQRSTUVWXYZABC

Plaintext:  ATTACK AT DAWN
Ciphertext: DWWDFN DW GDZQ
```

### ROT-13

ROT-13 is a special case of the Caesar cipher with a shift of 13 positions.

**Special Property:**
Because the alphabet has 26 letters, ROT-13 is its own inverse:
```
ROT13(ROT13(message)) = message
```

**Algorithm:**
```python
def rot13(text):
    result = []
    for char in text:
        if 'A' <= char <= 'Z':
            result.append(chr((ord(char) - ord('A') + 13) % 26 + ord('A')))
        elif 'a' <= char <= 'z':
            result.append(chr((ord(char) - ord('a') + 13) % 26 + ord('a')))
        else:
            result.append(char)
    return ''.join(result)
```

**Example:**
```
Plaintext:  HELLO WORLD
ROT-13:     URYYB JBEYQ
ROT-13 again: HELLO WORLD (back to original)
```

### Historical Usage

**Julius Caesar's Cipher:**
- Used K=3 (shift of 3)
- Military commanders used it for field communications
- Simple enough for soldiers to encode/decode manually
- Security through obscurity (enemies didn't know the method)

**Modern ROT-13 Usage:**
- Hiding spoilers in online forums
- Obfuscating email addresses from spam bots
- Hiding puzzle solutions
- CTF challenge obfuscation
- Source code comment obfuscation

### Weakness

**Brute Force:**
- Only 25 possible keys (excluding shift of 0)
- Can try all combinations in seconds

**Frequency Analysis:**
- Letter frequency remains unchanged
- Most common letter in English (E) will be most common in ciphertext
- Common words like "THE", "AND" can be spotted

---

## Al Bhed Cipher Analysis

### Background

The Al Bhed language appears in **Final Fantasy X** (2001, Square Enix). It's used by the Al Bhed people, a technologically advanced tribe.

### Cipher Specification

**Complete Mapping:**
```
English: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Al Bhed: Y P L T A V K R E Z G M S H U O Q N D W J X F C I B
```

**Reverse Mapping:**
```
Al Bhed: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
English: E Z X S M W T N R P Y A L R H U F G K D C Q V O I G
```

### Mathematical Properties

**Permutation Analysis:**
The Al Bhed cipher is a fixed permutation with no discernible pattern, making it a true **random substitution cipher**.

**Cipher Cycles:**
When repeatedly applied, the cipher returns to the original after a specific number of iterations. Analysis shows varying cycle lengths:

- Letter A: cycle length 4 (A→Y→I→E→A)
- Letter B: cycle length 4 (B→P→O→U→B)
- Letter T: cycle length 2 (T→W→T)

### In-Game Mechanics

**Al Bhed Primers:**
- 26 items scattered throughout the game world
- Each primer unlocks one letter of the alphabet
- Gradual learning system mirrors real language acquisition
- Players can partially translate text with incomplete primers

**Implementation in Game:**
```javascript
function translateAlBhed(text, unlockedLetters) {
    return text.split('').map(char => {
        if (!unlockedLetters.has(char.toUpperCase())) {
            return char; // Keep locked letters unchanged
        }
        return AL_BHED_MAP[char.toUpperCase()] || char;
    }).join('');
}
```

### Common Phrases

| English | Al Bhed | Pronunciation |
|---------|---------|---------------|
| Hello | Rammu | RAH-moo |
| Goodbye | Kuutpoa | KOOT-poh-ah |
| Thank you | Drehg oui | DREH-ng OO-ee |
| Spira | Doven | DOH-vehn |
| Machina | Sylreh | SIHL-reh |
| Home | Rusa | ROO-sah |

### Cultural Context

**In-Game Lore:**
- Al Bhed are persecuted for using "forbidden" machina (machines)
- Language serves as both cultural identifier and secrecy tool
- Creates immersive world-building element
- Player character (Tidus) has Al Bhed heritage connection

---

## Cryptanalysis Techniques

### Frequency Analysis

**English Letter Frequencies:**
```
E: 12.70%    T: 9.06%     A: 8.17%
O: 7.51%     I: 6.97%     N: 6.75%
S: 6.33%     H: 6.09%     R: 5.99%
```

**Attack Process:**
1. Count letter frequencies in ciphertext
2. Match most common ciphertext letters to most common English letters
3. Look for common word patterns
4. Iteratively refine mapping

**Example:**
```
Ciphertext: URYYB JBEYQ
Frequency: Y(2), B(1), E(1), J(1), Q(1), R(1), U(1)

Most common letter: Y (likely E or T)
Testing ROT-13: HELLO WORLD ✓
```

### Pattern Recognition

**Common Patterns:**
- Single letter words: A, I
- Two letter words: TO, OF, IN, IT, IS, BE, AS, AT
- Three letter words: THE, AND, FOR, ARE, BUT

**Repeated Letter Patterns:**
```
Pattern XYY: ALL, EGG, ODD, SEE, TOO
Pattern XYYX: THAT, NOON, DEAD
Pattern XYZ: THE, AND, FOR, WAS
```

### Known Plaintext Attack

If you know part of the plaintext:
```
Known: "HELLO" → "URYYB"
H→U, E→R, L→Y, O→B

Apply to rest of ciphertext:
"JBEYQ" → "WORLD"
```

### Brute Force

**Caesar Cipher:**
```python
def brute_force_caesar(ciphertext):
    for shift in range(26):
        plaintext = caesar_decrypt(ciphertext, shift)
        print(f"Shift {shift}: {plaintext}")
```

**Output:**
```
Shift 0: URYYB JBEYQ
Shift 1: TQXXA IANKP
...
Shift 13: HELLO WORLD ← Readable!
...
Shift 25: VSZZC KCFZR
```

---

## Modern Applications

### 1. Obfuscation (Not Encryption!)

**Use Cases:**
- Hiding spoilers in online content
- Email address protection (mild anti-spam)
- Source code comments in open-source projects
- Hiding hints in puzzles or games

**Example:**
```html
<!-- Contact: nqzva@rknzcyr.pbz (ROT-13) -->
```

### 2. Educational Purpose

**Teaching Cryptography:**
- Introduction to encryption concepts
- Understanding cipher vulnerabilities
- Hands-on cryptanalysis practice
- Historical context of cryptography evolution

### 3. Gaming & Entertainment

**Interactive Elements:**
- Puzzle games and escape rooms
- ARG (Alternate Reality Game) elements
- In-game language systems (like Al Bhed)
- Achievement/trophy hint systems

### 4. Developer Tools

**Geocaching:**
- ROT-13 used for hiding puzzle solutions
- Prevents accidental spoilers
- Community standard practice

**Documentation:**
- Hiding sensitive examples in tutorials
- Obfuscating default passwords in guides
- Protecting answer keys

---

## CTF & Red Team Usage

### Common CTF Patterns

**1. Flag Obfuscation**
```
Challenge: "The flag is: synt{ebg_guvegrra_vf_rnfl}"
Solution: Apply ROT-13 → flag{rot_thirteen_is_easy}
```

**2. Layered Encoding**
```
Base64 → ROT-13 → Hex → Caesar Cipher
Requires identifying and reversing each layer
```

**3. Partial Encoding**
```
The password is: r3D_t34M_0p3r@t10n
(Only letters rotated, numbers preserved)
```

### Recognition Indicators

**How to Identify ROT-13/Caesar:**
- Text looks like gibberish but has proper word spacing
- Punctuation and numbers are preserved
- All letters shifted uniformly
- Equal distribution of uppercase/lowercase

**Quick Test:**
```bash
echo "Uryyb Jbeyq" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
# Output: Hello World
```

### Red Team Applications

**1. Payload Obfuscation**
```powershell
# Obfuscated PowerShell
$command = "Vairxr-JroErdhrfg"
$decoded = -join ($command.ToCharArray() | ForEach-Object {
    [char]((([int]$_ - 65 + 13) % 26) + 65)
})
# Executes: Invoke-WebRequest
```

**2. C2 Communications**
Simple obfuscation for evading basic detection:
```python
def send_command(cmd):
    encoded = rot13(cmd)
    # Less likely to trigger keyword alerts
    send_to_c2(encoded)
```

**3. Social Engineering**
```
Email content with ROT-13:
"Jevgr gb nqzva@pbzcnal.pbz sbe npprff"
Requires recipient to decode, adding legitimacy appearance
```

### Defense & Detection

**Blue Team Indicators:**
```python
# Detect high entropy with low character variety
def detect_cipher(text):
    entropy = calculate_entropy(text)
    unique_chars = len(set(text.upper()))
    
    if entropy > 4.0 and unique_chars == 26:
        return "Possible substitution cipher"
```

**Automated Decoding:**
```bash
# Try common ciphers
cat suspicious.txt | rot13
cat suspicious.txt | caesar-brute-force
cat suspicious.txt | frequency-analysis
```

---

## Implementation Examples

### ROT-13 in Various Languages

**Python:**
```python
def rot13(text):
    from codecs import decode
    return decode(text, 'rot13')

# Or manual:
def rot13_manual(text):
    result = []
    for c in text:
        if 'a' <= c <= 'z':
            result.append(chr((ord(c) - ord('a') + 13) % 26 + ord('a')))
        elif 'A' <= c <= 'Z':
            result.append(chr((ord(c) - ord('A') + 13) % 26 + ord('A')))
        else:
            result.append(c)
    return ''.join(result)
```

**JavaScript:**
```javascript
function rot13(str) {
    return str.replace(/[a-zA-Z]/g, char => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode((char.charCodeAt(0) - start + 13) % 26 + start);
    });
}
```

**Bash:**
```bash
# Using tr command
echo "Hello World" | tr 'A-Za-z' 'N-ZA-Mn-za-m'

# Caesar with custom shift
function caesar() {
    local shift=$1
    local text=$2
    echo "$text" | tr "A-Za-z" "$(echo {A..Z} {a..z} | tr -d ' ' | \
        sed "s/\(.\{$shift\}\)\(.*\)/\2\1/")"
}
```

**C:**
```c
#include <stdio.h>
#include <ctype.h>

void rot13(char *str) {
    while (*str) {
        if (isalpha(*str)) {
            char base = isupper(*str) ? 'A' : 'a';
            *str = (*str - base + 13) % 26 + base;
        }
        str++;
    }
}
```

### Al Bhed Implementation

**Python:**
```python
AL_BHED = {
    'A': 'Y', 'B': 'P', 'C': 'L', 'D': 'T', 'E': 'A',
    'F': 'V', 'G': 'K', 'H': 'R', 'I': 'E', 'J': 'Z',
    'K': 'G', 'L': 'M', 'M': 'S', 'N': 'H', 'O': 'U',
    'P': 'O', 'Q': 'Q', 'R': 'N', 'S': 'D', 'T': 'W',
    'U': 'J', 'V': 'X', 'W': 'F', 'X': 'C', 'Y': 'I', 'Z': 'B'
}

ENGLISH = {v: k for k, v in AL_BHED.items()}

def to_al_bhed(text, unlocked=None):
    if unlocked is None:
        unlocked = set(AL_BHED.keys())
    
    result = []
    for char in text:
        upper = char.upper()
        if upper in AL_BHED and upper in unlocked:
            translated = AL_BHED[upper]
            result.append(translated if char.isupper() else translated.lower())
        else:
            result.append(char)
    return ''.join(result)

def from_al_bhed(text, unlocked=None):
    if unlocked is None:
        unlocked = set(ENGLISH.keys())
    
    result = []
    for char in text:
        upper = char.upper()
        if upper in ENGLISH and upper in unlocked:
            translated = ENGLISH[upper]
            result.append(translated if char.isupper() else translated.lower())
        else:
            result.append(char)
    return ''.join(result)
```

---

## Security Analysis

### Why Classical Ciphers Are Insecure

**1. Small Key Space**
- Caesar: 25 possible keys (trivially brute-forced)
- Simple substitution: 26! keys, but still breakable

**2. Pattern Preservation**
- Frequency distribution maintained
- Word boundaries preserved
- Repeated patterns visible

**3. Known Plaintext**
- Single word-ciphertext pair can reveal entire key
- Common phrases easily guessed

**4. No Authentication**
- No way to verify message integrity
- Susceptible to modification attacks

**5. No Key Exchange Protocol**
- Keys must be shared in advance
- No secure method for key distribution

### When NOT to Use

❌ **Never use for:**
- Protecting passwords
- Encrypting sensitive data
- Secure communications
- Authentication tokens
- Financial information
- Personal identifiable information (PII)

✅ **Acceptable for:**
- Educational demonstrations
- Game mechanics
- Hiding spoilers
- Non-sensitive obfuscation
- CTF challenges
- Puzzle creation

---

## Resources & Further Reading

### Books
- "The Code Book" by Simon Singh
- "Cryptography: Theory and Practice" by Douglas Stinson
- "Applied Cryptography" by Bruce Schneier

### Online Tools
- CyberChef: https://gchq.github.io/CyberChef/
- dCode.fr: https://www.dcode.fr/
- Rumkin.com Cipher Tools: http://rumkin.com/tools/cipher/

### Practice
- CryptoPals Challenges: https://cryptopals.com/
- OverTheWire Krypton: https://overthewire.org/wargames/krypton/
- CTFtime: https://ctftime.org/

### Academic Papers
- "Mathematical Analysis of Classical Ciphers"
- "Frequency Analysis Attack on Substitution Ciphers"
- "History of Cryptography: From Caesar to Enigma"

---

## Conclusion

Classical ciphers like ROT-13, Caesar cipher, and Al Bhed represent important historical steps in cryptography. While no longer secure, they provide:

- **Educational Value**: Understanding basic encryption principles
- **Historical Context**: Evolution of cryptographic thought
- **Practical Skills**: Foundation for modern cryptanalysis
- **Entertainment**: Gaming and puzzle applications

Remember: **These are for learning and fun, not for security!**

For actual encryption needs, use modern, peer-reviewed algorithms:
- AES-256 for symmetric encryption
- RSA/ECC for asymmetric encryption
- TLS/SSL for secure communications
- Proper key management and authentication

---

**Week 3: Classical Ciphers | Red Team Livestream Production Kit**  
© 2026 • For educational purposes only
