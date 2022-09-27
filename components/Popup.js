import styles from "../styles/popups.module.css"
export default function Popup({open, title, body, actions, children}) {
    return(
        <section className={styles.overlay} style={{display: (open ? "block" : "none")}}>
            <div className={styles.wrapper}>
                <h1>{title}</h1>
                <p>{body}</p>
                {children}
                <span>
                    {actions &&
                        Object.keys(actions).map((action)=>{
                            return <button onClick={actions[action]} key={action} className={styles.action}>{action}</button>
                        })
                    }
                </span>
            </div>
        </section>
    )
}