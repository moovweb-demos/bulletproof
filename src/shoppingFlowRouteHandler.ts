import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@xdn/core/router/Router'
import transformResponse from './transform'

const handler: RouteHandler = async ({
  cache,
  removeUpstreamResponseHeader,
  updateResponseHeader,
  proxy,
}) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie')
  updateResponseHeader('location', /https:\/\/www.ashleyfurniture.com\//gi, '/') // convert absolute redirects to origin to relative so that the user isn't transferred to the origin.
  proxy('origin', { transformResponse })
}

export default handler
