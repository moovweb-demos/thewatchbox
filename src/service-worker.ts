import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

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
        selector: '.product-thumbnails-wrapper img',
        maxMatches: 2,
        attribute: 'data-src',
        as: 'image',
        callback: deepFetchPDPImages,
      },
      {
        selector: '.panel-thumbnail img.tile-image',
        maxMatches: 2,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImages,
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/watchbox-cdn\.imgix\.net\/.*/)

///////////////////////////////////////////////
// Callback function for PDP image selector //
function deepFetchPDPImages({ $el, el, $ }: DeepFetchCallbackParam) {

  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PDP: "+url+"\n")
  prefetch(url, 'image')

}

///////////////////////////////////////////////
// Callback function for PLP image selector //
function deepFetchPLPImages({ $el, el, $ }: DeepFetchCallbackParam) {

  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP: "+url+"\n")
  prefetch(url, 'image')

}

// function logPrefetchedContent({$el}) { // for testing
//   // console.log("[][]][][[][]][][][][][[]][[][][]")
//   console.log("content '"+$el.attr('src')+"' has been prefetched...")
// }
