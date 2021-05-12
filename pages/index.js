import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello! My name is Kenny Porterfield and I am a web developer living in
          Atlanta, Georgia. I like to spend my time running, reading, learning,
          and growing as a developer. Fun facts about me: I have run an average
          of over 2,000 miles a year for the last 5 years. In 2014 I thru-hiked
          the 2,200 miles of the Appalachian Trail over 4 months. I read 70
          books last year. And I am currently a Senior Campaign Developer at
          Digital Additive.{" "}
        </p>
        <p>
          <Link href="/posts/first-post">
            <a>First post!</a>
          </Link>
        </p>
        <p>
          (This is a sample website - I built this going through the{" "}
          <a href="https://nextjs.org/learn">Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
