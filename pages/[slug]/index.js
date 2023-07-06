import prisma from "../../lib/prisma";
import ContentCard from "../../components/ContentCard";
import Errorbox from "../../components/Errorbox"
import infoStyles from "../../styles/info.module.css";
import rows from '../../styles/rows.module.css'
import { makeSerializable } from "../../lib/utils";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function DetailsPage({ title, related, error }) {
    const [animated, animate] = useState(false);
    const router = useRouter();
    let player = useRef(null);
    function playVid() {
        player.current.play()
        animate(true);
        window.scrollTo({ top: 0, behavior: "smooth" })
        setTimeout(() => {
            router.push(`${router.asPath}/watch`)
        }, 1500);
    }
    if (error) return (<Errorbox title={"content not found"} message={error} code={404} options={["reload"]} />)
    return (<>
        <Head>
            <title>{title.title} on Mattflix</title>
        </Head>
        <section style={{ backgroundImage: `url(${title.banner_url})`, backgroundSize: "cover", backgroundPosition: "center", }} >
            <div className={animated ? [rows.infoBanner, rows.zoom].join(' ') : rows.infoBanner}>
                <ContentCard src={title.poster_url} />
                <div className={infoStyles.textWrapper}>
                    <h1 className={infoStyles.title}>{title.title}</h1>
                    <p className={infoStyles.description}>{title.summary}</p>
                    <button onClick={playVid} className={infoStyles.watchLink}></button>
                </div>
                <video style={{ display: "none" }} ref={player} />
            </div>
        </section>

        <h1 className={rows.rowTitle}>Related</h1>
        {!!related.length ? <>
            <section className={rows.shelf}>
                {related.map((item) => {
                    return <Link href={item.slug} key={item.title}><a><ContentCard src={item.poster_url} /></a></Link>
                })}
            </section>
        </> : <p className={rows.rowTitle}>No other content like this, you found a unique gem!</p>}
    </>)
}



export async function getServerSideProps(context) {
    const slug = context.query.slug;
    const titleInfo = await prisma.content.findUnique({
        where: { slug: slug },
        select: {
            id: true,
            title: true,
            summary: true,
            created_at: true,
            banner_url: true,
            poster_url: true,
            tags: true
        }
    })
    if (!titleInfo) return { props: { error: "Couldn't find this content :(" } }
    const related = await prisma.content.findMany({
        where: {
            tags: {
                hasSome: titleInfo.tags,
            },
            id: { not: titleInfo.id },
            public: true
        },
    })
    return ({
        props: { title: makeSerializable(titleInfo), related: makeSerializable(related) }
    })
}
