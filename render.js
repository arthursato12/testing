import { articles } from "./articles.js";

export function renderIndex() {
  const items = articles.map((a) => `<li><a href="/articles/${a.slug}">${a.title}</a></li>`).join("");
  return `<h1>Articles</h1><ul>${items}</ul>`;
}

export function renderArticle(slug) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  return `<article><h1>${article.title}</h1><p>${article.body}</p></article>`;
}
