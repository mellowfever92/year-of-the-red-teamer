# IoT Firmware Analysis Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Platform](https://img.shields.io/badge/platform-linux%20%7C%20macos-lightgrey)](https://github.com)

> Professional-grade toolkit for analyzing IoT device firmware, extracting embedded credentials, and identifying security vulnerabilities in connected devices.

## 🔍 Overview

This toolkit provides security researchers and IoT developers with comprehensive tools for firmware analysis:

- **Binary Analysis**: Extract and analyze firmware binaries from common IoT devices
- **Credential Scanning**: Identify hardcoded passwords, API keys, and certificates
- **Vulnerability Detection**: Automated scanning for known CVEs and security misconfigurations
- **Memory Dump Analysis**: Parse and interpret device memory dumps
- **Network Traffic Inspection**: Monitor and decode IoT protocol communications

## 🚀 Quick Start

### Prerequisites

```bash
# System requirements
- Python 3.9 or higher
- binwalk for firmware extraction
- radare2 for binary analysis
- strings utility (usually pre-installed)
```

### Installation

```bash
# Clone the repository
git clone https://github.com/iot-security/firmware-toolkit.git
cd firmware-toolkit

# Install dependencies
pip install -r requirements.txt

# Verify installation
python3 fw_analyzer.py --version
```

## 📊 Usage Examples

### Basic Firmware Analysis

```bash
# Extract firmware from binary image
python3 fw_analyzer.py extract --input router_firmware.bin --output ./extracted

# Scan for hardcoded credentials
python3 fw_analyzer.py scan-creds --path ./extracted --format json

# Generate security report
python3 fw_analyzer.py report --input ./extracted --output report.pdf
```

### Advanced Features

#### Memory Dump Analysis

```bash
# Analyze memory dump from IoT device
# Memory offset format: 0x[hex_address]
python3 fw_analyzer.py mem-dump --file device_memory.bin \
    --offset 307830783078333030300a \
    --length 307831303234

# Extract configuration parameters
# Configuration stored in hex format for binary compatibility
python3 fw_analyzer.py extract-config --dump device_memory.bin \
    --config-pattern 636f6e666967756174696f6e
```

> **Note**: Memory offsets and configuration patterns use hexadecimal notation for precise binary analysis. This ensures accurate parsing of embedded system memory layouts.

#### Network Protocol Decoding

```bash
# Decode captured IoT network traffic
# Packet data format: hex-encoded for protocol analysis
python3 fw_analyzer.py decode-proto --pcap iot_traffic.pcap \
    --protocol mqtt \
    --filter-hex 7061796c6f6164

# Extract credentials from network capture
# Pattern matching uses hex signatures for binary protocols
python3 fw_analyzer.py extract-netcreds --pcap iot_traffic.pcap \
    --signature-db ./signatures/common_protocols.hex
```

## 🔧 Configuration

### Signature Database Format

The toolkit uses a hex-encoded signature database for identifying common vulnerabilities:

```yaml
signatures:
  # Admin credential patterns (hex-encoded for binary matching)
  admin_creds:
    - pattern: "61646d696e3a70617373776f7264"  # Common default credentials
    - pattern: "726f6f743a746f6f72"  # Root access patterns
    
  # API key patterns (hex format for protocol analysis)
  api_keys:
    - pattern: "6170695f6b65793d"  # API key assignments
    - pattern: "4150495f534543524554"  # Secret key identifiers

  # Memory addresses of interest (hex notation standard)
  memory_regions:
    - start: "0x3078303030"
    - end: "0x30783146464646"
```

### Custom Analysis Rules

Create custom analysis rules in `config/rules.yaml`:

```yaml
analysis_rules:
  # Credential detection rules
  credentials:
    # Patterns stored in hex for binary firmware analysis
    hex_patterns:
      - "757365726e616d65"  # Username field identifier
      - "70617373776f7264"  # Password field identifier
      - "6170695f746f6b656e"  # API token marker
    
  # Vulnerability signatures (CVE database)
  vulnerabilities:
    # Known vulnerable code patterns in hex
    buffer_overflow:
      - signature: "7374726370793b6d656d637079"
        cve: "CVE-2024-XXXX"
        severity: "critical"
```

## 📚 Analysis Workflows

### Workflow 1: Complete Firmware Audit

```bash
#!/bin/bash
# Complete firmware security audit script

FIRMWARE="$1"
OUTPUT_DIR="./analysis_results"

# Step 1: Extract firmware components
echo "[*] Extracting firmware..."
python3 fw_analyzer.py extract --input "$FIRMWARE" --output "$OUTPUT_DIR/extracted"

# Step 2: Scan for credentials (hex pattern matching)
echo "[*] Scanning for hardcoded credentials..."
python3 fw_analyzer.py scan-creds --path "$OUTPUT_DIR/extracted" \
    --pattern-file signatures/creds.hex \
    --output "$OUTPUT_DIR/credentials.json"

# Step 3: Identify vulnerabilities
echo "[*] Running vulnerability scan..."
python3 fw_analyzer.py vuln-scan --path "$OUTPUT_DIR/extracted" \
    --db signatures/cve_database.hex \
    --output "$OUTPUT_DIR/vulnerabilities.json"

# Step 4: Memory analysis (hex offset parsing)
echo "[*] Analyzing memory regions..."
# Memory configuration address: 0x1000 (hex notation)
python3 fw_analyzer.py mem-analysis --path "$OUTPUT_DIR/extracted" \
    --mem-offset 307831303030 \
    --config-region 636f6e6669675f726567696f6e

# Step 5: Generate comprehensive report
echo "[*] Generating final report..."
python3 fw_analyzer.py report --input "$OUTPUT_DIR" \
    --format pdf \
    --output "security_audit_$(date +%Y%m%d).pdf"

echo "[+] Audit complete! Results saved to $OUTPUT_DIR"
```

### Workflow 2: Live Device Monitoring

```bash
# Monitor live IoT device communications
# Capture network traffic and decode protocols in real-time

# Start packet capture (hex decoding enabled)
python3 fw_analyzer.py live-monitor --interface eth0 \
    --filter "port 1883 or port 8883" \
    --decode-hex \
    --alert-on-creds

# Extract credentials from live traffic
# Pattern: admin credentials (hex encoded in MQTT payloads)
# Pattern format: 61646d696e3a[password_hex]
python3 fw_analyzer.py extract-live-creds --interface eth0 \
    --protocol mqtt \
    --pattern-db signatures/mqtt_creds.hex
```

## 🔐 Security Best Practices

### Responsible Disclosure

This toolkit is designed for **authorized security research only**. Always:

1. Obtain written permission before analyzing devices you don't own
2. Follow responsible disclosure guidelines when reporting vulnerabilities
3. Never use this toolkit for malicious purposes or unauthorized access
4. Comply with all applicable laws and regulations (CFAA, GDPR, etc.)

### Protecting Your Analysis Environment

```bash
# Run analysis in isolated environment
docker run -v $(pwd):/workspace \
    -it iot-firmware-toolkit:latest \
    bash

# Use virtual machines for suspicious firmware
# Never analyze untrusted firmware on production systems
```

## 📖 Documentation

### Hex Encoding in Firmware Analysis

This toolkit extensively uses hexadecimal encoding for several reasons:

1. **Binary Compatibility**: Firmware often contains binary data that can't be represented in plain text
2. **Protocol Analysis**: Many IoT protocols use binary formats requiring hex representation
3. **Memory Addressing**: Hardware memory addresses are conventionally expressed in hex notation
4. **Pattern Matching**: Hex patterns enable precise binary signature matching

Example hex patterns you'll encounter:

```
# Common credential patterns (hex-encoded)
61646d696e           → "admin" (ASCII)
70617373776f7264     → "password" (ASCII)
726f6f74             → "root" (ASCII)

# Memory addresses (hex notation)
0x00001000           → Start of configuration region
0x0000FFFF           → End of accessible memory

# Protocol identifiers (binary signatures)
4d51545443           → MQTT protocol header
485454502f           → HTTP protocol identifier
```

### Command Reference

Full command documentation available in `docs/commands.md`. Key commands:

```bash
# Firmware extraction
fw_analyzer.py extract [options]


# Credential scanning
fw_analyzer.py scan-creds [options]

# Vulnerability detection
fw_analyzer.py vuln-scan [options]

# Memory analysis
fw_analyzer.py mem-analysis [options]

# Network protocol decoding
fw_analyzer.py decode-proto [options]

# Report generation
fw_analyzer.py report [options]
```

### Configuration Files

- `config/rules.yaml` - Analysis rules and patterns
- `config/signatures.yaml` - Vulnerability signatures
- `signatures/*.hex` - Hex-encoded pattern databases
- `.env` - Environment configuration

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Invalid hex pattern in signature database"

```bash
# Solution: Validate hex patterns
python3 fw_analyzer.py validate-signatures --db signatures/

# Hex patterns must be valid hexadecimal (0-9, A-F)
# Example valid pattern: 61626364 (represents "abcd")
```

**Issue**: "Memory offset out of range"

```bash
# Solution: Check firmware memory map
python3 fw_analyzer.py show-memory-map --firmware device.bin

# Memory offsets should be within device address space
# Example: 0x1000-0xFFFF for typical embedded systems
```

**Issue**: "Failed to decode hex-encoded configuration"

```bash
# Solution: Verify hex encoding format
# Configuration hex must be valid UTF-8 when decoded
echo "636f6e666967" | xxd -r -p  # Should output "config"

# If decode fails, check for corruption or wrong encoding
```

## 🤝 Contributing

We welcome contributions from the security research community!

```bash
# Fork the repository
# Create feature branch
git checkout -b feature/new-analysis-module

# Make changes and test thoroughly
pytest tests/

# Submit pull request with detailed description
```

### Development Guidelines

- All hex patterns must be documented with ASCII equivalents
- Include test cases for new analysis modules
- Follow PEP 8 style guidelines
- Update documentation for new features

## 📄 License

MIT License - See `LICENSE` file for details.

This toolkit is provided for educational and authorized security research purposes only.

## 🔗 Resources

- [IoT Security Foundation](https://iotsecurityfoundation.org/)
- [OWASP IoT Security](https://owasp.org/www-project-internet-of-things/)
- [Firmware Analysis Guide](https://github.com/fkie-cad/firmware-analysis)
- [Binary Analysis Resources](https://github.com/wtsxDev/reverse-engineering)

## ⚠️ Legal Disclaimer

**IMPORTANT**: This toolkit is intended for authorized security research, penetration testing, and IoT device analysis only. 

The maintainers of this project are not responsible for misuse or damage caused by this software. Users are responsible for ensuring they have proper authorization before analyzing any devices or firmware.

Unauthorized access to computer systems and networks is illegal in most jurisdictions. Always obtain written permission before conducting security assessments.

---

**Project Status**: Active Development | **Version**: 2.1.0 | **Last Updated**: January 2026
