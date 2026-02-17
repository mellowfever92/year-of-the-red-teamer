# Week 4 Deliverables: Leetspeak & Character Substitution Attacks

## Deliverable Overview

This week focuses on character-level obfuscation techniques that bypass keyword filters and automated safety systems. All deliverables are designed to be practical tools and references for red teaming sessions.

## Files Included

### 1. [unicode-homoglyph-tables.md](./unicode-homoglyph-tables.md)
**Purpose**: Comprehensive reference tables for Unicode homoglyph attacks

**Contents**:
- Complete Cyrillic/Greek/Mathematical symbol mappings
- Visual similarity ratings for each character
- Practical attack examples with real encodings
- Testing methodology and effectiveness metrics
- Defense considerations

**Use Case**: When leetspeak fails, escalate to homoglyphs for invisible character substitution that bypasses even sophisticated filters.

**Key Insight**: Homoglyphs are more effective than leetspeak because they maintain perfect visual similarity while having different Unicode codepoints.

---

### 2. [leetspeak-generator.py](./leetspeak-generator.py)
**Purpose**: Automated generation of leetspeak variants at multiple sophistication levels

**Features**:
- 6 different substitution levels (basic → extreme)
- Percentage-based application (25%, 50%, 75%, 100%)
- Selective keyword targeting
- Cyrillic and Greek homoglyph support
- Preserve-edges mode for readability
- Batch generation of all variants

**Usage Examples**:
```bash
# Generate all variants
python leetspeak-generator.py "harmful text here"

# Specific level with 50% substitution
python leetspeak-generator.py "text" --level advanced --percentage 50

# Only substitute specific keywords
python leetspeak-generator.py "how to hack passwords" --keywords hack,passwords

# Generate single variant for scripting
python leetspeak-generator.py "text" --level cyrillic --no-color
```

**Use Case**: Rapid generation of multiple obfuscated variants for A/B testing against different models or filters.

---

### 3. [compound-attack-patterns.md](./compound-attack-patterns.md)
**Purpose**: Catalog of multi-technique attack combinations for maximum effectiveness

**Contents**:
- 10 proven compound attack patterns
- Effectiveness matrix comparing all patterns
- Three-layer attack methodology
- Model-specific optimization strategies
- Real-world case studies with results
- Automation frameworks for systematic testing

**Key Patterns**:
1. **Leetspeak + Roleplay**: Character obfuscation + persona adoption
2. **Leetspeak + Code Obfuscation**: Text encoding + code delivery
3. **Homoglyphs + Translation Chain**: Invisible encoding + linguistic tasks
4. **Selective Substitution + Social Engineering**: Targeted encoding + elaborate pretext
5. **Mixed Script + Chain-of-Thought**: Unicode attack + deep reasoning

**Use Case**: When single-technique attacks fail, refer to this document for proven combination strategies that exploit multiple vulnerability surfaces.

**Strategic Value**: Compound attacks have multiplicative (not additive) effectiveness - combining techniques creates synergies that bypass layered defenses.

---

## How to Use These Deliverables

### For Red Teaming Sessions

**Workflow**:
1. **Start with leetspeak-generator.py** to create initial obfuscated variants
2. **Test variants** against target model/system
3. **If blocked**, escalate to **homoglyphs** (reference unicode-homoglyph-tables.md)
4. **If still blocked**, apply **compound patterns** (compound-attack-patterns.md)
5. **Document** which combinations work on which models

### For Research & Analysis

**Questions These Deliverables Help Answer**:
- Which substitution level provides optimal filter evasion?
- Are models more vulnerable to leetspeak or homoglyphs?
- Which compound patterns have highest success rates?
- How do different models compare in robustness?
- What percentage of character substitution breaks semantic understanding?

### For Defense Development

**Insights for Model Developers**:
1. **Unicode normalization** is essential (convert to NFD/NFC before analysis)
2. **Semantic analysis** must occur on decoded/normalized content
3. **Character-level filters** are insufficient - focus on intent understanding
4. **Context awareness** needed to recognize framing devices
5. **Unified safety standards** across text, code, roleplay contexts

---

## Testing Progression

### Phase 1: Baseline (Single Technique)
```
Test → Leetspeak only → Measure success rate
Test → Homoglyphs only → Measure success rate
Test → Roleplay only → Measure success rate
```

### Phase 2: Compound (Two Techniques)
```
Test → Leetspeak + Roleplay → Compare to baselines
Test → Homoglyphs + Code → Compare to baselines
Test → [All pairs] → Identify synergies
```

### Phase 3: Advanced (Three+ Techniques)
```
Test → Character + Context + Delivery → Maximum obfuscation
Optimize → Find minimum combination for success
Document → Model-specific vulnerabilities
```

---

## Quick Reference: When to Use What

| Scenario | Recommended Approach | Deliverable to Use |
|----------|---------------------|-------------------|
| Initial testing | Basic leetspeak (50-100%) | leetspeak-generator.py |
| Keyword filter detected | Homoglyphs (Cyrillic/Greek) | unicode-homoglyph-tables.md |
| Context-aware safety | Compound attack (2-3 layers) | compound-attack-patterns.md |
| Code-based testing | Leetspeak + Code pattern | compound-attack-patterns.md |
| Maximum stealth | Selective homoglyphs only | unicode-homoglyph-tables.md |
| Systematic research | All variants + automation | All three deliverables |

---

## Effectiveness Summary

### Character Substitution Alone
- **Basic Leetspeak**: 30-50% bypass rate (obvious substitutions)
- **Advanced Leetspeak**: 40-60% bypass rate (complex substitutions)
- **Cyrillic Homoglyphs**: 70-85% bypass rate (invisible to character filters)
- **Greek Homoglyphs**: 65-80% bypass rate (less common but effective)
- **Selective Substitution**: 50-70% bypass rate (targeted keywords only)

### Compound Attacks
- **Leetspeak + Roleplay**: 60-75% bypass rate
- **Leetspeak + Code**: 75-90% bypass rate (code context reduces scrutiny)
- **Homoglyphs + Translation**: 70-85% bypass rate
- **Three-Layer Attack**: 80-95% bypass rate (maximum obfuscation)

*Note: Rates vary significantly by model, filter type, and content severity*

---

## Key Insights from Week 4

1. **Homoglyphs > Leetspeak** for pure filter evasion (perfect visual match)
2. **Compound > Single** for safety system bypass (exploits multiple gaps)
3. **Selective > Full** for natural appearance (less likely to trigger detection)
4. **Code Context** significantly increases compliance (technical framing)
5. **Model-Specific** vulnerabilities exist (test systematically across models)

---

## Next Steps

After mastering character substitution:
- **Week 5+**: Combine with prompt injection, token manipulation
- **Advanced Research**: Tokenization impact, embedding space analysis
- **Defense**: Develop Unicode-aware, semantically-focused safety systems

---

## Ethical Reminder

These techniques reveal real vulnerabilities in AI safety systems. Use responsibly:
- ✅ Test in authorized research environments
- ✅ Document findings for model improvement
- ✅ Share vulnerabilities with developers
- ❌ Don't use for malicious purposes
- ❌ Don't deploy in production systems
- ❌ Don't share working exploits publicly

The goal is **understanding and improving AI safety**, not enabling harm.

---

## Related Resources

- **Week 3**: Classical cipher techniques (ROT-13, Caesar)
- **Week 2**: Network encoding and context manipulation
- **Week 1**: Foundation of obfuscation and evasion

All deliverables work together as a comprehensive red teaming toolkit.
