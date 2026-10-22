import { test } from "node:test";
import assert from "node:assert/strict";
import { renderIndex, renderArticle } from "../render.js";

test("index lists every article", () => {
  assert.match(renderIndex(), /A First Look at the Season/);
  assert.match(renderIndex(), /The Year in Review/);
});

test("article page shows title and body", () => {
  const html = renderArticle("field-notes");
  assert.match(html, /Field Notes from the Conference/);
  assert.match(html, /What we heard on the floor/);
});

test("article page shows publish date in the site time zone", () => {
  assert.match(renderArticle("first-look"), /<time datetime="2026-10-01T14:30:00Z">October 1, 2026<\/time>/);
});

test("publish date uses the site zone when it differs from the UTC date", () => {
  // 2026-10-08T03:15:00Z is still October 7 in America/New_York.
  assert.match(renderArticle("field-notes"), /<time datetime="2026-10-08T03:15:00Z">October 7, 2026<\/time>/);
});

test("unknown article returns null", () => {
  assert.equal(renderArticle("missing"), null);
});
