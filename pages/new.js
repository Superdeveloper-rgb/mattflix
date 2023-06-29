import { useEffect, useState } from 'react';
import Head from 'next/head';
import Info from '../components/Info';
import FeatureRow from '../components/FeatureRow';
import ClickableCard from '../components/ClickableCard';
import ContentCard from '../components/ContentCard';
import Errorbox from '../components/Errorbox';
import prisma from '../lib/prisma';
import { useScreenSize } from '../lib/utils';
import { makeSerializable } from '../lib/utils';
import rows from '../styles/rows.module.css'
import supabase from '../lib/supabaseClient';

export default function newPage(props) {
  if (!props.titles) return <Errorbox options={["reload"]} title={"Servor error"} message={"There was a problem fetching Matt's awesome content from the server. (You're too hot to access this content)"}/>
  let [rowLimit, setRowLimit] = useState(10);
  let [width] = useScreenSize();
  useEffect(()=>setRowLimit(Math.floor(width/150)))
  let featureRow = props.titles[(rowLimit*2)+1]

  return (<>
    <Head>
      <title>New stuff - Mattflix</title>
    </Head>
    <section className={rows.largeFeature}>
      <ContentCard src={props.titles[0].banner_url} />
      <Info title={props.titles[0].title} description={props.titles[0].summary} cid={props.titles[0].slug} links />
    </section>
    <section className={rows.shelf}>
      {props.titles.slice(0, rowLimit).map(title=>{
        return <ClickableCard slug={title.slug} poster={title.poster_url} key={title.id}/>
      })}
    </section>
    <section className={rows.shelf}>
      {props.titles.slice(rowLimit, rowLimit*2).map(title=>{
        return <ClickableCard slug={title.slug} poster={title.poster_url} key={title.id}/>
      })}
    </section>
    {featureRow && <FeatureRow title={featureRow.title} description={featureRow.summary} cid={featureRow.slug} poster={featureRow.poster_url}/>}
  </>)
}

export async function getServerSideProps({req}) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
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