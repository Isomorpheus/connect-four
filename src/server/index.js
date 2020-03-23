// simple server logic for returning with a latency of 1 second
import { Server } from 'miragejs'
import { strategy } from './ServerStrategy'

export function makeServer() {
  const server = new Server({
    routes() {
      this.namespace = 'api'
      this.timing = 1000
      this.get('/moves', () => {
        return { column: Math.floor(Math.random() * 7) }
      })

      this.post('/moves', (schema, request) => {
        console.log('test', request.requestBody)
        return strategy(request.requestBody)
      })
    }
  })

  return server
}
