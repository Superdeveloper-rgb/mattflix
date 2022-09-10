import Nav from "./Nav";
import { useRouter } from "next/router";

export default function PageLayout({ children }) {
    const router = useRouter();
    const padding = router.pathname === '/' ? undefined : '80px'
    const noNavRoutes = ['/[slug]/watch'];
    return (
        <>
            {noNavRoutes.includes(router.pathname)  ? <></> : <Nav />}
            <main style={{paddingTop: padding}}>{children}</main>
        </>
    )
}