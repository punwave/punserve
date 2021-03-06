import morgan from 'morgan'
import compression from 'compression'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import methodOverride from 'method-override'
import requestId from 'express-request-id'
import responseTime from 'response-time'
import { compose } from 'compose-middleware'
import expressWinston from 'express-winston'
import { accessLogger as winstonInstance } from '../../lib/logger'

export default app => {
  const logger = (app.config.env === 'production')
    ? () => expressWinston.logger({ winstonInstance, dynamicMeta: (req, res) => ({ requestId: req.id }) })
    : () => morgan('dev')

  const middlewares = [
    logger(),
    compression(),
    urlencoded({ extended: false }),
    json(),
    cookieParser(),
    cors(),
    helmet(),
    methodOverride(),
    requestId(),
    responseTime()
  ]

  return compose(middlewares)
}
