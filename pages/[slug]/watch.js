import { useEffect, useRef, useState } from "react";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/utils";
import styles from "../../styles/videoPlayer.module.css";

export default function watch(props) {
    let [classes, setClasses] = useState(styles.video);
    useEffect(() => {
        setClasses([styles.video, styles.in].join(' '));
    })

    return (<>
        <div className={styles.loader}></div>
        <video src={props.play_url} autoPlay playsInline controls className={classes} />
    </>)
}

export async function getServerSideProps(context) {
    const title = await prisma.content.findUnique({
        where: { slug: context.query.slug },
    })
    return (
        { props: makeSerializable(title) }
    )
}