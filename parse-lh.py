import json
import os

files = [
    "lh-report-home.json",
    "lh-report-solar.json",
    "lh-report-about.json",
    "lh-report-projects.json"
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            data = json.load(f)
            categories = data.get('categories', {})
            perf = categories.get('performance', {}).get('score', 0) * 100
            acc = categories.get('accessibility', {}).get('score', 0) * 100
            bp = categories.get('best-practices', {}).get('score', 0) * 100
            seo = categories.get('seo', {}).get('score', 0) * 100
            
            audits = data.get('audits', {})
            lcp = audits.get('largest-contentful-paint', {}).get('displayValue', 'N/A')
            cls = audits.get('cumulative-layout-shift', {}).get('displayValue', 'N/A')
            tbt = audits.get('total-blocking-time', {}).get('displayValue', 'N/A')
            inp = audits.get('interactive', {}).get('displayValue', 'N/A') # Note: INP might be experimental, using Interactive as fallback if INP is not there
            
            print(f"--- {filepath} ---")
            print(f"Performance: {perf:.0f}")
            print(f"Accessibility: {acc:.0f}")
            print(f"Best Practices: {bp:.0f}")
            print(f"SEO: {seo:.0f}")
            print(f"LCP: {lcp}")
            print(f"CLS: {cls}")
            print(f"TBT: {tbt}")
            # print(f"TTI: {inp}")

