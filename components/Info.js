import Link from 'next/link'
import styles from '../styles/info.module.css'

export default function Info({ title, description, cid, links, responsive }) {
    links = generateLinks(links, cid)
    let desc;
    if(responsive){
        desc = <p className={[styles.description, styles.responsive].join(" ")}>{description}</p>
    }else{
        desc = <p className={styles.description}>{description}</p>
    }
    return (<>
        <div className={styles.textWrapper}>
            <h1 className={styles.title}>{title}</h1>
            {desc}
            {links}
        </div>
    </>)
}

function generateLinks(links, cid) {
    let linkElement;
    let watchlink = `${cid}/watch`;
    let infolink = `/${cid}`;
    if (!cid) return <></>;
    switch (links) {
        case "watch":
            linkElement = <Link href={watchlink}><a className={styles.watchLink} /></Link>
            break;
        case "info":
            linkElement = <Link href={infolink}><a className={styles.infoLink} /></Link>
            break;
        case true:
            linkElement = <div className={styles.links}>
                <Link href={watchlink}><a className={styles.watchLink} /></Link>
                <Link href={infolink}><a className={styles.infoLink} /></Link>
            </div>;
            break;
        default:
            linkElement = <></>
            break;
    }
    return linkElement;
}