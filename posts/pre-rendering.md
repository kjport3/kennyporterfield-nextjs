---
title: 'Next.js Pre-rendering'
date: '2021-05-12'
---

### Pre-rendering
Next.js [*pre-renders*](https://nextjs.org/docs/basic-features/pages#pre-rendering). every page by default. This means Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. This can result in better performance and better search engine optimization (SEO). 

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

In Next.js, when you export a component, you can also export an asynchronous function called `getStaticProps`. `getStaticProps` runs at build time in production, and inside the function, you can fetch external data and send it as props to the page.

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