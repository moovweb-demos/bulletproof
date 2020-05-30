import { Router } from '@xdn/core/router'
import { CACHE_ASSETS } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .match('/', shoppingFlowRouteHandler)
  .match('/c/*path', shoppingFlowRouteHandler)
  .match('/p/*path', shoppingFlowRouteHandler)
  .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('dist/service-worker.js'))
  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })
  .match('/content/*path', ({ proxy }) => {
    return proxy('origin', { path: ':path' })
  })
  .match('/*path', ({ proxy }) => {
    return proxy('origin')
  })
