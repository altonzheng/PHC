import login from './login'
import accounts from './accounts'

export default (router) => {
  router.use('/login', login.routes(), login.allowedMethods())
  router.use('/accounts', accounts.routes(), accounts.allowedMethods())
  return router
}
