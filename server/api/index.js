import login from './login'
import accounts from './accounts'
import eventRegistrations from './event-registrations'
import services from './services'
import logger from '../lib/logger'

export default (router) => {
  router.use((ctx, next) => {
    const start = new Date()
    return next().then(_ => {
      const ms = new Date() - start
      logger.info(`${ctx.method} ${ctx.url} - ${ms} ms`)
    })
  })

  router.use('/login', login.routes(), login.allowedMethods())
  router.use('/accounts', accounts.routes(), accounts.allowedMethods())
  router.use('/event-registrations', eventRegistrations.routes(), eventRegistrations.allowedMethods())
  router.use('/services', services.routes(), services.allowedMethods())

  return router
}
