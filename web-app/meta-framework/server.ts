import * as fs from "node:fs";
import * as path from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import {
  createApp,
  createRouter,
  defineEventHandler,
  fromNodeMiddleware,
  toNodeListener,
  getRequestURL,
  setResponseStatus,
  setHeader,
} from "h3";

import { createServer as createViteServer, ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initializeDevServer() {
  const app = createApp();

  // TODO: Add appType: 'custom'
  // Create a vite server in middleware mode to leverage H3 as the dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  console.log("Creating Vite Dev Server in middleware mode...");

  app.use(fromNodeMiddleware(vite.middlewares));

  app.use(
    "*",
    defineEventHandler(async (event) => {
      const url = event.path;

      try {
        // Load index.html from the web-app root directory, not the meta-framework directory
        let template = fs.readFileSync(
          path.resolve(__dirname, "../index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);

        const { render } = await vite.ssrLoadModule("/src/entry-server.ts");

        const appHtml = await render(url);

        const html = template.replace("<!--ssr-outlet-->", appHtml);

        setResponseStatus(event, 200);
        setHeader(event, "Content-Type", "text/html");
        return html;
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        console.error(e);
        
        // Add error response to make debugging easier
        setResponseStatus(event, 500);
        setHeader(event, "Content-Type", "text/html");
        return `
          <html>
            <head><title>Server Error</title></head>
            <body>
              <h1>500 - Server Error</h1>
              <pre>${(e as Error).stack || (e as Error).message}</pre>
            </body>
          </html>
        `;
      }
    })
  );

  const httpServer = createServer(toNodeListener(app));
  httpServer.listen(5173);

  console.log("Server is running on port 5173");
}

initializeDevServer();
