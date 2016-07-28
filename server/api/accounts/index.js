import Router from 'koa-router'
import login from '../login/login'
import fetchAccounts from './accounts'
import Q from 'q'

const router = Router()

router.get('/',
  // TODO: abstract logger away and share with other routes
  (ctx, next) => {
    var start = new Date
    return next()
      .then(_ => {
        var ms = new Date - start
        console.log('%s %s - %s ms', ctx.method, ctx.url, ms)
      })
  },

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
