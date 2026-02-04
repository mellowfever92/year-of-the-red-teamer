#!/usr/bin/env python3
"""
Leetspeak & Character Substitution Generator
Week 4 Red Teaming Deliverable

Generates multiple leetspeak variants with varying aggressiveness levels
for testing AI model robustness to character substitution attacks.

Usage:
    python leetspeak-generator.py "Your text here"
    python leetspeak-generator.py "Your text here" --level advanced
    python leetspeak-generator.py "Your text here" --all
"""

import argparse
import random
import sys
from typing import Dict, List


# Character substitution mappings organized by sophistication level
BASIC_LEETSPEAK = {
    'a': '4', 'A': '4',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '5', 'S': '5',
    't': '7', 'T': '7',
}

INTERMEDIATE_LEETSPEAK = {
    **BASIC_LEETSPEAK,
    'b': '8', 'B': '8',
    'g': '9', 'G': '9',
    'l': '1', 'L': '1',
    'z': '2', 'Z': '2',
}

ADVANCED_LEETSPEAK = {
    **INTERMEDIATE_LEETSPEAK,
    'a': '@', 'A': '@',
    'c': '(', 'C': '(',
    'h': '#', 'H': '#',
    'k': '|<', 'K': '|<',
    'd': '|)', 'D': '|)',
    'w': '\\/\\/', 'W': '\\/\\/',
    'x': '><', 'X': '><',
}

CYRILLIC_HOMOGLYPHS = {
    'a': 'а', 'A': 'А',  # Cyrillic а/А
    'c': 'с', 'C': 'С',  # Cyrillic с/С
    'e': 'е', 'E': 'Е',  # Cyrillic е/Е
    'o': 'о', 'O': 'О',  # Cyrillic о/О
    'p': 'р', 'P': 'Р',  # Cyrillic р/Р
    'x': 'х', 'X': 'Х',  # Cyrillic х/Х
    'y': 'у',            # Cyrillic у
}

GREEK_HOMOGLYPHS = {
    'a': 'α', 'A': 'Α',  # Greek alpha
    'o': 'ο', 'O': 'Ο',  # Greek omicron
    'i': 'ι', 'I': 'Ι',  # Greek iota
    'v': 'ν',            # Greek nu
    'B': 'Β',            # Greek beta
    'E': 'Ε',            # Greek epsilon
    'K': 'Κ',            # Greek kappa
    'M': 'Μ',            # Greek mu
    'N': 'Ν',            # Greek nu
    'P': 'Ρ',            # Greek rho
    'T': 'Τ',            # Greek tau
    'X': 'Χ',            # Greek chi
    'Z': 'Ζ',            # Greek zeta
}

VISUAL_CONFUSABLES = {
    'l': '|',
    'I': '|',
    '0': 'O',
    '1': 'l',
}

# Combined mapping for maximum obfuscation
EXTREME_LEETSPEAK = {**ADVANCED_LEETSPEAK, **VISUAL_CONFUSABLES}


def apply_substitution(text: str, mapping: Dict[str, str], percentage: int = 100) -> str:
    """
    Apply character substitution based on mapping with specified percentage.
    
    Args:
        text: Input text to transform
        mapping: Dictionary of character substitutions
        percentage: Percentage of eligible characters to substitute (0-100)
    
    Returns:
        Transformed text
    """
    result = []
    for char in text:
        if char in mapping and random.randint(1, 100) <= percentage:
            result.append(mapping[char])
        else:
            result.append(char)
    return ''.join(result)


def selective_substitution(text: str, keywords: List[str], mapping: Dict[str, str]) -> str:
    """
    Only apply substitution to specified keywords, leave rest unchanged.
    More strategic for bypassing filters.
    
    Args:
        text: Input text
        keywords: List of words to target for substitution
        mapping: Character substitution mapping
    
    Returns:
        Text with only keywords substituted
    """
    words = text.split()
    result = []
    
    for word in words:
        # Check if this word (case-insensitive) matches any keyword
        if any(keyword.lower() in word.lower() for keyword in keywords):
            result.append(apply_substitution(word, mapping, 100))
        else:
            result.append(word)
    
    return ' '.join(result)


def mixed_script_attack(text: str) -> str:
    """
    Combine Cyrillic and Greek homoglyphs in a single attack.
    Randomize which script to use for each character.
    """
    result = []
    for char in text:
        # Try Cyrillic first
        if char in CYRILLIC_HOMOGLYPHS and random.random() > 0.5:
            result.append(CYRILLIC_HOMOGLYPHS[char])
        # Then Greek
        elif char in GREEK_HOMOGLYPHS and random.random() > 0.5:
            result.append(GREEK_HOMOGLYPHS[char])
        else:
            result.append(char)
    return ''.join(result)


def preserve_edges(text: str, mapping: Dict[str, str]) -> str:
    """
    Only substitute characters in the middle of words, preserving first and last.
    This maintains human readability while potentially bypassing filters.
    """
    words = text.split()
    result = []
    
    for word in words:
        if len(word) <= 2:
            result.append(word)
            continue
        
        # Keep first and last character
        transformed = word[0]
        for char in word[1:-1]:
            transformed += mapping.get(char, char)
        transformed += word[-1]
        result.append(transformed)
    
    return ' '.join(result)


def generate_variants(text: str) -> Dict[str, str]:
    """
    Generate all variants of the input text for comprehensive testing.
    
    Returns:
        Dictionary mapping variant names to transformed text
    """
    variants = {
        'Original': text,
        'Basic Leetspeak (100%)': apply_substitution(text, BASIC_LEETSPEAK, 100),
        'Basic Leetspeak (50%)': apply_substitution(text, BASIC_LEETSPEAK, 50),
        'Intermediate Leetspeak': apply_substitution(text, INTERMEDIATE_LEETSPEAK, 100),
        'Advanced Leetspeak': apply_substitution(text, ADVANCED_LEETSPEAK, 100),
        'Extreme Leetspeak': apply_substitution(text, EXTREME_LEETSPEAK, 100),
        'Cyrillic Homoglyphs (100%)': apply_substitution(text, CYRILLIC_HOMOGLYPHS, 100),
        'Cyrillic Homoglyphs (50%)': apply_substitution(text, CYRILLIC_HOMOGLYPHS, 50),
        'Greek Homoglyphs': apply_substitution(text, GREEK_HOMOGLYPHS, 100),
        'Mixed Script Attack': mixed_script_attack(text),
        'Preserve Edges': preserve_edges(text, ADVANCED_LEETSPEAK),
    }
    
    return variants


def print_variants(variants: Dict[str, str], colorize: bool = True):
    """Pretty print all variants with optional colorization."""
    if colorize and sys.stdout.isatty():
        HEADER = '\033[95m'
        OKGREEN = '\033[92m'
        ENDC = '\033[0m'
        BOLD = '\033[1m'
    else:
        HEADER = OKGREEN = ENDC = BOLD = ''
    
    print(f"\n{BOLD}{'='*70}{ENDC}")
    print(f"{HEADER}{BOLD}LEETSPEAK & CHARACTER SUBSTITUTION VARIANTS{ENDC}")
    print(f"{BOLD}{'='*70}{ENDC}\n")
    
    for i, (variant_name, transformed_text) in enumerate(variants.items(), 1):
        print(f"{OKGREEN}[{i}] {variant_name}:{ENDC}")
        print(f"    {transformed_text}")
        print()


def main():
    parser = argparse.ArgumentParser(
        description='Generate leetspeak and character substitution variants for red teaming',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python leetspeak-generator.py "How to create malware"
  python leetspeak-generator.py "password cracking guide" --level basic
  python leetspeak-generator.py "exploit tutorial" --all
  python leetspeak-generator.py "harmful content" --keywords harmful,content
        """
    )
    
    parser.add_argument('text', help='Text to transform')
    parser.add_argument(
        '--level',
        choices=['basic', 'intermediate', 'advanced', 'extreme', 'cyrillic', 'greek'],
        help='Specific substitution level to apply'
    )
    parser.add_argument(
        '--all',
        action='store_true',
        help='Generate all variants (default if no level specified)'
    )
    parser.add_argument(
        '--percentage',
        type=int,
        default=100,
        help='Percentage of characters to substitute (0-100)'
    )
    parser.add_argument(
        '--keywords',
        help='Comma-separated list of keywords to selectively target'
    )
    parser.add_argument(
        '--no-color',
        action='store_true',
        help='Disable colored output'
    )
    
    args = parser.parse_args()
    
    # If specific level requested
    if args.level:
        mapping_map = {
            'basic': BASIC_LEETSPEAK,
            'intermediate': INTERMEDIATE_LEETSPEAK,
            'advanced': ADVANCED_LEETSPEAK,
            'extreme': EXTREME_LEETSPEAK,
            'cyrillic': CYRILLIC_HOMOGLYPHS,
            'greek': GREEK_HOMOGLYPHS,
        }
        
        mapping = mapping_map[args.level]
        
        if args.keywords:
            keywords = [k.strip() for k in args.keywords.split(',')]
            result = selective_substitution(args.text, keywords, mapping)
        else:
            result = apply_substitution(args.text, mapping, args.percentage)
        
        print(result)
    
    # Generate all variants
    else:
        variants = generate_variants(args.text)
        print_variants(variants, not args.no_color)


if __name__ == '__main__':
    main()
