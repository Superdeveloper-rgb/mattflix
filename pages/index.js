import banners from '../styles/banners.module.css'
import rows from '../styles/rows.module.css'
import Head from 'next/head'
import Info from '../components/Info'
import FeatureRow from '../components/FeatureRow'
import ContentCard, { Placeholder } from '../components/ContentCard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Mattflix</title>
      </Head>

      <header className={banners.header}>
        <Info title="JoJo Siwa" description="Social media influencer" cid="hello" links/>
      </header>
      <Placeholder length={1}/>
      <FeatureRow title="title one" description="description one" />
      <section className={rows.largeFeature}>
        <ContentCard src="/chamber.jpg" />
        <Info title="The Titanic" description="a love story" links cid="Titanic"/>
      </section>
      <FeatureRow title="title two" description="description two"/>
      <Placeholder length={3}/>

    </>
  )
}




