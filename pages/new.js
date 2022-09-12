import rows from '../styles/rows.module.css'
import Head from 'next/head';
import Info from '../components/Info';
import FeatureRow from '../components/FeatureRow';
import ContentCard, { Placeholder } from '../components/ContentCard';
import prisma from '../lib/prisma';
import { makeSerializable } from '../lib/utils';

export default function newPage(props) {
  return (<>
    <Head>
      <title>New stuff - Mattflix</title>
    </Head>
    <section className={rows.largeFeature}>
      <ContentCard src={props.titles[0].banner_url} />
      <Info title={props.titles[0].title} description={props.titles[0].summary} cid={props.titles[0].slug} links />
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
    <FeatureRow title="Gummy bear" description="Cloudy with a chance of meatballs" />
    <Placeholder />

  </>)
}

export async function getServerSideProps() {
  try {
    const titles = await prisma.content.findMany({
      where: {public: true},
      orderBy: {
        created_at: "desc"
      }
    });
    return {
      props: {
        titles: makeSerializable(titles)
      }
    }
  } catch (error) {
    return { props: { error: makeSerializable(error) } }
  }
}