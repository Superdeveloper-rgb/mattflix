import styles from "../styles/popups.module.css"
import Popup from "./popup"

export default function Errorbox({title, message, code, options, action}) {
    return(
        <Popup open={true}>
                <h1 className={styles.title}>{code && `${code} - `}{title}</h1>
                <p className={styles.message}>{message}</p>
                {code == 403 && <a href="/" style={{textDecoration: "underline", color: "var(--link)"}}>Go back home!</a>}
                {options?.includes("reload") && <a href="/" className={styles.reload}><i className="fas fa-redo"/>&nbsp; Try again </a>}
                {options?.includes("close") && <button className={styles.primaryAction} onClick={()=>action("close")}><i className="fas fa-times"/> Close</button>}
        </Popup>
    )
}