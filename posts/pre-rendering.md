---
title: 'Next.js Pre-rendering'
date: '2021-05-11'
image: '/images/nextjs.jpg'
---

### Pre-rendering
Next.js [*pre-renders*](https://nextjs.org/docs/basic-features/pages#pre-rendering) every page by default. This means Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. This can result in better performance and better search engine optimization (SEO). 

Each generated HTML is associated with the minimal JS code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive, a process called *hydration*.

This means your app can be rendered without JavaScript. You can verify this by disabling the JavaScript in your browser and accessing the page. You should see that your app is rendered, because Next.js has pre-rendered the app into static HTML, allowing it to run without running JavaScript. 

By contrast, in a plain React.js app, there is no pre-rendering, so you won't be able to see the app if you disable JavaScript. 

So, out of the box Next.js pre-rendering improves our performance, SEO, and allows us to see our app without running JavaScript.

##### Static Generation vs Server-Side Rendering

Next.js has two forms of pre-rendering: *Static Generation* and *Server-Side Rendering*. Next.js lets your choose which pre-rendering form to use for each page, so you can create a hybrid Next.js app using Static Generation for most pages and Server-Side Rendering for others.

*[Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)* generates the HTML at build time, then the pre-rendered HTML is reused on each request. This form is recommended whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request. 

*[Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)* generates the HTML on each request. This can be useful because in some cases Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. This may be because your page shows frequently updated data, and the page content changes on every request. Server-Side Rendering will be slower, but the pre-rendered page will always be up-to-date.

Throughout this lesson, we'll focus on Static Generation. 

##### Static Generation with and without Data

For some pages, you might not be able to render the HTML without first fetching some external data. You may need to access the file system, fetch external API, or query your database at build time. Next.js supports this case — [Static Generation **with data**](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) — out of the box.

In Next.js, when you export a page component, you can also export an asynchronous function called `getStaticProps`. `getStaticProps` runs at build time in production, and inside the function, you can fetch external data and send it as props to the page. 

**Note:** You can’t export it from non-page files. One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

Essentially `getStaticProps` tells Next.js: "This page has some data dependencies, so when you pre-render this page at build time, make sure to resolve them first!"

You can fetch data from the file system (there are libraries that exist that make this easy), or an external API endpoint, or by querying a database directly.

*API Endpoint* Next.js polyfills [`fetch()`](https://nextjs.org/docs/basic-features/supported-browsers-features) on both the client and server. You don't need to import it.
```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```

*Database Query* [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) runs **only** on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.
```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

##### Development vs. Production

-   In **development** (`npm run dev`), [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) runs on _every request_.
-   In **production**, [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) runs at _build time_. 

Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

#### Fetching Data at Request Time

If you have a need to fetch data at request time instead of at build time, you can try [**Server-side Rendering**](https://nextjs.org/docs/basic-features/pages#server-side-rendering). To use Server-Side Rendering, you export `getServerSideProps` instead of `getStaticProps` from your page. Here's the starter code for `getServerSideProps`.

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

Because `getServerSideProps` is called at request time, its parameter (`context`) contains request specific parameters.

You should use `getServerSideProps` only if you need to pre-render a page whose data must be fetched at request time. Time to first byte ([TTFB](https://web.dev/time-to-first-byte/)) will be slower than [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) because the server must compute the result on every request, and the result cannot be cached by a [CDN](https://vercel.com/docs/edge-network/overview) without extra configuration.

### Client-side Rendering

If you do **not** need to pre-render the data, you can also use [**Client-side Rendering**](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side). This statically generates parts of the page that do not require external data. When the page loads, you can fetch external data from the client using JavaScript and populate the remaining parts.

A good use-case for this is user dashboard pages. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

##### SWR

The team behind Next.js has created a React hook for data fetching called [**SWR**](https://swr.vercel.app/). It's great for fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. Here’s an example usage:

```js
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

You can get in-depth information about [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) in the [Data Fetching documentation](https://nextjs.org/docs/basic-features/data-fetching).