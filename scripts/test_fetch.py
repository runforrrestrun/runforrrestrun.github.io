"""
Test: can GitHub's servers see each casino's promotions?
Loads each page in a real headless browser, saves the visible text and a
screenshot into the test-output/ folder, and prints a short summary.
"""
import asyncio
import pathlib
import re

from playwright.async_api import async_playwright

# Add all your casinos here: "short-name": "promo page URL"
URLS = {
    "ggbet": "https://gg.bet/promotions/all/bonuses",
    "bcgame": "https://bc.game/promotions/promotion",
    "betfury": "https://betfury.com/promo",
    "roobet": "https://roobet.com/promotions",
    "wazamba": "https://wazamba.com/ca/promotions/casino",
    "shuffle": "https://shuffle.com/promotions",
}

BLOCK_HINTS = [
    "just a moment",
    "verify you are human",
    "access denied",
    "attention required",
    "checking your browser",
    "enable javascript",
    "captcha",
]

OUT = pathlib.Path("test-output")
OUT.mkdir(exist_ok=True)

# Buttons to click so the page loads every promotion (optional, per casino).
# The value is the button text, written as a pattern; \d+ matches any number.
LOAD_MORE = {
    "roobet": r"Load More Promotions",
    "betfury": r"Show \d+ more",
}


async def click_load_more(page, pattern):
    """Click the 'load more' button until it disappears. Returns click count."""
    clicks = 0
    for _ in range(10):  # safety limit so it can never loop forever
        button = page.get_by_text(re.compile(pattern, re.I))
        if await button.count() == 0:
            break
        try:
            await button.first.click(timeout=5000)
        except Exception:
            break
        clicks += 1
        await page.wait_for_timeout(2500)
    return clicks


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            locale="en-US",
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
        )

        for name, url in URLS.items():
            page = await context.new_page()
            try:
                resp = await page.goto(url, wait_until="domcontentloaded", timeout=60000)
                status = resp.status if resp else "n/a"

                # Give the JavaScript time to load the promotion cards
                try:
                    await page.wait_for_load_state("networkidle", timeout=20000)
                except Exception:
                    pass
                await page.wait_for_timeout(5000)

                # Click "load more" buttons so all promotions are on the page
                clicks = 0
                if name in LOAD_MORE:
                    clicks = await click_load_more(page, LOAD_MORE[name])

                text = await page.inner_text("body")
                (OUT / f"{name}.txt").write_text(
                    f"URL: {url}\nFINAL URL: {page.url}\nHTTP STATUS: {status}\n\n{text}",
                    encoding="utf-8",
                )
                await page.screenshot(path=str(OUT / f"{name}.png"))

                hits = [h for h in BLOCK_HINTS if h in text.lower()]
                print(f"[{name}] status={status} chars={len(text)} clicks={clicks} final={page.url}")
                if hits:
                    print(f"    possible block/JS notice found: {hits}")
            except Exception as e:
                print(f"[{name}] FAILED: {e}")
                (OUT / f"{name}.txt").write_text(f"FAILED: {e}", encoding="utf-8")
            finally:
                await page.close()

        await browser.close()


asyncio.run(main())
