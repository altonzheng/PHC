import Router from 'koa-router'
import logger from '../../lib/logger'
import { connect } from '../../lib/salesforce'
import {
  getEventRegistration,
  getEventRegistrationByAccount,
  createEventRegistration,
} from '../../lib/salesforce/event-registration'

function handleError (ctx, error) {
  // TODO: Differentiate different types of errors, and return different codes accordingly.
  logger.error(`${error.message}`)
  ctx.throw(error.message, 503)
}

function handlePUTorPOST (ctx, next) {
  const fields = ctx.request.body.fields
  const id = ctx.params.id

  return connect()
    .then(res => {
      const connection = res.connection

      return createEventRegistration(connection, id, fields)
    })

    // TODO: Should we return something else more useful to the caller?
    .then(res => (ctx.body = res))
    .catch(error => handleError(ctx, error))
}

const router = Router()

router
  .get('/:id', (ctx, next) => {
    return connect()
      .then(res => getEventRegistration(res.connection, ctx.params.id))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })
  .get('/', (ctx, next) => {
    return connect()
      .then(res => getEventRegistrationByAccount(res.connection, ctx.query.accountId))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })
  .post('/', handlePUTorPOST)
  .put('/:id', handlePUTorPOST)

export default router
