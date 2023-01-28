import prisma from "../lib/prisma";
import rows from "../styles/rows.module.css";
import { useScreenSize } from "../lib/utils";
import { makeSerializable } from "../lib/utils";
import ContentCard from "../components/ContentCard";
import Errorbox from "../components/Errorbox";
export default function homePage({ titles, error }) {
    let [width] = useScreenSize();
    if (!titles || error) return <Errorbox options={["reload"]} title={"Servor error"} message={Object.keys(error).length > 0 ?  JSON.stringify(error) : "There was a problem fetching Matt's awesome content from the server. (You're too hot to access this content)"}/>
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
                <h1 style={{fontSize: (width > 500 ? "4vw" : "6vw"), marginTop: "100px", textAlign: "center" }}>All your favorites, all in one place.</h1>
                <p style={{ margin: "auto", width: "60%", textAlign: "center", maxWidth: "500px", fontSize: (width > 500 ? "2vw" : "4vw"), lineHeight: "1.3em" }}>Don't scramble around looking for my content, it's all here and ready for you when you want it (so all day every day).</p>
                <section style={{display: "grid", [(width > 500 ? "gridTemplateColumns" : "gridTemplateRows")]: "auto auto auto", marginTop: "200px", width: "100%", alignItems: "center", justifyItems: "center", padding: "0 50px", justifyContent: "center", gap: "50px"}}>
                    <div style={{width: "20vw", height: "200px", backgroundColor: "red", borderRadius: "20px"}}></div>
                    <div style={{width: "20vw", height: "200px", backgroundColor: "red", borderRadius: "20px"}}></div>
                    <div style={{width: "20vw", height: "200px", backgroundColor: "red", borderRadius: "20px"}}></div>
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
        if(error.clientVersion) error = {};
        return { props: { error: makeSerializable(error) } }
    }
}