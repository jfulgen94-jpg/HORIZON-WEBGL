#!/usr/bin/env python3
"""Fix triple-encoded UTF-8 mojibake in all JSX/JS files."""
import re
from pathlib import Path

def fix_triple_encoding(text):
    """
    Fix triple-encoded mojibake.
    The pattern: original UTF-8 bytes -> CP1252 encoded -> UTF-8 encoded again
    Fix: UTF-8 text -> encode as CP1252 -> decode as UTF-8
    """
    try:
        fixed_bytes = text.encode('cp1252')
        return fixed_bytes.decode('utf-8')
    except (UnicodeEncodeError, UnicodeDecodeError):
        return text

def fix_mojibake_strings(text):
    """
    Direct string replacements for common mojibake patterns.
    """
    replacements = {
        '\u00e2\u20ac\u201d': '\u2014',  # â€" -> — (em-dash)
        '\u00e2\u20ac\u201c': '\u2013',  # â€" -> – (en-dash) - check
        '\u00e2\u20ac\u2018': '\u2018',  # â€' -> ' (left single quote)
        '\u00e2\u20ac\u2019': '\u2019',  # â€™ -> ' (right single quote)
        '\u00e2\u20ac\u0153': '\u201c',  # â€œ -> " (left double quote)
        '\u00e2\u20ac\u0093': '\u201d',  # â€" -> " (right double quote)
        '\u00c3\u00b3': '\u00f3',        # Ã³ -> ó
        '\u00c3\u00a1': '\u00e1',        # Ã¡ -> á
        '\u00c3\u00a9': '\u00e9',        # Ã© -> é
        '\u00c3\u00ad': '\u00ed',        # Ã­ -> í
        '\u00c3\u00ba': '\u00fa',        # Ãº -> ú
        '\u00c3\u00b1': '\u00f1',        # Ã± -> ñ
        '\u00c3\u00bc': '\u00fc',        # Ã¼ -> ü
        '\u00c3\u00a0': '\u00e0',        # Ã  -> à
        '\u00c3\u00a8': '\u00e8',        # Ã¨ -> è
        '\u00c3\u00b2': '\u00f2',        # Ã² -> ò
        '\u00c2\u00ba': '\u00ba',        # Âº -> º (masculine ordinal)
        '\u00c2\u00aa': '\u00aa',        # Âª -> ª (feminine ordinal)
        '\u00c2\u00b0': '\u00b0',        # Â° -> ° (degree)
        '\u00c3\u0081': '\u00c1',        # Ã -> Á
        '\u00c3\u0089': '\u00c9',        # Ã‰ -> É
        '\u00c3\u0093': '\u00d3',        # Ã" -> Ó
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

files_fixed = 0
total_issues = 0

for pattern in ['src/**/*.jsx', 'src/**/*.js']:
    for f in Path('.').glob(pattern):
        if 'node_modules' in str(f):
            continue
        try:
            orig = f.read_text(encoding='utf-8')
            # First try triple-encoding fix
            fixed = fix_triple_encoding(orig)
            # Then try string replacements for remaining issues
            fixed = fix_mojibake_strings(fixed)
            
            if fixed != orig:
                f.write_text(fixed, encoding='utf-8')
                files_fixed += 1
                print(f'FIXED: {f}')
        except Exception as e:
            print(f'ERROR: {f}: {e}')

print(f'\nTotal files fixed: {files_fixed}')
