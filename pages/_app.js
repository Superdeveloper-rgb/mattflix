import '../styles/globals.css'
import Head from 'next/head'
import PageLayout from '../components/PageLayout'

function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <meta name="description" content="Matt's personal streaming platform for all his incredible content." />
      <meta property="og:image" content={"/OG_IMG.png"} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  </>)
}

export default MyApp
