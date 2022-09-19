import supabase from "../lib/supabaseClient";
import rows from "../styles/rows.module.css"
import infoStyles from "../styles/info.module.css"
import { useState } from "react";

export default function uploadPage({user}) {
    const [options, setOptions] = useState({
        title: "",
        summary: "",
        short: "",
        tags: [],
        public: true
    })

    return (<>
            <section style={{ backgroundImage: `url(${title.banner_url})`, backgroundSize: "cover", backgroundPosition: "center", }} >
            <div className={arows.infoBanner}>
                <ContentCard src={title.poster_url} />
                <div className={infoStyles.textWrapper}>
                    <h1 className={infoStyles.title}>{title.title}</h1>
                    <p className={infoStyles.description}>{title.summary}</p>
                    <button onClick={playVid} className={infoStyles.watchLink}></button>
                </div>
                <video style={{ display: "none" }} ref={player} />
            </div>
        </section>
    </>)
}

export async function getServerSideProps({req}) {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    console.log(req);

    if (!user) {
        return { props: {}, redirect: { destination: '/login' } }
    }

    return { props: { user } }
}