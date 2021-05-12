import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
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
          (This is a sample website - I built this going through the{" "}
          <a href="https://nextjs.org/learn">Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
