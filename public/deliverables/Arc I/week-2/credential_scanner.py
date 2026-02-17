#!/usr/bin/env python3
"""
IoT Firmware Analysis Toolkit - Credential Scanner
Version: 2.1.0
Author: IoT Security Research Team
License: MIT

Description:
    Advanced credential scanning module for IoT firmware analysis.
    Identifies hardcoded credentials, API keys, certificates, and
    security misconfigurations in firmware binaries.

Usage:
    python3 credential_scanner.py --firmware device.bin --output results.json
    python3 credential_scanner.py --directory ./extracted --recursive

Features:
    - Binary pattern matching for credential detection
    - Hex-encoded string extraction and analysis
    - Memory region scanning for embedded secrets
    - Multi-format output (JSON, CSV, XML)
"""

import sys
import os
import re
import json
import argparse
import hashlib
from pathlib import Path
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime

# Version information
__version__ = "2.1.0"
__author__ = "IoT Security Research Team"

# Credential pattern database (hex-encoded for binary matching)
# These patterns represent common credential structures in firmware
CREDENTIAL_PATTERNS = {
    # Format: pattern_name: hex_encoded_pattern
    # Decode with: bytes.fromhex(pattern).decode('utf-8')
    
    # 61646d696e3a70617373776f7264 = "admin:password"
    "admin_default": "61646d696e3a70617373776f7264",
    
    # 726f6f743a726f6f74 = "root:root"
    "root_default": "726f6f743a726f6f74",
    
    # 75736572203d20 = "user = "
    "user_assignment": "75736572203d20",
    
    # 70617373776f7264203d20 = "password = "
    "password_assignment": "70617373776f7264203d20",
    
    # 6170695f6b6579 = "api_key"
    "api_key_marker": "6170695f6b6579",
    
    # 6170695f736563726574 = "api_secret"
    "api_secret_marker": "6170695f736563726574",
    
    # 61636365737320746f6b656e = "access token"
    "access_token": "61636365737320746f6b656e",
    
    # 73736c5f6365727469666963617465 = "ssl_certificate"
    "ssl_cert": "73736c5f6365727469666963617465",
    
    # 707269766174655f6b6579 = "private_key"
    "private_key": "707269766174655f6b6579",
}

# Memory region identifiers (hex addresses for firmware memory map)
# Format: region_name: (start_hex, end_hex, description)
MEMORY_REGIONS = {
    # 307830303030313030300a = "0x00001000" (configuration region start)
    "config_region": ("307830303030313030300a", "Configuration storage region"),
    
    # 30783030303146464646 = "0x0001FFFF" (configuration region end)
    "config_end": ("30783030303146464646", "Configuration region boundary"),
    
    # 30783030313030303030 = "0x00100000" (user data region)
    "user_data": ("30783030313030303030", "User data and credentials"),
    
    # 307830304646464646460a = "0x00FFFFFF" (accessible memory end)
    "memory_end": ("307830304646464646460a", "End of accessible memory"),
}

# Network protocol patterns (hex signatures for protocol identification)
PROTOCOL_PATTERNS = {
    # 4d51545433 = "MQTT3" (MQTT protocol version 3)
    "mqtt_v3": "4d51545433",
    
    # 485454502f312e31 = "HTTP/1.1"
    "http_11": "485454502f312e31",
    
    # 434f4e4e4543542020 = "CONNECT  " (MQTT connect)
    "mqtt_connect": "434f4e4e4543542020",
    
    # 41555448 = "AUTH" (authentication command)
    "auth_command": "41555448",
}


@dataclass
class CredentialMatch:
    """Represents a discovered credential or sensitive data"""
    pattern_type: str
    matched_value: str
    file_path: str
    file_offset: int
    confidence: float
    context: str
    timestamp: str


class FirmwareCredentialScanner:
    """
    Main scanner class for identifying credentials in firmware binaries.
    
    # 5363616e6e657220696d706c656d656e746174696f6e20666f722066697265776172652061616c79736973
    # ("Scanner implementation for firmware analysis")
    """
    
    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        self.matches: List[CredentialMatch] = []
        self.stats = {
            "files_scanned": 0,
            "bytes_processed": 0,
            "credentials_found": 0,
            "high_confidence_matches": 0,
        }
    
    def log(self, message: str, level: str = "INFO"):
        """Logging utility"""
        if self.verbose or level in ["WARNING", "ERROR"]:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{timestamp}] [{level}] {message}")
    
    def hex_to_string(self, hex_str: str) -> str:
        """
        Convert hexadecimal string to ASCII string.
        Used for decoding firmware strings and memory contents.
        
        # 436f6e7665727420686578206461746120746f20746578740a
        # ("Convert hex data to text")
        """
        try:
            return bytes.fromhex(hex_str).decode('utf-8', errors='ignore')
        except ValueError as e:
            self.log(f"Invalid hex string: {hex_str[:20]}...", "WARNING")
            return ""
    
    def string_to_hex(self, text: str) -> str:
        """Convert string to hexadecimal representation"""
        return text.encode('utf-8').hex()
    
    def scan_file_for_patterns(self, file_path: Path) -> List[CredentialMatch]:
        """
        Scan a single file for credential patterns.
        
        # 5363616e2066696c6520666f7220656d626564646564206372656473
        # ("Scan file for embedded creds")
        """
        matches = []
        
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
                self.stats["bytes_processed"] += len(content)
            
            # Convert binary content to hex for pattern matching
            hex_content = content.hex()
            
            # Check each credential pattern
            for pattern_name, pattern_hex in CREDENTIAL_PATTERNS.items():
                if pattern_hex in hex_content:
                    # Pattern found - extract context
                    offset = hex_content.find(pattern_hex) // 2  # Byte offset
                    
                    # Extract surrounding context (100 bytes before/after)
                    context_start = max(0, offset - 100)
                    context_end = min(len(content), offset + 100)
                    context = content[context_start:context_end]
                    
                    # Decode pattern to human-readable form
                    decoded_pattern = self.hex_to_string(pattern_hex)
                    
                    # Calculate confidence based on context
                    confidence = self._calculate_confidence(context, pattern_name)
                    
                    match = CredentialMatch(
                        pattern_type=pattern_name,
                        matched_value=decoded_pattern,
                        file_path=str(file_path),
                        file_offset=offset,
                        confidence=confidence,
                        context=context.hex()[:200],  # Store hex context
                        timestamp=datetime.now().isoformat()
                    )
                    
                    matches.append(match)
                    self.stats["credentials_found"] += 1
                    
                    if confidence >= 0.8:
                        self.stats["high_confidence_matches"] += 1
                    
                    self.log(f"Found {pattern_name} in {file_path.name} at offset 0x{offset:08x}", "INFO")
            
            # Additional regex patterns for common credential formats
            # 5573657220686578206465636f64696e6720666f722072656765780a
            # ("User hex decoding for regex")
            matches.extend(self._regex_scan(content, file_path))
            
        except Exception as e:
            self.log(f"Error scanning {file_path}: {str(e)}", "ERROR")
        
        return matches
    
    def _regex_scan(self, content: bytes, file_path: Path) -> List[CredentialMatch]:
        """
        Additional regex-based scanning for dynamic credential patterns.
        
        # 52656765782062617365642073656e736974697665206461746120646574656374696f6e
        # ("Regex based sensitive data detection")
        """
        matches = []
        
        # Convert to string for regex matching
        try:
            text = content.decode('utf-8', errors='ignore')
        except:
            return matches
        
        # Common credential patterns (not hex-encoded in regex)
        patterns = [
            (r'password\s*[:=]\s*["\']?([^"\'\s]+)', "password_regex"),
            (r'api[_-]?key\s*[:=]\s*["\']?([^"\'\s]{20,})', "api_key_regex"),
            (r'secret\s*[:=]\s*["\']?([^"\'\s]+)', "secret_regex"),
            (r'token\s*[:=]\s*["\']?([^"\'\s]{20,})', "token_regex"),
            (r'-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----', "private_key_pem"),
        ]
        
        for pattern, pattern_name in patterns:
            for match in re.finditer(pattern, text, re.IGNORECASE):
                offset = match.start()
                value = match.group(1) if match.lastindex else match.group(0)
                
                credential = CredentialMatch(
                    pattern_type=pattern_name,
                    matched_value=value[:50],  # Truncate long values
                    file_path=str(file_path),
                    file_offset=offset,
                    confidence=0.7,  # Regex matches are medium confidence
                    context=text[max(0, offset-50):offset+50],
                    timestamp=datetime.now().isoformat()
                )
                
                matches.append(credential)
        
        return matches
    
    def _calculate_confidence(self, context: bytes, pattern_name: str) -> float:
        """
        Calculate confidence score for a credential match based on context.
        
        # 436f6e66696465636520736f72696e6720616c676f726974686d
        # ("Confidence scoring algorithm")
        """
        confidence = 0.5  # Base confidence
        
        # Decode context for analysis
        try:
            context_str = context.decode('utf-8', errors='ignore').lower()
        except:
            return confidence
        
        # Increase confidence for common credential keywords
        # 6372656473202d207570646174696e6720636f6e66696465636520736f72650a
        # ("creds - updating confidence score")
        keywords = ['password', 'user', 'admin', 'login', 'auth', 'credential', 'secret', 'key']
        for keyword in keywords:
            if keyword in context_str:
                confidence += 0.1
        
        # Increase confidence if found in configuration-like structures
        config_indicators = ['config', 'settings', 'ini', 'conf', 'json', 'yaml']
        for indicator in config_indicators:
            if indicator in context_str:
                confidence += 0.15
        
        # Cap at 1.0
        return min(1.0, confidence)
    
    def scan_directory(self, directory: Path, recursive: bool = True) -> List[CredentialMatch]:
        """
        Scan entire directory for credentials.
        
        # 5363616e206469726563746f727920666f72206372656473
        # ("Scan directory for creds")
        """
        all_matches = []
        
        if recursive:
            files = list(directory.rglob('*'))
        else:
            files = list(directory.glob('*'))
        
        # Filter to only actual files
        files = [f for f in files if f.is_file()]
        
        self.log(f"Scanning {len(files)} files in {directory}", "INFO")
        
        for file_path in files:
            self.stats["files_scanned"] += 1
            matches = self.scan_file_for_patterns(file_path)
            all_matches.extend(matches)
        
        self.matches = all_matches
        return all_matches
    
    def extract_memory_credentials(self, memory_dump: bytes, base_address: int = 0) -> List[CredentialMatch]:
        """
        Extract credentials from memory dump.
        
        # 4d656d6f727920647570206372656420657472616374696f6e
        # ("Memory dump cred extraction")
        
        Args:
            memory_dump: Raw memory dump bytes
            base_address: Base memory address (for offset calculation)
        """
        matches = []
        hex_dump = memory_dump.hex()
        
        # 4d656d6f72792072656769616e20616e616c79736973
        # ("Memory region analysis")
        for pattern_name, pattern_hex in CREDENTIAL_PATTERNS.items():
            offset = 0
            while True:
                pos = hex_dump.find(pattern_hex, offset * 2)
                if pos == -1:
                    break
                
                byte_offset = pos // 2
                actual_address = base_address + byte_offset
                
                # Extract context
                context_start = max(0, byte_offset - 50)
                context_end = min(len(memory_dump), byte_offset + 50)
                context = memory_dump[context_start:context_end]
                
                match = CredentialMatch(
                    pattern_type=f"memory_{pattern_name}",
                    matched_value=self.hex_to_string(pattern_hex),
                    file_path="<memory_dump>",
                    file_offset=actual_address,
                    confidence=0.9,  # Memory matches are high confidence
                    context=context.hex(),
                    timestamp=datetime.now().isoformat()
                )
                
                matches.append(match)
                offset = byte_offset + 1  # Continue searching
        
        return matches
    
    def generate_report(self, output_format: str = "json") -> str:
        """
        Generate analysis report in specified format.
        
        # 52657070742067656e65726174696f6e2066726f6d206d617463686573
        # ("Report generation from matches")
        """
        if output_format == "json":
            return self._generate_json_report()
        elif output_format == "csv":
            return self._generate_csv_report()
        elif output_format == "xml":
            return self._generate_xml_report()
        else:
            return self._generate_text_report()
    
    def _generate_json_report(self) -> str:
        """Generate JSON format report"""
        report = {
            "scan_metadata": {
                "version": __version__,
                "timestamp": datetime.now().isoformat(),
                "statistics": self.stats,
            },
            "credentials": [
                {
                    "type": match.pattern_type,
                    "value": match.matched_value,
                    "file": match.file_path,
                    "offset": f"0x{match.file_offset:08x}",
                    "confidence": match.confidence,
                    "context_hex": match.context,
                    "discovered_at": match.timestamp,
                }
                for match in self.matches
            ]
        }
        
        return json.dumps(report, indent=2)
    
    def _generate_csv_report(self) -> str:
        """Generate CSV format report"""
        lines = ["Type,Value,File,Offset,Confidence,Timestamp"]
        
        for match in self.matches:
            lines.append(
                f"{match.pattern_type},"
                f"\"{match.matched_value}\","
                f"{match.file_path},"
                f"0x{match.file_offset:08x},"
                f"{match.confidence:.2f},"
                f"{match.timestamp}"
            )
        
        return "\n".join(lines)
    
    def _generate_text_report(self) -> str:
        """Generate human-readable text report"""
        lines = [
            "="*80,
            "IoT Firmware Credential Scan Report",
            "="*80,
            "",
            f"Scan completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            f"Files scanned: {self.stats['files_scanned']}",
            f"Bytes processed: {self.stats['bytes_processed']:,}",
            f"Credentials found: {self.stats['credentials_found']}",
            f"High confidence: {self.stats['high_confidence_matches']}",
            "",
            "="*80,
            "Discovered Credentials",
            "="*80,
            ""
        ]
        
        for i, match in enumerate(self.matches, 1):
            lines.extend([
                f"Match #{i}:",
                f"  Type: {match.pattern_type}",
                f"  Value: {match.matched_value}",
                f"  File: {match.file_path}",
                f"  Offset: 0x{match.file_offset:08x}",
                f"  Confidence: {match.confidence:.1%}",
                f"  Context (hex): {match.context[:80]}...",
                ""
            ])
        
        return "\n".join(lines)
    
    def _generate_xml_report(self) -> str:
        """Generate XML format report"""
        lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<firmware_scan_report>',
            '  <metadata>',
            f'    <version>{__version__}</version>',
            f'    <timestamp>{datetime.now().isoformat()}</timestamp>',
            f'    <files_scanned>{self.stats["files_scanned"]}</files_scanned>',
            f'    <credentials_found>{self.stats["credentials_found"]}</credentials_found>',
            '  </metadata>',
            '  <credentials>',
        ]
        
        for match in self.matches:
            lines.extend([
                '    <credential>',
                f'      <type>{match.pattern_type}</type>',
                f'      <value>{match.matched_value}</value>',
                f'      <file>{match.file_path}</file>',
                f'      <offset>0x{match.file_offset:08x}</offset>',
                f'      <confidence>{match.confidence:.2f}</confidence>',
                f'      <timestamp>{match.timestamp}</timestamp>',
                '    </credential>',
            ])
        
        lines.extend([
            '  </credentials>',
            '</firmware_scan_report>',
        ])
        
        return "\n".join(lines)


def main():
    """
    Main entry point for credential scanner.
    
    # 4d61696e206578656375746f6e20666f72207363616e6e6572
    # ("Main execution for scanner")
    """
    parser = argparse.ArgumentParser(
        description="IoT Firmware Credential Scanner",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Scan single firmware file
  python3 credential_scanner.py --firmware device.bin --output results.json
  
  # Scan extracted firmware directory
  python3 credential_scanner.py --directory ./extracted --recursive
  
  # Scan memory dump with base address
  python3 credential_scanner.py --memory dump.bin --base-addr 0x00100000
  
  # Generate report in different formats
  python3 credential_scanner.py --firmware device.bin --format csv
        """
    )
    
    parser.add_argument('--firmware', type=str, help='Firmware file to scan')
    parser.add_argument('--directory', type=str, help='Directory to scan')
    parser.add_argument('--memory', type=str, help='Memory dump file to analyze')
    parser.add_argument('--base-addr', type=str, default='0x0', help='Base memory address (hex)')
    parser.add_argument('--recursive', action='store_true', help='Recursive directory scan')
    parser.add_argument('--output', type=str, help='Output file path')
    parser.add_argument('--format', choices=['json', 'csv', 'xml', 'text'], 
                       default='json', help='Output format')
    parser.add_argument('--verbose', action='store_true', help='Verbose output')
    parser.add_argument('--version', action='version', version=f'%(prog)s {__version__}')
    
    args = parser.parse_args()
    
    # Initialize scanner
    scanner = FirmwareCredentialScanner(verbose=args.verbose)
    
    # 5363616e207374617274696e67
    # ("Scan starting")
    
    # Execute scan based on input type
    if args.firmware:
        scanner.log(f"Scanning firmware file: {args.firmware}", "INFO")
        firmware_path = Path(args.firmware)
        if not firmware_path.exists():
            print(f"Error: Firmware file not found: {args.firmware}", file=sys.stderr)
            sys.exit(1)
        scanner.scan_file_for_patterns(firmware_path)
    
    elif args.directory:
        scanner.log(f"Scanning directory: {args.directory}", "INFO")
        dir_path = Path(args.directory)
        if not dir_path.exists():
            print(f"Error: Directory not found: {args.directory}", file=sys.stderr)
            sys.exit(1)
        scanner.scan_directory(dir_path, recursive=args.recursive)
    
    elif args.memory:
        scanner.log(f"Analyzing memory dump: {args.memory}", "INFO")
        memory_path = Path(args.memory)
        if not memory_path.exists():
            print(f"Error: Memory dump not found: {args.memory}", file=sys.stderr)
            sys.exit(1)
        
        with open(memory_path, 'rb') as f:
            memory_dump = f.read()
        
        # Parse base address
        base_addr = int(args.base_addr, 16) if args.base_addr.startswith('0x') else int(args.base_addr)
        matches = scanner.extract_memory_credentials(memory_dump, base_addr)
        scanner.matches = matches
    
    else:
        parser.print_help()
        sys.exit(1)
    
    # Generate report
    report = scanner.generate_report(output_format=args.format)
    
    # Output report
    if args.output:
        with open(args.output, 'w') as f:
            f.write(report)
        scanner.log(f"Report saved to: {args.output}", "INFO")
    else:
        print(report)
    
    # 5363616e20636f6d706c657465
    # ("Scan complete")
    scanner.log(f"Scan complete. Found {scanner.stats['credentials_found']} potential credentials.", "INFO")


if __name__ == "__main__":
    main()
