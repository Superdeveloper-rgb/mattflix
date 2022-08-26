import Nav from "./Nav";

export default function PageLayout({ children }) {
    return (
        <>
            <Nav />
            <main style={{paddingTop: "80px"}}>{children}</main>
            {/* <Footer /> */}
        </>
    )
}