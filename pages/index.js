import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import GitHubIcon from "@material-ui/icons/GitHub";
import CodeIcon from "@material-ui/icons/Code";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

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
        <div className="icon-container">
          <ul className="social-links">
            <li>
              <a
                href="https://github.com/kjport3"
                target="_blank"
                className="icons"
              >
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/kenporterfield/"
                target="_blank"
                className="icons"
              >
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/kenny_yom/"
                target="_blank"
                className="icons"
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                href="https://codepen.io/kjport3/"
                target="_blank"
                className="icons"
              >
                <CodeIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.goodreads.com/user/show/28192247-kenny-porterfield"
                target="_blank"
                className="icons"
              >
                <ImportContactsIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.strava.com/athletes/4032470"
                target="_blank"
                className="icons"
              >
                <DirectionsRunIcon />
              </a>
            </li>
          </ul>
        </div>
        <p>
          Hello! My name is Kenny Porterfield and I am a web developer living in
          Atlanta, Georgia. I like to spend my time running, reading, learning,
          and growing as a developer. Fun facts about me: I have run an average
          of over 2,000 miles a year for the last 5 years. In 2014 I thru-hiked
          the 2,200 miles of the Appalachian Trail over 4 months. I read 70
          books last year. And I am currently a Senior Campaign Developer at
          Digital Additive.{" "}
        </p>
      </section>
      <section
        className={`${utilStyles.alignCenter} ${utilStyles.headingMd} ${utilStyles.padding1px}`}
      >
        <h2 className={utilStyles.headingLg}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, image }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>
                  <Image
                    priority
                    src={image}
                    className={utilStyles.borderCircle}
                    height={144}
                    width={144}
                    alt={title}
                  />
                </a>
              </Link>
              <br />
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
