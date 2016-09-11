import Router from 'koa-router'
import Q from 'q'
import verify from './verify'

const router = Router()

router
  .post('/', (ctx, next) => {
    let password

    try {
      password = ctx.request.body.password
    } catch (error) {
      ctx.throw('Bad input.', 400)
    }

    if (!verify(password)) {
      ctx.throw('Bad password.', 401)
    }

    ctx.status = 200
  })

export default router
