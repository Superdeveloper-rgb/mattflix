import prisma from "../lib/prisma";
import rows from "../styles/rows.module.css";
import { useScreenSize } from "../lib/utils";
import { makeSerializable } from "../lib/utils";
import ContentCard from "../components/ContentCard";
export default function homePage({ titles }) {
    let [width] = useScreenSize();
    return (
        <>
            <header style={{ position: "absolute", color: "white", top: 0 }}>
                {width > 500 ? (
                    <video src="/welcome.mp4" muted autoPlay loop playsInline style={{ width: "100%" }}></video>
                ) : (
                    <img src="/welcome.jpg" style={{ width: "100%" }} />
                )}
            </header>
            <div style={{ marginLeft: "10%", position: "absolute", top: (width > 500 ? "20vw" : "20vh")}}>
                <h1 style={{ fontSize: (width > 500 ? "4vw" : "8vw"), margin: "10px 0 0 0" }}>This is</h1>
                <img src="/mattflix.png" style={{ width: (width > 500 ? "20vw" : "40vw") }}></img>
                <p style={{ margin: "0 0 10px 0", fontSize: (width > 500 ? "2vw" : "4vw") }}>Quality content, everything Matt.</p>
            </div>
            <article style={{ position: "relative", top: (width > 500 ? "40vw":"80vw"), height: "300vh", background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) 2.52%, rgba(0, 0, 0, 0.8) 3.78%, rgba(0, 0, 0, 0.8) 19.33%, rgba(0, 0, 0, 0.6) 39.08%, rgba(0, 0, 0, 0.8) 65.13%, rgba(0, 0, 0, 1))" }}>
                <section className={rows.shelf} style={{ padding: "10vw 0 0 5vw" }}>
                    {titles.map((title) => {
                        return <ContentCard src={"/content-placeholder.png"} key={title.slug} />
                    })}
                </section>
                <h1 style={{ fontSize: "4vw", marginTop: "100px", textAlign: "center" }}>All your favorites, all in one place.</h1>
                <p style={{ margin: "auto", width: "60%", textAlign: "center", maxWidth: "500px", fontSize: "15px" }}>Don't scramble around looking for my content, it's all here and ready for you when you want it (so all day every day).</p>
                <section style={{display: "flex", flexFlow: "row nowrap", justifyContent: "space-around", marginTop: "300px"}}>
                    <div style={{width: "100px", height: "100px", backgroundColor: "red"}}></div>
                    <div style={{width: "100px", height: "100px", backgroundColor: "red"}}></div>
                    <div style={{width: "100px", height: "100px", backgroundColor: "red"}}></div>
                </section>
            </article>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const titles = await prisma.content.findMany({
            where: { public: true },
            orderBy: {
                created_at: "desc"
            },
            take: 6
        });
        return {
            props: {
                titles: makeSerializable(titles)
            }
        }
    } catch (error) {
        return { props: { error: makeSerializable(error) } }
    }
}