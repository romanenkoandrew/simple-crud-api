import http from 'http'
import { routes } from './routes/index'

const PORT = process.env.PORT || 3000

const server = http.createServer(async (req, res) => {
    const method = req.method;
    const url = req.url;
  
    try {
      if (url && routes[url] && routes[url][method || '']) {
        const handler = routes[url][method || '']
  
        const data = await handler()
  
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data)
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Something went wrong... Please try again.' }));
    }
  });

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
});
``