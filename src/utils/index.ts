import { randomUUID } from 'crypto'
import { IncomingMessage } from 'http'
import { Route } from '../routes/types'

export const generateUUID = () => {
    return randomUUID()
}

export const matchRoute = (method: string, url: string, routes: Route[]) => {
    for (const route of routes) {
      const routeParts = route.path.split('/').filter(Boolean)
      const urlParts = url.split('?')[0].split('/').filter(Boolean)
  
      if (routeParts.length !== urlParts.length || route.method !== method) continue
  
      const params: Record<string, string> = {}
      let matched = true
  
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          const paramName = routeParts[i].slice(1);
          params[paramName] = urlParts[i]
        } else if (routeParts[i] !== urlParts[i]) {
          matched = false
          break
        }
      }
  
      if (matched) return { handler: route.handler, params }
    }
  
    return { handler: null, params: {} }
  }

  export const parseRequestBody = <T = unknown>(req: IncomingMessage): Promise<T> => {
    return new Promise((resolve, reject) => {
      let body = '';
  
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          reject(new Error('Invalid JSON'));
        }
      });
    });
  }

  export const isValidUUID = (id: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
  }
    