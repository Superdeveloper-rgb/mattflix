import styles from "../styles/rows.module.css"
import ContentCard from "./ContentCard"
import Info from "./Info"

export default function FeatureRow({title, description}) {
    return (
        <section className={styles.feature}>
            <ContentCard default />
            <Info title={title} description={description} links responsive />
        </section>
    );
}