import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@xdn/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@xdn/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'img.product-main-image',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        // callback: logPrefetchedContent,
      },
      {
        selector: '#mobile-product-images #product-thumbnails .lazyload-blur-wrapper>img',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchResponsiveImages,
      },
      {
        selector: '.indiv-product img',
        maxMatches: 2,
        attribute: 'src',
        as: 'image',
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/cdn\.shopify\.com\/.*/)

function deepFetchResponsiveImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const urlTemplate = $el.attr('data-src')
  // const dataWidths = $el.attr('data-widths')
  const width = "900"
  if (urlTemplate && width) {
    // const widths = JSON.parse(dataWidths)
    // for (let width of widths.slice(0, 2)) {
    //   const url = urlTemplate?.replace(/\{width\}/, width)
    //   prefetch(url, 'image')
    // }

    const url = urlTemplate.replace(/\{width\}/,width)
    prefetch(url, 'image')
  }
}

function logPrefetchedContent({$el}) { // for testing
  console.log("content '"+$el.attr('src')+"' has been prefetched...")
}