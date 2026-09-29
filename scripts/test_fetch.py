"""
Test: can GitHub's servers see each casino's promotions?
Loads each page in a real headless browser, saves the visible text and a
screenshot into the test-output/ folder, and prints a short summary.
"""
import asyncio
import pathlib

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

                text = await page.inner_text("body")
                (OUT / f"{name}.txt").write_text(
                    f"URL: {url}\nFINAL URL: {page.url}\nHTTP STATUS: {status}\n\n{text}",
                    encoding="utf-8",
                )
                await page.screenshot(path=str(OUT / f"{name}.png"))

                hits = [h for h in BLOCK_HINTS if h in text.lower()]
                print(f"[{name}] status={status} chars={len(text)} final={page.url}")
                if hits:
                    print(f"    possible block/JS notice found: {hits}")
            except Exception as e:
                print(f"[{name}] FAILED: {e}")
                (OUT / f"{name}.txt").write_text(f"FAILED: {e}", encoding="utf-8")
            finally:
                await page.close()

        await browser.close()


asyncio.run(main())
