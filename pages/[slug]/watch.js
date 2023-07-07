import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/utils";
import styles from "../../styles/videoPlayer.module.css";
import Head from "next/head";
import supabase from "../../lib/supabaseClient";

export default function Watch(props) {
    const router = useRouter()
    let [classes, setClasses] = useState(styles.video);
    useEffect(()=>setClasses([styles.video, styles.in].join(' ')), []) // add "in" class on page load
    return (<>
        <Head>
            <title>Watching {props.title} on Mattflix</title>
        </Head>
        <span className={styles.backArrow} onClick={()=>router.back()}><i className="fas fa-arrow-left"/>&nbsp;Back</span>
        <div className={styles.loader}></div>
        <div className={classes}><iframe src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_bunny_library_id}/${props.bunny_id}?autoplay=true`} loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}></iframe></div>
    </>)
}

export async function getServerSideProps(context) {
    const { user } = await supabase.auth.api.getUserByCookie(context.req);
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    const title = await prisma.content.findUnique({
        where: { slug: context.query.slug },
        select: {bunny_id: true, title: true}
    })
    return (
        { props: makeSerializable(title) }
    )
}