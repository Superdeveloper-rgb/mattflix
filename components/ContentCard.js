import styles from "../styles/rows.module.css"

export default function ContentCard(props) {
  return (
    <div className={styles.contentCard}>
      <img src={(props.default ? "/content-placeholder.png" : props.src)} loading="lazy" />
    </div>
  )
}