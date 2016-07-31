import Router from 'koa-router'
import Q from 'q'
import verify from './verify'

const router = Router()

router.post('/',
  (ctx, next) => {
    let username, password

    try {
      username = ctx.request.body.username
      password = ctx.request.body.password
    } catch (error) {
      ctx.throw('bad user input', 400)
    }

    if (!verify(username, password)) {
      ctx.throw('unauthenticated', 401)
    }

    ctx.status = 200
  }
)

export default router
