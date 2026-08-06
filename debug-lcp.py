import json

with open("lh-report-home.json", 'r') as f:
    data = json.load(f)
    audits = data.get('audits', {})
    lcp_elem = audits.get('largest-contentful-paint-element', {})
    print("KEYS:", lcp_elem.keys())
    print("DETAILS:", json.dumps(lcp_elem.get('details', {}), indent=2))
