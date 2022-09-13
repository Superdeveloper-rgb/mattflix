import styles from "../styles/errorbox.module.css"

export default function Errorbox({title, message}) {
    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.messate}>{message}</p>
            <a href="/" className={styles.reload}><i className="fas fa-redo"/>&nbsp; Try again </a>
        </div>
    )
}