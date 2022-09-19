import styles from "../styles/errorbox.module.css"

export default function Errorbox({title, message, code}) {
    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{code && `${code} - `}{title}</h1>
            <p className={styles.message}>{message}</p>
            {code != 404 && <a href="/" className={styles.reload}><i className="fas fa-redo"/>&nbsp; Try again </a>}
        </div>
    )
}