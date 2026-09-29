name: Test promo fetch

on:
  workflow_dispatch:   # run manually from the Actions tab

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install Playwright
        run: |
          pip install playwright
          playwright install --with-deps chromium

      - name: Run test
        run: python scripts/test_fetch.py

      - name: Save results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-output
          path: test-output/
