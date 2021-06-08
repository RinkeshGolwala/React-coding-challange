import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import ImageList from '../components/ImageList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Canvas</title>
        <meta name="description" content="Get access to unlimited high quality photos" />
        <meta name="keywords" content="Canvas, Photos, high quality photos, high quality, hd, hd photos, wallpapers, images"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <ImageList />

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Rinkesh Golwala | Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}
