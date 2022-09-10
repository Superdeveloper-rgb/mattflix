import styles from "../styles/videoPlayer.module.css";
import ContentCard from "../components/ContentCard";
import rows from "../styles/rows.module.css"
import infoStyles from "../styles/info.module.css"
import { useRef } from "react";

export default function watch() {
    let player = useRef(null);
    function playVid() {
        player.current.src = "http://localhost:3000/sample.mp4"
        player.current.className = `${styles.video} ${styles.in}`;
        player.current.play();
    }
    return (
        <section className={rows.largeFeature}>
            <ContentCard src={"http://localhost:3000/sample-banner.png"} />
            <div className={infoStyles.textWrapper}>
                <h1 className={infoStyles.title}>{"Hello"}</h1>
                <p className={infoStyles.description}>{"World"}</p>
                <button onClick={playVid} className={infoStyles.watchLink}></button>
            </div>
            <video style={{ display: "none" }} ref={player} />
        </section>)
}