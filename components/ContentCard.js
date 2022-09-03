import styles from "../styles/rows.module.css"
import Info from "./Info";

export default function ContentCard(props) {
  return (
    <div className={styles.contentCard}>
      <img src={(props.default ? "/content-placeholder.png" : props.src)} />
    </div>
  )
}

export function Placeholder({length}) {
  length = parseInt(length) || 5
  return (<>
    {
      [...Array(length)].map((e, i) => {
        let index = i;
        return (
          <>
            <section className={styles.shelf}>
              {
                [...Array(10)].map((e, i) => {
                  if ((i % 2 == 0) ? !index : index) {
                    return <ContentCard default key={i} />
                  } else {
                    return <ContentCard src="/chamber.jpg" key={i} />
                  }
                })
              }
            </section>
          </>
        )
      })
    }
  </>)
}