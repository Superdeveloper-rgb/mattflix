import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/utils";
import styles from "../../styles/videoPlayer.module.css";
import Head from "next/head";

export default function Watch(props) {
    const router = useRouter()
    let [classes, setClasses] = useState(styles.video);
    useEffect(()=>setClasses([styles.video, styles.in].join(' ')), []) // add "in" class on page load
    // let [backBtnClass, setBackBtnClass] = useState(["fas fa-arrow-left", styles.backArrow].join(' '));
    // useEffect(() => {
    //     let hideTimeout;
    //     function showBackBtn(){
    //         if(hideTimeout) clearTimeout(hideTimeout);
    //         setBackBtnClass(["fas fa-arrow-left", styles.backArrow].join(' '))
    //         hideTimeout = setTimeout(hideBackBtn, 2000);
    //         setClasses([styles.video, styles.in].join(' '));
    //     }
    //     function hideBackBtn(){
    //         setBackBtnClass(["fas fa-arrow-left", styles.backArrow, styles.hidden].join(' '))
    //         setClasses([styles.video, styles.in, styles.nopointerevents].join(' '));
    //     }
    //     window.addEventListener("mouseout", hideBackBtn)
    //     window.addEventListener("mouseover", showBackBtn)
    //     window.addEventListener("mousemove", showBackBtn)
    //     window.addEventListener("click", showBackBtn)
    // })
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
    const title = await prisma.content.findUnique({
        where: { slug: context.query.slug },
        select: {bunny_id: true, title: true}
    })
    return (
        { props: makeSerializable(title) }
    )
}