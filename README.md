# FinTrack

A private, offline expense tracker with custom views of your spending.
Everything runs on your device. Expenses are stored in the browser's on-device
database, and every library (charts, Excel, PDF) and font is bundled, so the app
makes no network requests once it is loaded.

## Layout

- **Left pane:** tap the FinTrack name (top left) to open or hide it.
  It holds Overview, Ledger and Visualise, plus backup, restore, CSV import and currency.
- **Overview** (the landing page): spent, daily average, this month against your
  budget, transaction count, spending over time, where it went, and recent expenses.
- **Ledger:** add, edit and delete expenses. Tap any category, payee, account or
  tag to filter the whole app by it.
- **Visualise:** build charts by grouping and splitting on category, payee,
  account, tag or time. Save views and export any of them.

## Export

The **Export** button (top right) adapts to the page you're on:

| What | Formats |
|---|---|
| Expenses in the current period and filter | Excel (expenses + totals by category, payee, account, month), CSV, PDF report |
| The chart you're building | PNG image, PDF (chart + data table), Excel, CSV |
| All saved views | PDF (one page each), Excel (one sheet each) |
| A single saved view | Use **Export** on its card |

PDFs show amounts with the currency code (for example `INR 1,234.00`) because
standard PDF fonts have no rupee symbol.

## Put it on your phone (free, about 5 minutes)

1. Create a GitHub repository, for example `fintrack`.
2. **Add file > Upload files**, drag in everything from this folder, and commit.
3. **Settings > Pages**: Deploy from a branch, branch `main`, folder `/ (root)`, Save.
4. After a minute it's live at `https://<your-username>.github.io/fintrack/`.

Then:

- **Android (Chrome):** open the link, then menu > **Install app**
  (or **Install app** in the left pane).
- **iPhone (Safari):** open the link, **Share > Add to Home Screen**.
  Install before you enter data, since the home screen app keeps its own storage.

## Run on a laptop

```bash
cd fintrack-app
python3 -m http.server 8000
```

Open <http://localhost:8000>. Chrome and Edge can install it as a desktop app.

## Your data

- Stored only on this device. Nothing syncs.
- **Save backup** writes a `.json` file (on phones it opens the share sheet).
  **Restore from backup** merges it into any device, which is how you move phones.
- **Import CSV** needs `date` and `amount` columns; `description, category, payee,
  account, tags` are optional. FinTrack's own CSV export re-imports cleanly.
- If you used the earlier Spendline or FinTrack builds on the same site, your data and
  backups carry over.

## Renaming the app

Change `APP.name` and `APP.file` near the top of the script in `index.html`,
the `<title>` and `apple-mobile-web-app-title` tags, and `name` / `short_name`
in `manifest.webmanifest`. Leave `APP.db` as it is so existing data stays.

## Updating

Edit files, bump `VERSION` in `sw.js` (for example `fintrack-v2`), upload again.
Installed copies pick up the update the next time they open.

## Bundled libraries

Chart.js 4.4.1 (MIT), SheetJS Community 0.18.5 (Apache-2.0), jsPDF 2.5.2 (MIT),
jsPDF-AutoTable 3.8.4 (MIT), Instrument Sans and IBM Plex Mono (SIL OFL).
