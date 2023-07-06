import styles from "../styles/rows.module.css"
import Image from "next/image"

export default function ContentCard(props) {
  return (
    <div className={styles.contentCard}>
      <Image src={(props.default ? "/content-placeholder.png" : props.src)} loading="lazy" />
    </div>
  )
}