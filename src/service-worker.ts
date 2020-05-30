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
      },
      {
        selector: '.slick-slider img',
        maxMatches: 2,
        attribute: 'data-src',
        as: 'image',
        callback: deepFetchPDPImages,
      },
      {
        selector: 'img.primary-image',
        maxMatches: 2,
        attribute: 'data-src',
        as: 'image',
        callback: deepFetchPLPImages,
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/ashleyfurniture\.scene7\.com\/.*/)  

function deepFetchPDPImages({ $el, el, $ }: DeepFetchCallbackParam) {

  const url = $el.attr('src')
  const zoomUrl = $el.attr('data-zoom-src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PDP url: "+url+"\n")
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PDP zoomUrl: "+zoomUrl+"\n")
  prefetch(url, 'image')
  prefetch(zoomUrl, 'image')
  
}

function deepFetchPLPImages({ $el, el, $ }: DeepFetchCallbackParam) {

  const url = $el.attr('src')  
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching plp: "+url+"\n")  
  prefetch(url, 'image')  

}

function logPrefetchedContent({$el}) { // for testing
  // console.log("[][]][][[][]][][][][][[]][[][][]")
  console.log("content '"+$el.attr('src')+"' has been prefetched...")
}