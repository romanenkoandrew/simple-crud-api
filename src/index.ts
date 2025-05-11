import http, { IncomingMessage, ServerResponse } from 'http'
import { routes } from './routes/index'
import { matchRoute } from './utils/index'

const PORT = process.env.PORT || 3000

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url || !req.method) {
        res.statusCode = 400
        res.end('Bad Request')
        return
    }

    const { handler, params } = matchRoute(req.method, req.url, routes)

    if (!handler) {
        res.statusCode = 404
        res.end(JSON.stringify({ error: 'Route not found' }))
        return
      }
  
      try {
        await handler({ req, res, params })
      } catch (error) {
        console.error('Unhandled error:', error)
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Internal Server Error' }))
      }
  });

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})