import { articles } from "./articles.js";

// Pending confirmation of the site's official zone; change only this constant.
export const SITE_TIME_ZONE = "America/New_York";

export function formatPublishDate(iso) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: SITE_TIME_ZONE }).format(new Date(iso));
}

export function renderIndex() {
  const items = articles.map((a) => `<li><a href="/articles/${a.slug}">${a.title}</a></li>`).join("");
  return `<h1>Articles</h1><ul>${items}</ul>`;
}

export function renderArticle(slug) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  return `<article><h1>${article.title}</h1><time datetime="${article.publishedAt}">${formatPublishDate(article.publishedAt)}</time><p>${article.body}</p></article>`;
}
