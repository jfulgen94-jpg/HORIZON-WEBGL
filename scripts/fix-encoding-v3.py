#!/usr/bin/env python3
"""Comprehensive mojibake fix - handles all remaining patterns."""
from pathlib import Path
import re

def fix_all_mojibake(text):
    """Fix all known mojibake patterns."""
    # Phase 1: Fix double-encoded chars (CP1252 -> UTF-8)
    # These are 2-char sequences that should be single chars
    double_fixes = {
        '\u00e2\u201d': '\u2014',  # â" -> — (em-dash)  [most common: 8105 occurrences]
        '\u00e2\u20ac': '\u2013',  # â€ -> – (en-dash)
        '\u00e2\u0153': '\u201c',  # âœ -> " (left double quote)
        '\u00e2\u0152': '\u201c',  # â' -> " (left double quote variant)
        '\u00e2\u0161': '\u2192',  # âš -> → (right arrow)
        '\u00c3\u201c': '\u201c',  # Ã" -> " (left double quote)
        '\u00c3\u201d': '\u201d',  # Ã" -> " (right double quote)
        '\u00c3\u2018': '\u2018',  # Ã' -> ' (left single quote)
        '\u00c3\u2019': '\u2019',  # Ã' -> ' (right single quote)
        '\u00c3\u2014': '\u2014',  # Ã— -> — (em-dash)
        '\u00c3\u2013': '\u2013',  # Ã– -> – (en-dash)
        '\u00c3\u0161': '\u0161',  # Ãš -> š
        '\u00c3\u0160': '\u0160',  # Ã -> Š
        '\u00c3\u0152': '\u0152',  # Ã' -> Œ
        '\u00c3\u0153': '\u0153',  # âœ -> œ
        '\u00c3\u017d': '\u017d',  # Ã -> Ž
        '\u00c3\u017e': '\u017e',  # Ã -> ž
        '\u00c3\u0141': '\u0141',  # Ã -> Ł
        '\u00c3\u0142': '\u0142',  # Ã -> ł
        '\u00c3\u0106': '\u0106',  # Ã -> Ć
        '\u00c3\u0107': '\u0107',  # Ã -> ć
        '\u00c3\u0118': '\u0118',  # Ã -> Ę
        '\u00c3\u0119': '\u0119',  # Ã -> ę
        '\u00c3\u0104': '\u0104',  # Ã -> Ą
        '\u00c3\u0105': '\u0105',  # Ã -> ą
        '\u00c3\u0110': '\u0110',  # Ã -> Đ
        '\u00c3\u0111': '\u0111',  # Ã -> đ
    }
    
    for old, new in double_fixes.items():
        text = text.replace(old, new)
    
    # Phase 2: Fix single-char mojibake (accented chars that should be different)
    single_fixes = {
        '\u00c3\u00b3': '\u00f3',  # Ã³ -> ó
        '\u00c3\u00a1': '\u00e1',  # Ã¡ -> á
        '\u00c3\u00a9': '\u00e9',  # Ã© -> é
        '\u00c3\u00ad': '\u00ed',  # Ã­ -> í
        '\u00c3\u00ba': '\u00fa',  # Ãº -> ú
        '\u00c3\u00b1': '\u00f1',  # Ã± -> ñ
        '\u00c3\u00bc': '\u00fc',  # Ã¼ -> ü
        '\u00c3\u00a0': '\u00e0',  # Ã  -> à
        '\u00c3\u00a8': '\u00e8',  # Ã¨ -> è
        '\u00c3\u00b2': '\u00f2',  # Ã² -> ò
        '\u00c3\u0081': '\u00c1',  # Ã -> Á
        '\u00c3\u0089': '\u00c9',  # Ã‰ -> É
        '\u00c3\u0093': '\u00d3',  # Ã" -> Ó
        '\u00c3\u009a': '\u00da',  # Ãš -> Ú
        '\u00c3\u009c': '\u00dc',  # Ãœ -> Ü
        '\u00c3\u0091': '\u00d1',  # Ã‘ -> Ñ
        '\u00c3\u0080': '\u00c0',  # Ã€ -> À
        '\u00c3\u0088': '\u00c8',  # Ãˆ -> È
        '\u00c3\u0092': '\u00d2',  # Ã" -> Ò
        '\u00c2\u00ba': '\u00ba',  # Âº -> º
        '\u00c2\u00aa': '\u00aa',  # Âª -> ª
        '\u00c2\u00b0': '\u00b0',  # Â° -> °
        '\u00c2\u00b7': '\u00b7',  # Â· -> ·
    }
    
    for old, new in single_fixes.items():
        text = text.replace(old, new)
    
    return text

files_fixed = 0
for pattern in ['src/**/*.jsx', 'src/**/*.js']:
    for f in Path('.').glob(pattern):
        if 'node_modules' in str(f):
            continue
        try:
            orig = f.read_text(encoding='utf-8')
            fixed = fix_all_mojibake(orig)
            if fixed != orig:
                f.write_text(fixed, encoding='utf-8')
                files_fixed += 1
                print(f'FIXED: {f}')
        except Exception as e:
            print(f'ERROR: {f}: {e}')

print(f'\nTotal files fixed: {files_fixed}')
