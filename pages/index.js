import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/header.module.css'
import rows from '../styles/rows.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mattflix - Home</title>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>placeholder description</p>
        <div className={styles.links}>
          <Link href="#"><a className={styles.watchLink} /></Link>
          <Link href="#"><a className={styles.infoLink} /></Link>
        </div>
      </header>

      <Placeholder />

    </>
  )
}

function Placeholder() {
  return (<>
    {
      [...Array(5)].map((e, i) => {
        let index = i;
        return (
          <section className={rows.shelf}>
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
        )
      })
    }
  </>)
}


function ContentCard(props) {
  return (
    <div className={rows.contentCard}>
      <img src={(props.default ? "/content-placeholder.png" : props.src)} />
    </div>
  )
}

