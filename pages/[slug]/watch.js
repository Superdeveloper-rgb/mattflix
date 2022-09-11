import { useEffect, useRef, useState } from "react";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/utils";
import styles from "../../styles/videoPlayer.module.css";

export default function watch(props) {
    console.log(props)
    let [classes, setClasses] = useState(styles.video);
    useEffect(() => {
        // add "in" class on page load
        setClasses([styles.video, styles.in].join(' '));
    })
    return (<>
        <div className={styles.loader}></div>
        <div className={styles.iframeContainer}><iframe src={`https://iframe.mediadelivery.net/embed/59441/${props.bunny_id}?autoplay=true`} loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen="true"></iframe></div>
    </>)
}

export async function getServerSideProps(context) {
    const title = await prisma.content.findUnique({
        where: { slug: context.query.slug },
        select: {bunny_id: true}
    })
    return (
        { props: makeSerializable(title) }
    )
}