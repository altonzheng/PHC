import Router from 'koa-router'
import logger from '../../lib/logger'
import { connect } from '../../lib/salesforce'
import { getAccount, getAllAccounts, createOrUpdateAccount, searchForAccountByName } from '../../lib/salesforce/account'
import { createEventRegistration } from '../../lib/salesforce/event-registration'

function handleError (ctx, error) {
  // TODO: Differentiate different types of errors, and return different codes accordingly.
  logger.error(`${error.message}`)
  ctx.throw(error.message, 503)
}

function handlePUTorPOST (ctx, next) {
  const fields = ctx.request.body.fields
  const id = ctx.params.id

  const events = fields.medicalServices.concat(fields.supportServices)

  return connect()
    .then(res => {
      const connection = res.connection

      return createOrUpdateAccount(connection, id, fields)
    })

    // TODO: Should we return something else more useful to the caller?
    .then(res => (ctx.body = res))
    .catch(error => handleError(ctx, error))
}

const router = Router()

router
  .get('/search', (ctx, next) => {
    return connect()
      .then(res => searchForAccountByName(res.connection, ctx.query.name))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })
  .get('/', (ctx, next) => {
    return connect()
      .then(res => getAllAccounts(res.connection))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })
  .get('/:id', (ctx, next) => {
    return connect()
      .then(res => getAccount(res.connection, ctx.params.id))
      .then(res => (ctx.body = res))
      .catch(error => handleError(ctx, error))
  })
  .post('/', handlePUTorPOST)
  .put('/:id', handlePUTorPOST)

export default router
