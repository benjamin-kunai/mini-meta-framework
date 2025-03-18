import fs from 'node:fs'
import path from 'node:path'
import { createServer } from "node:http";
import { fileURLToPath } from 'node:url'
import { createApp, createRouter, defineEventHandler, fromNodeMiddleware, toNodeListener } from "h3";

import { createServer as createViteServer } from 'vite'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function initializeDevServer() {
  const app = createApp()

  // TODO: Add appType: 'custom'
  // Create a vite server in middleware mode to leverage H3 as the dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    // appType: 'custom'
  })

  app.use(fromNodeMiddleware(vite.middlewares));

//   app.use('*', async (req, res) => {
//     // serve index.html - we will tackle this next
//   })



createServer(toNodeListener(app)).listen(3000);
console.log('Server is running on port 3000')

}
