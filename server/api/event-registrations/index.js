import Router from 'koa-router'
import logger from '../../lib/logger'
import { connect } from '../../lib/salesforce'
import {
  getEventRegistration,
  getEventRegistrationByAccount,
  updateEventRegistration,
  createEventRegistration
} from '../../lib/salesforce/event-registration'

function handleError (ctx, error) {
  // TODO: Differentiate different types of errors, and return different codes accordingly.
  logger.error(`${error.message}`)
  ctx.throw(error.message, 503)
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
  .put('/:id', (ctx, next) => {
    return connect()
      .then(res => updateEventRegistration(res.connection, ctx.params.id, ctx.request.body.fields))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })
  .post('/', (ctx, next) => {
    return connect()
      .then(res => createEventRegistration(res.connection, ctx.request.body.fields))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })

export default router
