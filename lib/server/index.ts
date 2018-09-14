import * as process from 'process'
import * as http from 'http'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as jsonTmpl from 'json-templater/object'
import { each, get } from 'lodash'

/**
 * Declare app and add middlewares.
 */
const app = express()

app.use(logger('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Polite greeting.
 */
app.all('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send(greeting)
})

/**
 * Handle 404's.
 */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let err: any = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * Handle errors.
 */
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

/**
 * Set up server.
 */
let PORT = process.env.PORT || '8080'
app.set('port', PORT)

/**
 * Server factory, friendly to tests.
 */
export default () => {
  const server = http.createServer(app)
  server.listen(PORT)

  server.on('error', (error) => {
    throw error
  })

  server.on('listening', () => {
    const addr = server.address()
    const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`)
    log(`Listening on ${bind}`)
  })

  return server
}
