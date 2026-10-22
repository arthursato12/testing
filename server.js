import { createServer } from "node:http";
import { renderIndex, renderArticle } from "./render.js";

const PORT = 3000;

createServer((req, res) => {
  const match = req.url.match(/^\/articles\/([\w-]+)$/);
  const html = req.url === "/" ? renderIndex() : match ? renderArticle(match[1]) : null;
  res.writeHead(html ? 200 : 404, { "content-type": "text/html" });
  res.end(html ?? "<h1>Not found</h1>");
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
