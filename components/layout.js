import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Kenny Porterfield";
export const siteTitle = "Kenny's Next.js Website";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/images/kp-logo-white-solid.png" />
        <meta
          name="description"
          content="Kenny Porterfield's website using Next.js and Vercel"
        />
        {/* <meta
          property="og:image"
          content="/images/kp-logo-white-solid.png"
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {home ? (
        <>
          <header className={styles.homeHeader}>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </header>
        </>
      ) : (
        <>
          <header className={styles.header}>
            <div>
              <h2 className={utilStyles.headingLgInline}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>Home</a>
                </Link>
              </h2>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.jpg"
                    className={utilStyles.navImage}
                    height={60}
                    width={60}
                    alt={name}
                  />
                </a>
              </Link>
            </div>
          </header>
        </>
      )}

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
