import styles from '../styles/rows.module.css'

export default function LargeFeature({children}){
    return(<>
    <section className={styles.largeFeature}>
        {children}
    </section>
    </>)
}