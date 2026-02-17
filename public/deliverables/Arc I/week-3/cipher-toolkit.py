#!/usr/bin/env python3
"""
Classical Cipher Toolkit
Week 3: ROT-13 and Al Bhed Language Tools

A comprehensive command-line utility for classical cipher operations,
including ROT-13, Caesar cipher, Al Bhed translation, frequency analysis,
and brute-force decryption.

Usage:
    python3 cipher-toolkit.py --rot13 "Hello World"
    python3 cipher-toolkit.py --caesar 3 "Hello World"
    python3 cipher-toolkit.py --al-bhed "Hello"
    python3 cipher-toolkit.py --analyze input.txt
    python3 cipher-toolkit.py --brute-force "Khoor Zruog"

Author: Red Team Livestream Production Kit
License: MIT
"""

import argparse
import sys
import re
from collections import Counter
from pathlib import Path


# Al Bhed cipher mapping
AL_BHED_MAP = {
    'A': 'Y', 'B': 'P', 'C': 'L', 'D': 'T', 'E': 'A',
    'F': 'V', 'G': 'K', 'H': 'R', 'I': 'E', 'J': 'Z',
    'K': 'G', 'L': 'M', 'M': 'S', 'N': 'H', 'O': 'U',
    'P': 'O', 'Q': 'Q', 'R': 'N', 'S': 'D', 'T': 'W',
    'U': 'J', 'V': 'X', 'W': 'F', 'X': 'C', 'Y': 'I', 'Z': 'B'
}

# Create reverse mapping for Al Bhed
ENGLISH_MAP = {v: k for k, v in AL_BHED_MAP.items()}

# English letter frequency (percentages)
ENGLISH_FREQ = {
    'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97,
    'N': 6.75, 'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25,
    'L': 4.03, 'C': 2.78, 'U': 2.76, 'M': 2.41, 'W': 2.36,
    'F': 2.23, 'G': 2.02, 'Y': 1.97, 'P': 1.93, 'B': 1.29,
    'V': 0.98, 'K': 0.77, 'J': 0.15, 'X': 0.15, 'Q': 0.10, 'Z': 0.07
}

# Common English words for validation
COMMON_WORDS = {
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what'
}


class CipherToolkit:
    """Main cipher operations class"""
    
    @staticmethod
    def rot_n(text, shift, preserve_case=True, preserve_non_alpha=True):
        """
        Apply ROT-N cipher with configurable shift.
        
        Args:
            text: Input text to encode/decode
            shift: Number of positions to shift (0-25)
            preserve_case: Keep original case
            preserve_non_alpha: Keep non-alphabetic characters
        
        Returns:
            Transformed text
        """
        result = []
        
        for char in text:
            if not char.isalpha():
                result.append(char if preserve_non_alpha else '')
                continue
            
            # Determine base (uppercase or lowercase)
            is_upper = char.isupper()
            base = ord('A') if is_upper else ord('a')
            
            # Apply shift
            shifted = (ord(char) - base + shift) % 26 + base
            new_char = chr(shifted)
            
            # Apply case preservation
            if preserve_case:
                result.append(new_char)
            else:
                result.append(new_char.lower())
        
        return ''.join(result)
    
    @staticmethod
    def rot13(text):
        """ROT-13 encoding/decoding (shift of 13)"""
        return CipherToolkit.rot_n(text, 13)
    
    @staticmethod
    def caesar_encrypt(text, shift):
        """Caesar cipher encryption"""
        return CipherToolkit.rot_n(text, shift)
    
    @staticmethod
    def caesar_decrypt(text, shift):
        """Caesar cipher decryption"""
        return CipherToolkit.rot_n(text, 26 - shift)
    
    @staticmethod
    def al_bhed_translate(text, to_al_bhed=True):
        """
        Translate between English and Al Bhed.
        
        Args:
            text: Input text
            to_al_bhed: True to convert to Al Bhed, False to convert to English
        
        Returns:
            Translated text
        """
        mapping = AL_BHED_MAP if to_al_bhed else ENGLISH_MAP
        result = []
        
        for char in text:
            if char.upper() in mapping:
                translated = mapping[char.upper()]
                result.append(translated if char.isupper() else translated.lower())
            else:
                result.append(char)
        
        return ''.join(result)
    
    @staticmethod
    def frequency_analysis(text):
        """
        Perform letter frequency analysis on text.
        
        Returns:
            Dictionary with frequency statistics
        """
        # Extract only letters
        letters = [c.upper() for c in text if c.isalpha()]
        total = len(letters)
        
        if total == 0:
            return {'error': 'No letters found in text'}
        
        # Count frequencies
        counts = Counter(letters)
        frequencies = {letter: (count / total) * 100 
                      for letter, count in counts.items()}
        
        # Sort by frequency
        sorted_freq = sorted(frequencies.items(), 
                           key=lambda x: x[1], 
                           reverse=True)
        
        return {
            'total_letters': total,
            'unique_letters': len(counts),
            'frequencies': frequencies,
            'sorted': sorted_freq,
            'most_common': sorted_freq[0] if sorted_freq else None
        }
    
    @staticmethod
    def chi_squared_score(text):
        """
        Calculate chi-squared statistic against English frequency.
        Lower scores indicate closer match to English.
        """
        analysis = CipherToolkit.frequency_analysis(text)
        
        if 'error' in analysis:
            return float('inf')
        
        frequencies = analysis.get('frequencies', {})
        if not isinstance(frequencies, dict):
            return float('inf')
        
        score = 0
        
        for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
            observed = frequencies.get(letter, 0)
            expected = ENGLISH_FREQ[letter]
            score += ((observed - expected) ** 2) / expected
        
        return score
    
    @staticmethod
    def count_common_words(text):
        """Count how many common English words appear in text"""
        words = re.findall(r'\b[a-z]+\b', text.lower())
        return sum(1 for word in words if word in COMMON_WORDS)
    
    @staticmethod
    def brute_force_caesar(ciphertext):
        """
        Try all 26 possible Caesar cipher shifts.
        
        Returns:
            List of tuples (shift, decrypted_text, score)
        """
        results = []
        
        for shift in range(26):
            plaintext = CipherToolkit.caesar_decrypt(ciphertext, shift)
            
            # Score based on chi-squared and common words
            chi_score = CipherToolkit.chi_squared_score(plaintext)
            word_count = CipherToolkit.count_common_words(plaintext)
            combined_score = chi_score - (word_count * 10)  # Favor common words
            
            results.append({
                'shift': shift,
                'text': plaintext,
                'chi_squared': chi_score,
                'common_words': word_count,
                'score': combined_score
            })
        
        # Sort by combined score (lower is better)
        results.sort(key=lambda x: x['score'])
        return results


def print_banner():
    """Print tool banner"""
    banner = """
╔══════════════════════════════════════════════════════════════╗
║           CLASSICAL CIPHER TOOLKIT - WEEK 3                   ║
║         ROT-13 • Caesar Cipher • Al Bhed Translator          ║
╚══════════════════════════════════════════════════════════════╝
    """
    print(banner)


def print_frequency_chart(analysis):
    """Print visual frequency analysis chart"""
    print("\n📊 Letter Frequency Analysis:")
    print("=" * 60)
    
    sorted_freq = analysis['sorted']
    max_freq = sorted_freq[0][1] if sorted_freq else 1
    
    for letter, freq in sorted_freq[:15]:  # Top 15 letters
        bar_length = int((freq / max_freq) * 40)
        bar = '█' * bar_length
        print(f"{letter}: {bar} {freq:.2f}%")
    
    print(f"\nTotal letters: {analysis['total_letters']}")
    print(f"Unique letters: {analysis['unique_letters']}")


def main():
    parser = argparse.ArgumentParser(
        description='Classical Cipher Toolkit - Week 3',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --rot13 "Hello World"
  %(prog)s --caesar 3 "Attack at dawn"
  %(prog)s --al-bhed "Hello from Spira"
  %(prog)s --al-bhed --from-al-bhed "Rammu vnus Doven"
  %(prog)s --analyze message.txt
  %(prog)s --brute-force "Uryyb Jbeyq" --top 5
  %(prog)s --frequency "The quick brown fox"
        """
    )
    
    # Input options
    input_group = parser.add_mutually_exclusive_group()
    input_group.add_argument('text', nargs='?', help='Text to process')
    input_group.add_argument('-f', '--file', help='Input file to process')
    
    # Operation modes
    parser.add_argument('--rot13', action='store_true', 
                       help='Apply ROT-13 cipher')
    parser.add_argument('--caesar', type=int, metavar='SHIFT',
                       help='Apply Caesar cipher with shift N')
    parser.add_argument('--al-bhed', action='store_true',
                       help='Translate to Al Bhed language')
    parser.add_argument('--from-al-bhed', action='store_true',
                       help='Translate from Al Bhed to English')
    parser.add_argument('--analyze', action='store_true',
                       help='Perform frequency analysis')
    parser.add_argument('--brute-force', action='store_true',
                       help='Brute-force Caesar cipher (try all shifts)')
    parser.add_argument('--frequency', action='store_true',
                       help='Show letter frequency chart')
    
    # Options
    parser.add_argument('--top', type=int, default=3,
                       help='Show top N results for brute-force (default: 3)')
    parser.add_argument('--output', '-o', help='Output file')
    parser.add_argument('--quiet', '-q', action='store_true',
                       help='Minimal output')
    parser.add_argument('--version', action='version', version='%(prog)s 1.0')
    
    args = parser.parse_args()
    
    # Get input text
    if args.file:
        try:
            with open(args.file, 'r', encoding='utf-8') as f:
                text = f.read()
        except Exception as e:
            print(f"❌ Error reading file: {e}", file=sys.stderr)
            sys.exit(1)
    elif args.text:
        text = args.text
    else:
        # Read from stdin
        if not sys.stdin.isatty():
            text = sys.stdin.read()
        else:
            parser.print_help()
            sys.exit(0)
    
    if not args.quiet:
        print_banner()
    
    # Process based on operation
    result = None
    
    try:
        if args.rot13:
            result = CipherToolkit.rot13(text)
            if not args.quiet:
                print("🔒 ROT-13 Encoding/Decoding:")
                print("-" * 60)
            print(result)
        
        elif args.caesar is not None:
            result = CipherToolkit.caesar_encrypt(text, args.caesar)
            if not args.quiet:
                print(f"🔒 Caesar Cipher (Shift {args.caesar}):")
                print("-" * 60)
            print(result)
        
        elif args.al_bhed:
            result = CipherToolkit.al_bhed_translate(text, to_al_bhed=True)
            if not args.quiet:
                print("⚙️  English → Al Bhed Translation:")
                print("-" * 60)
            print(result)
        
        elif args.from_al_bhed:
            result = CipherToolkit.al_bhed_translate(text, to_al_bhed=False)
            if not args.quiet:
                print("⚙️  Al Bhed → English Translation:")
                print("-" * 60)
            print(result)
        
        elif args.analyze or args.frequency:
            analysis = CipherToolkit.frequency_analysis(text)
            if 'error' in analysis:
                print(f"❌ {analysis['error']}", file=sys.stderr)
                sys.exit(1)
            
            print_frequency_chart(analysis)
            
            chi_score = CipherToolkit.chi_squared_score(text)
            word_count = CipherToolkit.count_common_words(text)
            
            print(f"\n📈 Statistical Analysis:")
            print(f"Chi-squared score: {chi_score:.2f} (lower = more English-like)")
            print(f"Common English words: {word_count}")
        
        elif args.brute_force:
            if not args.quiet:
                print("🔓 Brute-forcing Caesar cipher...")
                print("=" * 60)
            
            results = CipherToolkit.brute_force_caesar(text)
            
            print(f"\n🎯 Top {args.top} most likely plaintexts:\n")
            
            for i, result_dict in enumerate(results[:args.top], 1):
                print(f"#{i} - Shift {result_dict['shift']}: "
                      f"(Score: {result_dict['score']:.1f}, "
                      f"Words: {result_dict['common_words']})")
                print(f"   {result_dict['text'][:100]}")
                if len(result_dict['text']) > 100:
                    print("   ...")
                print()
        
        else:
            parser.print_help()
            sys.exit(0)
        
        # Save output if requested
        if args.output and result:
            try:
                with open(args.output, 'w', encoding='utf-8') as f:
                    f.write(result)
                if not args.quiet:
                    print(f"\n✅ Output saved to: {args.output}")
            except Exception as e:
                print(f"❌ Error writing output: {e}", file=sys.stderr)
                sys.exit(1)
    
    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
        sys.exit(130)
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
