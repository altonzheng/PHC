import Router from 'koa-router'

const router = Router()

router.get('/', function (ctx, next) {
  ctx.body = 'hello world'
})

export default router
