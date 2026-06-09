import json
import os

files = [
    ("Homepage", "lh-report-home.json"),
    ("Solar Page", "lh-report-solar.json"),
    ("About Page", "lh-report-about.json"),
    ("Projects Page", "lh-report-projects.json")
]

for name, filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            data = json.load(f)
            
            audits = data.get('audits', {})
            lcp_element = audits.get('largest-contentful-paint-element', {})
            lcp_metrics = lcp_element.get('details', {}).get('items', [])
            
            print(f"\n{'='*50}\n{name} LCP Audit\n{'='*50}")
            if lcp_metrics:
                item = lcp_metrics[0]
                node = item.get('node', {})
                html = node.get('snippet', 'N/A')
                node_label = node.get('nodeLabel', 'N/A')
                
                # In Lighthouse, LCP items usually don't have explicit size in 'items', but we can check
                # Render delay, load delay etc. are sometimes under phase sub-metrics or trace data
                # Actually 'largest-contentful-paint-element' items typically just have node, etc.
                # Let's dump the keys of item to see what's available
                print(f"Element HTML: {html}")
                print(f"Node Label: {node_label}")
            else:
                print("No LCP element found in report.")
                
            # To get specific LCP phase times, we look at `lcp-breakdown` if it exists (in newer Lighthouse versions)
            lcp_breakdown = audits.get('lcp-breakdown', {})
            breakdown_items = lcp_breakdown.get('details', {}).get('items', [])
            if breakdown_items:
                b_item = breakdown_items[0]
                ttfb = b_item.get('ttfb', 'N/A')
                load_delay = b_item.get('loadDelay', 'N/A')
                load_time = b_item.get('loadTime', 'N/A')
                render_delay = b_item.get('renderDelay', 'N/A')
                
                print(f"\n--- LCP Breakdown (ms) ---")
                print(f"TTFB: {ttfb}")
                print(f"Resource Load Delay: {load_delay}")
                print(f"Resource Load Time: {load_time}")
                print(f"Element Render Delay: {render_delay}")

