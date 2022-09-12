import prisma from "../../lib/prisma";
import ContentCard from "../../components/ContentCard";
import infoStyles from "../../styles/info.module.css";
import rows from '../../styles/rows.module.css'
import { makeSerializable } from "../../lib/utils";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function detailsPage(props) {
    const [animated, animate] = useState(false);
    const router = useRouter();
    let player = useRef(null);
    function playVid() {
        player.current.play()
        animate(true);
        setTimeout(() => {
            router.push(`${router.asPath}/watch`)
        }, 1500);
    }
    return (<>
        <section style={{backgroundImage: `url(${props.banner_url})`, backgroundSize: "cover", backgroundPosition: "center", }} >
            <div className={animated ? [rows.infoBanner, rows.zoom].join(' ') : rows.infoBanner}>
                <ContentCard src={props.poster_url} />
                <div className={infoStyles.textWrapper}>
                    <h1 className={infoStyles.title}>{props.title}</h1>
                    <p className={infoStyles.description}>{props.summary}</p>
                    <button onClick={playVid} className={infoStyles.watchLink}></button>
                </div>
                <video style={{ display: "none" }} ref={player} />
            </div>
        </section>

        <h1 className={rows.rowTitle}>Related</h1>
        <section className={rows.shelf}>
            <ContentCard default />
            <ContentCard default />
            <ContentCard default />
        </section>
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
            poster_url: true
        }
    })
    return ({
        props: makeSerializable(titleInfo)
    })
}
