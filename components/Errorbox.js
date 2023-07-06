import styles from "../styles/popups.module.css"
import Popup from "./popup"
import Link from "next/link"

export default function Errorbox({title, message, code, options, action}) {
    return(
        <Popup open={true}>
                <h1 className={styles.title}>{code && `${code} - `}{title}</h1>
                <p className={styles.message}>{message}</p>
                {code == 403 && <Link href="/"><a style={{textDecoration: "underline", color: "var(--link)"}}>Go back home!</a></Link>}
                {options?.includes("reload") && <Link href="/"><a className={styles.reload}><i className="fas fa-redo"/>&nbsp; Try again </a></Link>}
                {options?.includes("close") && <button className={styles.primaryAction} onClick={()=>action("close")}><i className="fas fa-times"/> Close</button>}
        </Popup>
    )
}