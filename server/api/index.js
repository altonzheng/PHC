import login from './login'
import accounts from './accounts'

export default (router) => {
  router.use((ctx, next) => {
    const start = new Date()
    return next().then(_ => {
      const ms = new Date() - start
      console.log('%s %s - %s ms', ctx.method, ctx.url, ms)
    })
  })

  router.use('/login', login.routes(), login.allowedMethods())
  router.use('/accounts', accounts.routes(), accounts.allowedMethods())
  return router
}
