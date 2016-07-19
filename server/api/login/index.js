import Router from 'koa-router'
import login from './login'

const router = Router()

router.get('/',

  (ctx, next) => {
    var start = new Date;
    return next().then(_ => {
      var ms = new Date - start;
      console.log('%s %s - %s ms', ctx.method, ctx.url, ms);
    });
  },

  (ctx, next) => {
    return login().then(result => {
      ctx.body = result.message
    });
  }

)

export default router
