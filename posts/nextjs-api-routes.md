---
title: 'Next.js API Routes'
date: '2021-05-13'
image: '/images/nextjs-white.png'
---

## Next.js API Routes
Next.js has support for [API Routes](https://nextjs.org/docs/api-routes/introduction), which let you easily create an API endpoint as a Node.js serverless function.

Any file inside the  `pages/api` folder is mapped to `/api/*` and will be treated as an API endpoint instead of a `page`. They are server-side only bundles and won't increase your client-side bundle size.

You can create an API endpoint by creating a function inside the `pages/api` directory in the following format:
```js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

Note that:

-   `req` is an instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), plus some pre-built middlewares you can see [here](https://nextjs.org/docs/api-routes/api-middlewares).
-   `res` is an instance of [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), plus some helper functions you can see [here](https://nextjs.org/docs/api-routes/response-helpers).