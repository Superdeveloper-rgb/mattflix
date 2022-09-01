import rows from '../styles/rows.module.css'

export default function newPage(){
    return (<>
    {/* <section className={rows.banner}>
            <h1>New</h1>
    </section> */}
    <section className={rows.spotlightSlider}>
        <ContentCard default/>
        <ContentCard default/>
        <ContentCard default/>
    </section>
    <section className={rows.shelf}>
        <ContentCard default/>
        <ContentCard default/>
        <ContentCard default/>
        <ContentCard default/>
        <ContentCard default/>
        <ContentCard default/>
        <ContentCard default/>
    </section>
    <section className={rows.spotlight}>
        <ContentCard default/>
        <div className={rows.textWrapper}>
            <h1>Title</h1>
            <p>Placeholder description</p>
        </div>
    </section>
    <Placeholder/>
    
    </>)
}

function Placeholder(){
    return (<>
            {
          [...Array(5)].map((e, i) => {
            let index = i + 1;
            return (
              <section className={rows.shelf}>
                {
                  [...Array(10)].map((e, i) => {
                    if((i * index)% 2 === 0){
                      return <ContentCard default key={i} />
                    }else{
                      return <ContentCard src="/chamber.jpg" key={i}/>
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