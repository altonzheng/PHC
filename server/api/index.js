import hello from './hello'
import login from './login'
import accounts from './accounts'

export default (router) => {
  router.use('/hello', hello.routes(), hello.allowedMethods())
  router.use('/login', login.routes(), login.allowedMethods())
  router.use('/accounts', accounts.routes(), accounts.allowedMethods())
  return router
}
