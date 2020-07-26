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
        selector: 'img.product-featured-img',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPDPImages,
      },
      {
        selector: 'img.product-card__image',
        maxMatches: 4,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImages,
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/cdn\.shopify\.com\/.*/)

function deepFetchPLPImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const urlSmall = $el.attr('src')

  if (typeof urlSmall !== "undefined") {    
    const urlLarge = urlSmall.replace('50x50', '640x500')
    console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching urlSmall PLP: "+urlSmall+"\n")
    console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching urlLarge PLP: "+urlLarge+"\n")
    prefetch(urlSmall, 'image')
    prefetch(urlLarge, 'image') 
  }

}

function deepFetchPDPImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src').replace(' 900w', '');
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PDP: "+url+"\n");
  prefetch(url, 'image');
}

function logPrefetchedContent({$el}) { // for testing
  // console.log("[][]][][[][]][][][][][[]][[][][]")
  console.log("content '"+$el.attr('src')+"' has been prefetched...")
}