import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/header.module.css'
import rows from '../styles/rows.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mattflix - Home</title>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>placeholder description</p>
        <Link href="#"><a className={styles.watchLink}>Play &gt;</a></Link>
      </header>

      {
        [...Array(5)].map((e, i) => {
          return (
            <section className={rows.shelf}>
              {
                [...Array(10)].map((e, i) => {
                  return <ContentCard default key={i} />
                })
              }
            </section>
          )
        })
      }

    </>
  )
}


function ContentCard(props) {
  return (
    <div className={rows.contentCard}>
      <Image src={(props.default ? "/content-placeholder.png" : props.src)} width="1080" height="1920" />
    </div>
  )
}

