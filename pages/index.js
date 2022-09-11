import banners from '../styles/banners.module.css'
import rows from '../styles/rows.module.css'
import Head from 'next/head'
import Info from '../components/Info'
import FeatureRow from '../components/FeatureRow'
import ContentCard, { Placeholder } from '../components/ContentCard'
import prisma from '../lib/prisma';
import { makeSerializable } from '../lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home(props) {
  // for responsive description - probably wanna make this a custom hook
  let [rowLimit, setRowLimit] = useState();
  let [featureDesc, setDesc] = useState();
  let [screenwidth, setScreenwidth] = useState();
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  })
  function handleResize() {
    setScreenwidth(window.innerWidth);
  }
  useEffect(() => {
    setDesc((screenwidth > 800) ? featuredTitle.summary : featuredTitle.short);
    setRowLimit(Math.floor(screenwidth / 150));
  }, [screenwidth])

  const featuredTitle = props.titles[props.featuredTitle];
  const featuredRow = props.titles[rowLimit * 2];
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
          return <Link href={title.slug}><a><ContentCard src={title.poster_url} /></a></Link>
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
          <Info title={featuredRow.title} description={(screenwidth < 800) ? featuredRow.short : featuredRow.summary} links cid={featuredRow.slug} />
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
    const titles = await prisma.content.findMany();
    const {_count} = await prisma.content.aggregate({ _count: true })
    return {
      props: {
        titles: makeSerializable(titles),
        featuredTitle: Math.floor(Math.random() * _count)
      }
    }
  } catch (error) {
    return { props: { error: makeSerializable(error) } }
  }
}

