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

test("every article page shows its author as 'By name, title' under the heading", () => {
  for (const a of articles) {
    assert.ok(
      renderArticle(a.slug).includes(`</h1><p class="author">By ${a.authorName}, ${a.authorTitle}</p>`)
    );
  }
});

test("unknown article returns null", () => {
  assert.equal(renderArticle("missing"), null);
});
