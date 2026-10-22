import { test } from "node:test";
import assert from "node:assert/strict";
import { renderIndex, renderArticle } from "../render.js";
import { articles } from "../articles.js";

test("index lists every article", () => {
  assert.match(renderIndex(), /A First Look at the Season/);
  assert.match(renderIndex(), /The Year in Review/);
});

test("article page shows title and body", () => {
  const html = renderArticle("field-notes");
  assert.match(html, /Field Notes from the Conference/);
  assert.match(html, /What we heard on the floor/);
});

test("every article page shows its author's name", () => {
  for (const a of articles) {
    assert.match(renderArticle(a.slug), new RegExp(a.authorName));
  }
});

test("unknown article returns null", () => {
  assert.equal(renderArticle("missing"), null);
});
