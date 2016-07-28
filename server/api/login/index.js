import Router from 'koa-router'
import login from './login'

const router = Router()

router.get('/',
  (ctx, next) => {
    return login()
      .then(result => {
        ctx.body = result.message
      })
      .catch(result => {
        ctx.throw(result.message, 503)
      })
  }

)

export default router
