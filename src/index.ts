import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

let port = 3000
if (process.env.PORT) {
  port = Number(process.env.PORT)
}

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
