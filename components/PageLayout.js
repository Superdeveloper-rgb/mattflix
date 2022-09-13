import Nav from "./Nav";
import { useRouter } from "next/router";

export default function PageLayout({ children }) {
    const router = useRouter();
    const paddingTop = router.pathname === "/new" ? '80px' : undefined;
    const noNavRoutes = ['/[slug]/watch'];
    return (
        <>
            {noNavRoutes.includes(router.pathname)  ? <></> : <Nav />}
            <main style={{paddingTop}}>{children}</main>
        </>
    )
}