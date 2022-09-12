import banners from '../styles/banners.module.css'
import rows from '../styles/rows.module.css'
import Head from 'next/head'
import Info from '../components/Info'
import FeatureRow from '../components/FeatureRow'
import ContentCard, { Placeholder } from '../components/ContentCard'
import prisma from '../lib/prisma';
import { makeSerializable, useResponsiveDescription, useScreenSize } from '../lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'

export default function Home(props) {
  let [rowLimit, setRowLimit] = useState(10);
  let [width] = useScreenSize();
  useEffect(()=>setRowLimit(Math.floor(width/150)))
  
  const featuredRow = props.titles[rowLimit * 2];
  const featuredTitle = props.titles[props.featuredTitle];
  let featureDesc = useResponsiveDescription(featuredTitle);
  return (
    <>
      <Head>
        <title>Home - Mattflix</title>
      </Head>

      <header className={banners.header} style={{ backgroundImage: `url(${featuredTitle.banner_url})` }}>
        <Info title={featuredTitle.title} description={featureDesc} cid={featuredTitle.slug} links />
      </header>

      <section className={rows.shelf}>
        {props.titles.slice(0, (rowLimit)).map((title) => {
          return <Link href={title.slug} key={title.id}><a><ContentCard src={title.poster_url} /></a></Link>
        })}
      </section>

      <section className={rows.shelf}>
        {props.titles.slice((rowLimit), (rowLimit * 2)).map((title) => {
          return <Link href={title.slug}><a><ContentCard src={title.poster_url} /></a></Link>
        })}
      </section>


      {featuredRow &&
        <section className={rows.largeFeature}>
          <ContentCard src={featuredRow.banner_url} />
          <Info title={featuredRow.title} description={(width < 800) ? featuredRow.short : featuredRow.summary} links cid={featuredRow.slug} />
        </section>}

      <section className={rows.shelf}>
        {props.titles.slice((rowLimit * 3), (rowLimit * 4)).map((title) => {
          return <Link href={title.slug}><a><ContentCard src={title.poster_url} /></a></Link>
        })}
      </section>
    </>
  )
}


export async function getServerSideProps() {
  try {
    const titles = await prisma.content.findMany({where: {public: true}});
    return {
      props: {
        titles: makeSerializable(titles),
        featuredTitle: Math.floor(Math.random() * (titles.length - 1))
      }
    }
  } catch (error) {
    return { props: { error: makeSerializable(error) } }
  }
}

