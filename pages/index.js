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
  const featuredTitle = props.titles[0];
  let [featureDesc, setDesc] = useState();
  let [screenwidth, setScreenwidth] = useState();
  useEffect(()=>{
    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize", handleResize)
  })
  function handleResize() {
    setScreenwidth(window.innerWidth);
  }
  useEffect(()=>{
    setDesc((screenwidth > 800 ) ? featuredTitle.summary : featuredTitle.short);
  }, [screenwidth])
  return (
    <>
      <Head>
        <title>Home - Mattflix</title>
      </Head>

      <header className={banners.header} style={{backgroundImage: `url(${featuredTitle.banner_url})`}}>
        <Info title={featuredTitle.title} description={featureDesc} cid={featuredTitle.slug} links/>
      </header>

      <section className={rows.shelf}>
        {props.titles.map((title)=>{
          return <Link href={title.slug}><a><ContentCard src={title.poster_url}/></a></Link>
        })}
      </section>
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


export async function getServerSideProps(){
  try {
    const titles = await prisma.content.findMany();
    return {
      props: {
        titles: makeSerializable(titles)}
    }
  } catch (error) {
    return {props: {error: makeSerializable(error)}}
  }
}

