import styles from "../styles/rows.module.css"
import ContentCard from "./ContentCard"
import Info from "./Info"

export default function FeatureRow({title, description, cid, poster}) {
    return (
        <section className={styles.feature}>
            <ContentCard src={poster} />
            <Info title={title} description={description} cid={cid} links responsive />
        </section>
    );
}