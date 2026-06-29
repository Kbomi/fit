import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const textFiles = [
  "index.html",
  "src/main.js",
  "src/content.js",
  "README.md",
  "docs/README.md",
  "service-plan.md",
  "docs/service-plan.md",
];

const oldBrand = `체질${"노트"}`;
const oldStorageKey = `constitution${"-note"}`;

test("public-facing text uses the Chejilfit brand name", async () => {
  const files = await Promise.all(
    textFiles.map(async (file) => [file, await readFile(file, "utf8")]),
  );

  for (const [file, contents] of files) {
    assert.ok(!contents.includes(oldBrand), `${file} still mentions the old Korean brand`);
    assert.ok(!contents.includes(oldStorageKey), `${file} still uses the old storage key`);
  }
});

test("site metadata uses the Chejilfit green theme color", async () => {
  const html = await readFile("index.html", "utf8");

  assert.match(html, /<meta name="theme-color" content="#294133">/);
});

test("header uses the Chejilfit warm background color", async () => {
  const styles = await readFile("styles.css", "utf8");

  assert.match(styles, /\.site-header\s*{[^}]*background: #f5f2e9;/s);
});

test("site metadata points at PNG brand assets", async () => {
  const html = await readFile("index.html", "utf8");

  assert.match(html, /<link rel="icon" href="assets\/brand\/favicon\.png" type="image\/png">/);
  assert.match(html, /<link rel="apple-touch-icon" href="assets\/brand\/logo\.png">/);
  assert.match(html, /<meta property="og:image" content="assets\/brand\/og\.png">/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  assert.match(html, /<meta name="twitter:image" content="assets\/brand\/og\.png">/);

  await Promise.all([
    access("assets/brand/favicon.png"),
    access("assets/brand/logo.png"),
    access("assets/brand/og.png"),
  ]);
});

test("header brand uses the PNG logo asset", async () => {
  const main = await readFile("src/main.js", "utf8");

  assert.match(
    main,
    /<img class="brand-logo" src="assets\/brand\/logo\.png" alt="체질핏" width="32" height="32">/,
  );
  assert.doesNotMatch(main, /<span>체질핏<\/span>/);
  assert.doesNotMatch(main, /<span class="brand-mark"><\/span>/);
});
