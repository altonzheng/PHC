import Router from 'koa-router'
import logger from '../../lib/logger'
import { connect } from '../../lib/salesforce'
import { getAvailableServices } from '../../lib/salesforce/phc-event'

function handleError (ctx, error) {
  logger.error(`${error.message}`)
  ctx.throw(error.message, 503)
}

const router = Router()

router
  .get('/', (ctx, next) => {
    return connect()
      .then(res => getAvailableServices(res.connection))
      .then(res => ctx.body = res)
      .catch(error => handleError(ctx, error))
  })

export default router
