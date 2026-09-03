#!/usr/bin/env python3
"""Check and fix ALL remaining mojibake in project files."""
from pathlib import Path

# Find ALL remaining non-ASCII issues
for f in Path('src').rglob('*.jsx'):
    text = f.read_text(encoding='utf-8')
    euro_lines = [i for i, line in enumerate(text.splitlines()) if '\u20ac' in line or '\u2014' in line and '\u2500' not in line]
    if euro_lines:
        with open(f'_check_{f.name}.txt', 'w', encoding='utf-8') as out:
            for ln in euro_lines:
                out.write(f'Line {ln+1}: {text.splitlines()[ln][:120]}\n')
        print(f'{f}: {len(euro_lines)} lines with euro/em-dash')
