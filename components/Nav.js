import styles from "../styles/nav.module.css"
import Link from "next/link";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { useAuth } from "../lib/utils";

export default function Nav() {
    const [user] = useAuth();
    const [scroll, setScroll] = useState(0);
    const [transparency, setTransparency] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => { window.removeEventListener("scroll", handleScroll) }
    });
    function handleScroll() {
        setScroll(window.scrollY);
    }
    useEffect(() => {
        (scroll > 0) ? setTransparency(false) : setTransparency(true);
    }, [scroll]);


    return (
        <nav className={transparency ? styles.mainNav : [styles.mainNav, styles.scrolled].join(" ")}>
            <a href="/"><img src="/mattflix.png" className={styles.logo} /></a>
            <ol className={styles.linkContainer}>
                <Navlink href="/" nextLink>Browse</Navlink>
                <Navlink href="/new" nextLink>New</Navlink>
                {user ? (<li><Link href="/profile"><a><img className={styles.userIcon} src={`https://avatars.dicebear.com/api/adventurer/${user.user_metadata.name || "me"}.svg?r=50&translateY=7`}/></a></Link></li>)
                : (<li><Link href="/login"><a className={styles.login}>Login</a></Link></li>)}
            </ol>
        </nav>
    )
}

function Navlink({ href, children, nextLink }) {
    const router = useRouter();
    const active = router.pathname === href ? styles.active : '';
    if (nextLink) {
        return <li><Link href={href}><a className={active}>{children}</a></Link></li>
    } else {
        return <li><a href={href} className={active}>{children}</a></li>
    }
}

