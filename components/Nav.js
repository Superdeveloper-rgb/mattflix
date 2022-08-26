import styles from "./nav.module.css"
import Link from "next/link";
import { useRouter } from "next/router"

export default function Nav() {

    return (
        <nav className={styles.mainNav}>
            <a href="/"><img src="/mattflix.png" className={styles.logo}/></a>
            <ol className={styles.linkContainer}>
                <Navlink href="/" nextLink>Browse</Navlink>
                <Navlink href="/new" nextLink>New</Navlink>
                <Navlink href="/originals">Originals</Navlink>
            </ol>
        </nav>
    )
}

function Navlink({href, children, nextLink}) {
    const router = useRouter();
    const style = {borderBottom: router.pathname === href ? '3px solid red' : ''}
    if(nextLink){
        return <li><Link href={href}><a style={style}>{children}</a></Link></li>
    }else{
        return <li><a href={href} style={style}>{children}</a></li>
    }
}