import Head from 'next/head'
import Image from 'next/image'


export default function Home({host}) {
  return (
    <>
      <Head>
        <title>Mattflix - Home</title>
        <meta name="description" content="Matt's personal streaming platform for all his gorgeous content." />
      </Head>
      <p>Hello world</p>
    </>
  )
}

