import styles from "../styles/errorbox.module.css"

export default function Errorbox({title, message, code, options, action}) {
    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{code && `${code} - `}{title}</h1>
            <p className={styles.message}>{message}</p>
            {options?.includes("reload") && <a href="/" className={styles.reload}><i className="fas fa-redo"/>&nbsp; Try again </a>}
            {options?.includes("close") && <button className={styles.action} onClick={()=>action("close")}><i className="fas fa-times"/> Close</button>}
        </div>
    )
}