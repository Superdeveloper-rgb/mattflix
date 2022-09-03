import rows from '../styles/rows.module.css'
import Head from 'next/head';
import ContentCard, { Placeholder } from '../components/ContentCard';
import Info from '../components/Info';
import FeatureRow from '../components/FeatureRow';

export default function newPage() {
  return (<>
    <Head>
      <title>New stuff - Mattflix</title>
    </Head>
    {/* <section className={rows.banner}>
            <h1>New</h1>
    </section> */}
    <section className={rows.largeFeature}>
      <ContentCard src="/chamber.jpg"/>
      <Info title="The Titanic" description="a love story" links/>
    </section>
    <section className={rows.thumbnailSlider}>

      <ContentCard default />
      <ContentCard default />
      <ContentCard default />
    </section>
    <section className={rows.shelf}>
      <ContentCard default />
      <ContentCard default />
      <ContentCard default />
      <ContentCard default />
      <ContentCard default />
      <ContentCard default />
      <ContentCard default />
    </section>
    <FeatureRow title="Gummy bear" description="Cloudy with a chance of meatballs"/>
    <Placeholder />

  </>)
}