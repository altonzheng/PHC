import Router from 'koa-router'
import login from './login'
import fetchAccounts from './accounts'
import Q from 'q'

const router = Router()

router.get('/',
  (ctx, next) => {
    return login()
      .then(res => {
        return fetchAccounts(res.connection)
      })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        ctx.throw(err.message, 503)
      })
  }
)

export default router
