// simple server logic for returning with a latency of 1 second

import { Server } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    routes() {
      this.namespace = 'api'
      this.timing = 1000

      this.get('/moves', () => {
        return { column: Math.floor(Math.random() * 7) }
      })
    }
  })

  return server
}
