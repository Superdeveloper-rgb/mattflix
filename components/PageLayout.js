import Nav from "./Nav";
import { useRouter } from "next/router";

export default function PageLayout({ children }) {
    const router = useRouter();
    const padding = router.pathname === '/' ? '' : '80px'
    return (
        <>
            <Nav />
            <main style={{paddingTop: padding}}>{children}</main>
            {/* <Footer /> */}
        </>
    )
}