import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@xdn/core/router/Router'
import transformResponse from './transform'

const handler: RouteHandler = async ({
  cache,
  removeResponseHeader,
  updateResponseHeader,
  proxy,
}) => {
  cache(CACHE_PAGES)
  removeResponseHeader('set-cookie')
  await proxy('origin', {transformResponse})
  updateResponseHeader('location', /https:\/\/lxrco.com\//gi, '/') // convert absolute redirects to origin to relative so that the user isn't transferred to the origin.
}

export default handler
