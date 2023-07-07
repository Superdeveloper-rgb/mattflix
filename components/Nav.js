import styles from "../styles/nav.module.css"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { joinClasses, useAuth, useScreenSize } from "../lib/utils";

export default function Nav() {
    const [user] = useAuth();
    const [scroll, setScroll] = useState(0);
    const [transparency, setTransparency] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const router = useRouter();

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
    let [width] = useScreenSize();


    return (
        <nav className={transparency ? styles.mainNav : joinClasses(styles.mainNav, styles.scrolled)}>
            <Link href="/browse"><a style={{cursor: "pointer", display: "flex", alignItems: "center", height: "100%"}}>
                {<Image src="/mattflix.png" className={styles.logo} width={126} height={40} style={{opacity: (router.pathname == "/" && transparency ) ? 0 : 1}}/>}
            </a></Link>
            <ol className={joinClasses(styles.linkContainer, (isOpen ? styles.open : ""))} onClick={()=>setOpen(prev => !prev)}>
                {user ? (<>

                <Navlink href="/browse" nextLink>Browse</Navlink>
                <Navlink href="/new" nextLink>New & Hot</Navlink>
                <Navlink href="/documentaries" nextLink>Documentaries</Navlink>
                <li><Link href="/profile"><a><img className={styles.userIcon} src={`https://avatars.dicebear.com/api/adventurer/${user.user_metadata.name || "luna"}.svg?r=50&translateY=7`} /></a></Link></li>

                </>) : (

                <li><Link href="/login"><a className={styles.login}>Login</a></Link></li>

                )}
            </ol>
            {width <= 500 && <button className={styles.dropdown} onClick={() => setOpen(prev => !prev)}>{isOpen ? "\u2715" : (router.asPath.replace(/\/|-(?:[0-9])+$/gm, "").replace(/[^a-zA-Z]/g, " ") || "home") + " \uf078"}</button>}
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

