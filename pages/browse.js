import banners from '../styles/banners.module.css'
import rows from '../styles/rows.module.css'
import Head from 'next/head'
import Link from 'next/link'
import Info from '../components/Info'
import Errorbox from '../components/Errorbox'
import ContentCard from '../components/ContentCard'
import prisma from '../lib/prisma';
import { useEffect, useState } from 'react'
import { makeSerializable, useResponsiveDescription, useScreenSize } from '../lib/utils'

export default function Home(props) {
  if (!props.titles || props.error) return <Errorbox options={["reload"]} title={"Servor error"} message={Object.keys(props.error).length > 0 ?  JSON.stringify(props.error) : "There was a problem fetching Matt's awesome content from the server. (You're too hot to access this content)"}/>
  let [rowLimit, setRowLimit] = useState(10);
  let [width] = useScreenSize();
  useEffect(()=>setRowLimit(Math.ceil(width/150)+1))
  
  const featuredRow = props.titles[rowLimit * 2];
  const featuredTitle = props.titles[props.featuredTitle];
  let featureDesc = useResponsiveDescription(featuredTitle);
  return (
    <>
      <Head>
        <title>Home - Mattflix</title>
      </Head>

      <header className={banners.header} style={{ backgroundImage: `url(${featuredTitle.banner_url})` }}>
        <div className={banners.vignette} style={{backgroundImage: `url(https://${process.env.NEXT_PUBLIC_bunny_pull_zone}.b-cdn.net/${featuredTitle.bunny_id}/preview.webp)`}} />
        <Info title={featuredTitle.title} description={featureDesc} cid={featuredTitle.slug} links />
      </header>

      <section className={rows.shelf}>
        {props.titles.slice(0, (rowLimit)).map((title) => {
          return <Link href={title.slug} key={title.id}><a><ContentCard src={title.poster_url} /></a></Link>
        })}
      </section>

      <section className={rows.shelf}>
        {props.titles.slice((rowLimit), (rowLimit * 2)).map((title) => {
          return <Link href={title.slug} key={title.slug}><a><ContentCard src={title.poster_url} /></a></Link>
        })}
      </section>


      {featuredRow &&
        <section className={rows.largeFeature}>
          <ContentCard src={featuredRow.banner_url} />
          <Info title={featuredRow.title} description={(width < 800) ? featuredRow.short : featuredRow.summary} links cid={featuredRow.slug} />
        </section>}

      <section className={rows.shelf}>
        {props.titles.slice((rowLimit * 3), (rowLimit * 4)).map((title) => {
          return <Link href={title.slug} key={title.slug}><a><ContentCard src={title.poster_url} /></a></Link>
        })}
      </section>
    </>
  )
}


export async function getServerSideProps() {
  try {
    throw "preview mode"
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

