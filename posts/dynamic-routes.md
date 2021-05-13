---
title: 'Dynamic Routes with Next.js'
date: '2021-05-12'
image: '/images/routing.jpg'
---

## Dynamic Routes 
Next.js allows you to statically generate pages with paths that depend on external data. This enables **dynamic URLs** in Next.js.

##### Statically Generating Pages with Dynamic Routes
For our website, we want to create dynamic routes for blog posts.
- We want each post to have the path `/posts/<id>` where `<id>` is the name of the markdown file under the top-level `posts` directory.

Pages that begin and end with `[ ]` are dynamic routes in Next.js. We'll create a page called `[id].js` where we'll write code that will render a post page. 

We’ll export an async function called [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) from this page. In this function, we need to return a list of possible values for `id`. We will also implement `getStaticProps` again to fetch necessary data for the blog post with the given `<id>`.  `getStaticProps` is given `params`, which contains `id` (because the file name is `[id].js`).

```js
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```