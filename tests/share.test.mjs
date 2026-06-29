import test from "node:test";
import assert from "node:assert/strict";

import {
  createResultShareUrl,
  decodeResultFromUrl,
} from "../src/share.js";

const sampleResult = {
  dominantType: "taeeum",
  percentages: {
    taeyang: 9,
    soyang: 18,
    taeeum: 55,
    soeum: 18,
  },
};

test("creates a share URL that restores the result", () => {
  const shareUrl = createResultShareUrl(
    "https://example.com/?utm_source=test#test",
    sampleResult,
  );

  assert.equal(shareUrl, "https://example.com/?result=taeeum.9.18.55.18#test");
  assert.deepEqual(decodeResultFromUrl(shareUrl), sampleResult);
});

test("replaces an existing result parameter when sharing again", () => {
  const shareUrl = createResultShareUrl(
    "https://example.com/?result=soeum.1.2.3.94&from=chat#test",
    sampleResult,
  );

  assert.equal(
    shareUrl,
    "https://example.com/?from=chat&result=taeeum.9.18.55.18#test",
  );
});

test("ignores malformed shared result data", () => {
  assert.equal(decodeResultFromUrl("https://example.com/?result=bad-data"), null);
  assert.equal(decodeResultFromUrl("https://example.com/?result=taeeum.1.2.3"), null);
  assert.equal(decodeResultFromUrl("https://example.com/?result=unknown.1.2.3.94"), null);
});
