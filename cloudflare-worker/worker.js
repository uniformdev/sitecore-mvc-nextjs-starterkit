import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

import { rewriteEsiResponse, createEsiContext, isEsiEnabledForRequest } from '@uniformdev/esi-edge-cloudflare';

const DEBUG = (_DEBUG === '1');
const SHOW_ERRORS = (_SHOW_ERRORS === '1');
const WAIT_FOR_RESPONSE = (_WAIT_FOR_RESPONSE === '1');

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (SHOW_ERRORS) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

const staticKVOptions = {
  cacheControl : {
    browserTTL: 7 * 60 * 60 * 24, // 7 days
    edgeTTL: 7 * 60 * 60 * 24, // 7 days
    bypassCache: false,
  }
};

const esiKVOptions = {
  cacheControl : {
    bypassCache: true,
  }
};

async function handleEvent(event) {
  try {
    // `event.request.url` can be used to determine response with ESI instead of `Content-Type`
    const esiEnabled = isEsiEnabledForRequest(event.request);
    const response = await getKVResponse(event, esiEnabled);

    // do not process content without ESI
    if (!esiEnabled) {
      return response;
    }

    //
    //START: Uniform code
    //
    const esiContext = createEsiContext(event.request, {debug: DEBUG});
    const rewritedResponse = rewriteEsiResponse(esiContext, response,{debug: DEBUG});
    //
    //END: Uniform code
    //

    if (WAIT_FOR_RESPONSE) {
      // read the stream to the end to catch errors
      const blob = await rewritedResponse.blob();
      return new Response(blob, rewritedResponse);
    }

    return rewritedResponse;

  } catch (e) {
    if (!SHOW_ERRORS) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) { }
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

async function getKVResponse(event, esiEnabled) {
  if (!esiEnabled) {
    return await getAssetFromKV(event, staticKVOptions);
  }

  // HTML with ESI must not be cached
  // cacheControl : {bypassCache: true} 
  // Otherwise page can return 304 response code
  return await getAssetFromKV(event, esiKVOptions);
}
