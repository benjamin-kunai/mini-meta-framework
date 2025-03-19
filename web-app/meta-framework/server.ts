import * as fs from 'node:fs'
import * as path from 'node:path'
import { createServer } from "node:http";
import { fileURLToPath } from 'node:url'
import { createApp, createRouter, defineEventHandler, fromNodeMiddleware, toNodeListener } from "h3";

import { createServer as createViteServer, ViteDevServer } from 'vite'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function initializeDevServer() {
  const app = createApp()

  // TODO: Add appType: 'custom'
  // Create a vite server in middleware mode to leverage H3 as the dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  console.log('Creating Vite Dev Server in middleware mode...');


  app.use(fromNodeMiddleware(vite.middlewares));

//   app.use('*', defineEventHandler(() => {
//     console.log('Hello World')
//   }))

const httpServer = createServer(toNodeListener(app));
httpServer.listen(5173);

console.log('Server is running on port 5173')
}

initializeDevServer()