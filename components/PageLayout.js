import Nav from "./Nav";
import supabase from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PageLayout({ children }) {
    const router = useRouter();    
    const paddingTop = ["/new", "/upload", "/"].includes(router.pathname) ? '80px' : undefined;
    const noNavRoutes = ['/[slug]/watch'];
    return (
        <>
            {noNavRoutes.includes(router.pathname) ? <></> : <Nav />}
            <main style={{ paddingTop }}>{children}</main>
        </>
    )
}