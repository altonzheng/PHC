import Router from 'koa-router'
import login from '../login/login'
import fetchAccounts from './accounts'
import Q from 'q'

const router = Router()

router.get('/',

  // TODO: abstract logger away and share with other routes
  (ctx, next) => {
    var start = new Date;
    return next()
      .then(_ => {
        var ms = new Date - start;
        console.log('%s %s - %s ms', ctx.method, ctx.url, ms);
      });
  },

  (ctx, next) => {
    let deferred = Q.defer();

    login()
      .then(res => {
        return fetchAccounts(res.connection)
      })
      .then(res => {
        ctx.body = res;
        deferred.resolve();
      })
      .fail(err => {
        ctx.body = res
        deferred.reject(err);
      });

    return deferred.promise;
  }

);

export default router
