#!/usr/bin/env python3
"""Find and display remaining mojibake patterns."""
from pathlib import Path
import re

# Find all patterns: accented char followed by smart quote/dash
pattern = re.compile(r'[\u00c0-\u024f][\u2018\u2019\u201c\u201d\u20ac\u2013\u2014\u0153\u0141\u0142\u0106\u0107\u017d\u017e\u0118\u0119\u0104\u0105\u0110\u0111\u0160\u0161\u0152]')

matches = {}
for f in Path('src').rglob('*.jsx'):
    text = f.read_text(encoding='utf-8')
    for m in pattern.finditer(text):
        key = m.group(0)
        if key not in matches:
            matches[key] = []
        matches[key].append((str(f), m.start()))

for f in Path('src').rglob('*.js'):
    text = f.read_text(encoding='utf-8')
    for m in pattern.finditer(text):
        key = m.group(0)
        if key not in matches:
            matches[key] = []
        matches[key].append((str(f), m.start()))

print('Unique remaining mojibake patterns:')
for m, locs in sorted(matches.items()):
    chars = ' '.join(f'U+{ord(c):04X}' for c in m)
    print(f'  {repr(m)} ({chars}) - {len(locs)} occurrences')
    # Show first occurrence context
    fpath, pos = locs[0]
    text = Path(fpath).read_text(encoding='utf-8')
    start = max(0, pos - 20)
    end = min(len(text), pos + len(m) + 20)
    context = text[start:end].replace('\n', ' ')
    print(f'    Example: ...{context}...')
