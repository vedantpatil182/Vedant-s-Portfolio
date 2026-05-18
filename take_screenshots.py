#!/usr/bin/env python3
"""
Opens each website in Chrome, waits for load, then captures just the Chrome window.
"""
import subprocess
import time
import os

PUBLIC_DIR = "/Users/ankushpatil/Downloads/Project's/portfolio-main/public"

sites = [
    {
        "url": "https://quick-blog-vedant-patil.vercel.app/",
        "output": os.path.join(PUBLIC_DIR, "quickblog.png"),
        "name": "QuickBlog"
    },
    {
        "url": "https://green-cart-client-ten.vercel.app/",
        "output": os.path.join(PUBLIC_DIR, "greencart-ecommerce.png"),
        "name": "GreenCart"
    }
]

for site in sites:
    print(f"\n📸 Capturing {site['name']}...")

    # Open URL in Chrome at a fixed window size
    subprocess.Popen([
        "open", "-a", "Google Chrome", site["url"]
    ])
    time.sleep(6)  # wait for page to load

    # Bring Chrome to front
    subprocess.run([
        "osascript", "-e",
        'tell application "Google Chrome" to activate'
    ])
    time.sleep(1)

    # Resize Chrome window to 1280x800 via AppleScript
    subprocess.run([
        "osascript", "-e",
        '''tell application "Google Chrome"
            set bounds of front window to {0, 0, 1280, 820}
        end tell'''
    ])
    time.sleep(1)

    # Capture the Chrome window only
    subprocess.run([
        "screencapture", "-l",
        # get Chrome window ID via AppleScript
    ] if False else [
        "screencapture", "-x", "-R", "0,0,1280,800", site["output"]
    ])

    print(f"✅ Saved: {site['output']}")
    time.sleep(1)

print("\n🎉 Done! All screenshots saved.")
