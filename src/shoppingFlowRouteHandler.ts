import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@xdn/core/router/Router'
import transformResponse from './transform'

const handler: RouteHandler = async ({
  cache,
  removeUpstreamResponseHeader,
  updateResponseHeader,
  setResponseHeader,
  proxy,
}) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie')
  // convert absolute redirects to origin to relative so that the user isn't transferred to the origin.
  // NOTE: make sure this exactly matches the origin host in xdn.config.js!
  setResponseHeader('cache-control', 'public, max-age=86400') // change the cache headers to be cachable
  updateResponseHeader('location', /https:\/\/www.bulletproof.com\//gi, '/')
  updateResponseHeader('location', /https:\/\/shop.bulletproof.com\//gi, '/')  
  proxy('origin', { transformResponse })
}

export default handler
