import Router from 'koa-router'
import logger from '../../lib/logger'
import login from './login'
import { logApiUsage, getAccount, fetchAccounts, createOrUpdateAccount } from './accounts'
import { createEventRegistration } from './eventRegistrations'
import Q from 'q'

const router = Router()

// TODO: Reduce redundancy here by logging in on every request and logging the api usage, or alternatively,
//       log the api usage inside of the login function.

function handlePUTorPOST (ctx, next) {
  const fields = ctx.request.body.fields
  const id = ctx.params.id

  const events = fields.medicalServices.concat(fields.supportServices)

  return login()
    .then(res => {
      const connection = res.connection

      logApiUsage(connection)

      return createOrUpdateAccount(connection, id, fields)
        .then(res => createEventRegistration(connection, res.payload.account.id, events))
    })

    // TODO: Should we return something else more useful to the caller?
    .then(res => ctx.body = res)
    .catch(err => {
      logger.error(`${err.message}`)
      // TODO: Differentiate Salesforce errors from invalid user input errors.
      ctx.throw(err.message, 503)
    })
}

router
  .get('/', (ctx, next) => {
    return login()
      .then(res => logApiUsage(res.connection))
      .then(res => fetchAccounts(res.connection))
      .then(res => ctx.body = res)
      .catch(err => ctx.throw(err.message, 503))
  })
  .get('/:id', (ctx, next) => {
    return login()
      .then(res => logApiUsage(res.connection))
      .then(res => getAccount(res.connection, ctx.params.id))
      .then(res => ctx.body = res)
      .catch(err => ctx.throw(err.message, 503))
  })
  .post('/', handlePUTorPOST)
  .put('/:id', handlePUTorPOST)

export default router
