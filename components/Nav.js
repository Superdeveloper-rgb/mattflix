import styles from "../styles/nav.module.css"
import Link from "next/link";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";

export default function Nav() {
    const [scroll, setScroll] = useState(0);
    const [transparency, setTransparency] = useState();

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return ()=>{window.removeEventListener("scroll", handleScroll)}
    });
    function handleScroll() {
        setScroll(window.scrollY);
    }
    useEffect(() => {
        let transparencyVar = scroll / 200;
        if (transparencyVar < 1) setTransparency(transparencyVar);
    }, [scroll]);


    return (
        <nav className={styles.mainNav} style={{
            backgroundColor: `rgba(22, 22, 22, ${transparency})`
        }}>
            <a href="/"><img src="/mattflix.png" className={styles.logo} /></a>
            <ol className={styles.linkContainer}>
                <Navlink href="/" nextLink>Browse</Navlink>
                <Navlink href="/new" nextLink>New</Navlink>
                <Navlink href="/originals" nextLink>Originals</Navlink>
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

