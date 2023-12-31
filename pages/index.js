import prisma from "../lib/prisma";
import rows from "../styles/rows.module.css";
import { useScreenSize } from "../lib/utils";
import { makeSerializable } from "../lib/utils";
import ContentCard from "../components/ContentCard";
import Errorbox from "../components/Errorbox";
import styles from "../styles/landing.module.css"
import { joinClasses } from "../lib/utils";
import Footer from "../components/Footer";
import Head from "next/head";

export default function HomePage({ titles, error }) {
    let [width] = useScreenSize();
    if (!titles || error) return <Errorbox options={["reload"]} title={"Servor error"} message={Object.keys(error).length > 0 ? JSON.stringify(error) : "There was a problem fetching our awesome content from the server. (You're too hot to access this content). Please try again in a few minutes."} />
    return (
        <>
            <Head>
                <title>Welcome to Mattflix</title>
            </Head>
            <header style={{ position: "fixed", color: "white", top: 0 }}>
                {width > 500 ? (
                    <video src="/welcome.mp4" muted autoPlay loop playsInline style={{ width: "100%" }}></video>
                ) : (
                    <img src="/welcome.jpg" style={{ width: "100%" }} alt="" />
                )}
            </header>
            <div style={{ marginLeft: "10%", position: "absolute", top: (width > 500 ? "20vw" : "40vw") }}>
                <h1 style={{ fontSize: (width > 500 ? "4vw" : "8vw"), margin: "10px 0 0 0" }}>This is</h1>
                <img src="/mattflix.png" style={{ width: (width > 500 ? "20vw" : "40vw") }}></img>
                <p style={{ margin: "0 0 10px 0", fontSize: (width > 500 ? "2vw" : "4vw") }}>Quality content, inspiring creators</p>
            </div>
            <article className={styles.container} style={{ position: "relative", top: (width > 500 ? "40vw" : "110vw"), height: "fit-content" }}>
                <section className={joinClasses(rows.shelf, rows.centered)} style={{ padding: "0 0 0 5vw", marginTop: "10vw" }}>
                    {titles.map((title) => {
                        return <ContentCard src={title.poster_url} key={title.title} />
                    })}
                </section>
                <section className={styles.container}>
                    <h1>All your favorites, all in one place.</h1>
                    <p>Don&apos;t scramble around looking for something good to watch, it&apos;s all here and ready for you all day every day.</p>
                </section>

                <section className={styles.threeColumnLayout}>
                    <div className={styles.threeColumn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="164.191" height="164.19" viewBox="0 0 164.191 164.19">
                            <path id="Exclusion_3" data-name="Exclusion 3" d="M81.6,163.19a82.209,82.209,0,0,1-16.444-1.658,81.142,81.142,0,0,1-29.177-12.278,81.837,81.837,0,0,1-29.563-35.9A81.2,81.2,0,0,1,1.658,98.04a82.392,82.392,0,0,1,0-32.889A81.141,81.141,0,0,1,13.935,35.975a81.838,81.838,0,0,1,35.9-29.563A81.2,81.2,0,0,1,65.151,1.658a82.389,82.389,0,0,1,32.889,0,81.139,81.139,0,0,1,29.176,12.277,81.837,81.837,0,0,1,29.563,35.9,81.2,81.2,0,0,1,4.754,15.316,82.4,82.4,0,0,1,0,32.889,81.142,81.142,0,0,1-12.278,29.176,81.837,81.837,0,0,1-35.9,29.562,81.187,81.187,0,0,1-15.316,4.754A82.209,82.209,0,0,1,81.6,163.19Zm-8.386-60.629H89.982a12.579,12.579,0,0,0,25.159,0h6.29a2.1,2.1,0,0,0,2.1-2.1V96.27a2.1,2.1,0,0,0-2.1-2.1h-2.1V80.009a6.326,6.326,0,0,0-1.848-4.442L104.4,62.477a6.33,6.33,0,0,0-4.442-1.848H94.175V54.34a6.3,6.3,0,0,0-6.29-6.289H54.341a6.3,6.3,0,0,0-6.29,6.289v6.289H40.713a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H76.355A1.049,1.049,0,0,1,77.4,65.871v2.1a1.05,1.05,0,0,1-1.048,1.048H44.906a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H72.161a1.049,1.049,0,0,1,1.048,1.048v2.1A1.05,1.05,0,0,1,72.161,77.4H40.713a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H67.968a1.049,1.049,0,0,1,1.048,1.048v2.1a1.05,1.05,0,0,1-1.048,1.048H48.051v16.773a12.579,12.579,0,0,0,25.158,0Zm29.352,6.289a6.29,6.29,0,1,1,6.29-6.289A6.3,6.3,0,0,1,102.561,108.85Zm-41.93,0a6.29,6.29,0,1,1,6.289-6.289A6.3,6.3,0,0,1,60.63,108.85Zm52.414-27.256H94.175V66.919h5.779l13.09,13.09v1.585Z" transform="translate(0.5 0.5)" fill="#fff" />
                        </svg>
                        <h1>Fast</h1>
                        <p>Served from a global CDN with speed rivaling that of light</p>
                    </div>
                    <div className={styles.threeColumn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="164.191" height="164.19" viewBox="0 0 164.191 164.19">
                            <path id="Exclusion_1" data-name="Exclusion 1" d="M81.6,163.19a82.209,82.209,0,0,1-16.444-1.658,81.142,81.142,0,0,1-29.177-12.278,81.837,81.837,0,0,1-29.563-35.9A81.2,81.2,0,0,1,1.658,98.04a82.392,82.392,0,0,1,0-32.889A81.141,81.141,0,0,1,13.935,35.975a81.838,81.838,0,0,1,35.9-29.563A81.2,81.2,0,0,1,65.151,1.658a82.389,82.389,0,0,1,32.889,0,81.139,81.139,0,0,1,29.176,12.277,81.837,81.837,0,0,1,29.563,35.9,81.2,81.2,0,0,1,4.754,15.316,82.4,82.4,0,0,1,0,32.889,81.142,81.142,0,0,1-12.278,29.176,81.837,81.837,0,0,1-35.9,29.562,81.187,81.187,0,0,1-15.316,4.754A82.209,82.209,0,0,1,81.6,163.19Zm-40.81-56.331a2.151,2.151,0,0,0-2.148,2.149v4.3a2.151,2.151,0,0,0,2.148,2.15h73.028a2.151,2.151,0,0,0,2.148-2.15v-4.3a2.15,2.15,0,0,0-2.148-2.148H81.738L90.456,82.9l-8.074-2.94-9.786,26.9Zm67.857-52.016h0a30.608,30.608,0,0,1,1.772,7.408c.755,6.558-.125,14.309-2.544,22.416l13.776,5.015a2.16,2.16,0,0,0,.742.131,2.134,2.134,0,0,0,2.155-2.033,40.191,40.191,0,0,0-15.9-32.938ZM95.072,48.589A13.182,13.182,0,0,0,89,50.255a26.42,26.42,0,0,0-6.207,4.689A45.3,45.3,0,0,0,76.928,62.2a62.1,62.1,0,0,0-5.048,9.366l32.015,11.656c2.335-7.927,3.055-15.753,2.026-22.035a20.908,20.908,0,0,0-2.707-7.761,10.042,10.042,0,0,0-5.043-4.3A9,9,0,0,0,95.072,48.589ZM84.46,46.721A40.119,40.119,0,0,0,53.13,61.782a2.041,2.041,0,0,0-.36,1.848,2.2,2.2,0,0,0,1.357,1.47l13.708,4.991C72.5,59.279,79.3,50.78,86.494,46.773c-.662-.034-1.346-.052-2.032-.052Z" transform="translate(0.5 0.5)" fill="#fff" />
                        </svg>
                        <h1>Easy</h1>
                        <p>All you need is an internet connection and a payment method</p>

                    </div>
                    <div className={styles.threeColumn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="163.191" height="163.19" viewBox="0 0 163.191 163.19">
                            <path id="Exclusion_2" data-name="Exclusion 2" d="M81.6,163.19a82.209,82.209,0,0,1-16.444-1.658,81.142,81.142,0,0,1-29.177-12.278,81.837,81.837,0,0,1-29.563-35.9A81.2,81.2,0,0,1,1.658,98.04a82.392,82.392,0,0,1,0-32.889A81.141,81.141,0,0,1,13.935,35.975a81.838,81.838,0,0,1,35.9-29.563A81.2,81.2,0,0,1,65.151,1.658a82.389,82.389,0,0,1,32.889,0,81.139,81.139,0,0,1,29.176,12.277,81.837,81.837,0,0,1,29.563,35.9,81.2,81.2,0,0,1,4.754,15.316,82.4,82.4,0,0,1,0,32.889,81.142,81.142,0,0,1-12.278,29.176,81.837,81.837,0,0,1-35.9,29.562,81.187,81.187,0,0,1-15.316,4.754A82.209,82.209,0,0,1,81.6,163.19Zm0-124.31a42.585,42.585,0,1,0,16.629,3.356A42.462,42.462,0,0,0,81.6,38.88Zm0,65.92A20.182,20.182,0,0,1,62.251,90.282a1.65,1.65,0,0,1,1.582-2.115H99.339a1.653,1.653,0,0,1,1.581,2.115A20.089,20.089,0,0,1,81.6,104.8ZM96.382,79.952a4.917,4.917,0,1,1,3.489-1.44A4.9,4.9,0,0,1,96.382,79.952Zm-29.572,0a4.917,4.917,0,1,1,3.489-1.44A4.9,4.9,0,0,1,66.809,79.952Z" fill="#fff" />
                        </svg>
                        <h1>Awesome</h1>
                        <p>100% of people whom we like are happy with Mattflix</p>
                    </div>
                </section>
                <section style={{ boxShadow: "20vw 0 400px 0 rgb(0, 0, 0) inset", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: 'url("/globe.webp")' }}>
                    <div className={styles.halfContainer}>
                        <h1 style={{ textAlign: "left", padding: "0 100px" }}>Not just content, but community.</h1>
                        <p style={{ textAlign: "left", lineHeight: "1.3em", padding: "0 100px" }}>
                            Everything on Mattflix is uploaded by independant creators looking to share their work with the world. We just deliver it to you.
                        </p>
                    </div>
                </section>
                <h1 id="pricing" style={{ textAlign: "center", margin: 0, display: "block", backgroundColor: "black" }}>Pricing</h1>
                <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                {/* <stripe-pricing-table pricing-table-id="prctbl_1NQabwGtJSzHl0iWp7aGgZ2B"
                    publishable-key="pk_test_51LpdQkGtJSzHl0iWCaofHTerj3kXP8ti8c2VzHwjZK0gLvdR0tCiVqGWBOcWQa82jF3xglZGMJi0Rc0YzfiRaMdQ00FZ8gjAMD">
                </stripe-pricing-table> */}
                <section className={styles.threeColumnLayout}>
                    <div className={styles.pricingBox}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="164.191" height="164.19" viewBox="0 0 164.191 164.19" style={{ width: "100px", height: "100px" }}>
                            <path id="Exclusion_3" data-name="Exclusion 3" d="M81.6,163.19a82.209,82.209,0,0,1-16.444-1.658,81.142,81.142,0,0,1-29.177-12.278,81.837,81.837,0,0,1-29.563-35.9A81.2,81.2,0,0,1,1.658,98.04a82.392,82.392,0,0,1,0-32.889A81.141,81.141,0,0,1,13.935,35.975a81.838,81.838,0,0,1,35.9-29.563A81.2,81.2,0,0,1,65.151,1.658a82.389,82.389,0,0,1,32.889,0,81.139,81.139,0,0,1,29.176,12.277,81.837,81.837,0,0,1,29.563,35.9,81.2,81.2,0,0,1,4.754,15.316,82.4,82.4,0,0,1,0,32.889,81.142,81.142,0,0,1-12.278,29.176,81.837,81.837,0,0,1-35.9,29.562,81.187,81.187,0,0,1-15.316,4.754A82.209,82.209,0,0,1,81.6,163.19Zm-8.386-60.629H89.982a12.579,12.579,0,0,0,25.159,0h6.29a2.1,2.1,0,0,0,2.1-2.1V96.27a2.1,2.1,0,0,0-2.1-2.1h-2.1V80.009a6.326,6.326,0,0,0-1.848-4.442L104.4,62.477a6.33,6.33,0,0,0-4.442-1.848H94.175V54.34a6.3,6.3,0,0,0-6.29-6.289H54.341a6.3,6.3,0,0,0-6.29,6.289v6.289H40.713a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H76.355A1.049,1.049,0,0,1,77.4,65.871v2.1a1.05,1.05,0,0,1-1.048,1.048H44.906a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H72.161a1.049,1.049,0,0,1,1.048,1.048v2.1A1.05,1.05,0,0,1,72.161,77.4H40.713a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H67.968a1.049,1.049,0,0,1,1.048,1.048v2.1a1.05,1.05,0,0,1-1.048,1.048H48.051v16.773a12.579,12.579,0,0,0,25.158,0Zm29.352,6.289a6.29,6.29,0,1,1,6.29-6.289A6.3,6.3,0,0,1,102.561,108.85Zm-41.93,0a6.29,6.29,0,1,1,6.289-6.289A6.3,6.3,0,0,1,60.63,108.85Zm52.414-27.256H94.175V66.919h5.779l13.09,13.09v1.585Z" transform="translate(0.5 0.5)" fill="#fff" />
                        </svg>
                        <h2>Basic</h2>
                        <h3>$1.50/mo</h3>
                        <ul>
                            <li>Support small creators</li>
                            <li>Stream unlimited content</li>
                            <li>No ads, ever.</li>
                        </ul>
                        <button>Subscribe</button>
                    </div>
                    <div className={styles.pricingBox}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="164.191" height="164.19" viewBox="0 0 164.191 164.19" style={{ width: "100px", height: "100px" }}>
                            <path id="Exclusion_3" data-name="Exclusion 3" d="M81.6,163.19a82.209,82.209,0,0,1-16.444-1.658,81.142,81.142,0,0,1-29.177-12.278,81.837,81.837,0,0,1-29.563-35.9A81.2,81.2,0,0,1,1.658,98.04a82.392,82.392,0,0,1,0-32.889A81.141,81.141,0,0,1,13.935,35.975a81.838,81.838,0,0,1,35.9-29.563A81.2,81.2,0,0,1,65.151,1.658a82.389,82.389,0,0,1,32.889,0,81.139,81.139,0,0,1,29.176,12.277,81.837,81.837,0,0,1,29.563,35.9,81.2,81.2,0,0,1,4.754,15.316,82.4,82.4,0,0,1,0,32.889,81.142,81.142,0,0,1-12.278,29.176,81.837,81.837,0,0,1-35.9,29.562,81.187,81.187,0,0,1-15.316,4.754A82.209,82.209,0,0,1,81.6,163.19Zm-8.386-60.629H89.982a12.579,12.579,0,0,0,25.159,0h6.29a2.1,2.1,0,0,0,2.1-2.1V96.27a2.1,2.1,0,0,0-2.1-2.1h-2.1V80.009a6.326,6.326,0,0,0-1.848-4.442L104.4,62.477a6.33,6.33,0,0,0-4.442-1.848H94.175V54.34a6.3,6.3,0,0,0-6.29-6.289H54.341a6.3,6.3,0,0,0-6.29,6.289v6.289H40.713a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H76.355A1.049,1.049,0,0,1,77.4,65.871v2.1a1.05,1.05,0,0,1-1.048,1.048H44.906a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H72.161a1.049,1.049,0,0,1,1.048,1.048v2.1A1.05,1.05,0,0,1,72.161,77.4H40.713a1.05,1.05,0,0,0-1.048,1.048v2.1a1.049,1.049,0,0,0,1.048,1.048H67.968a1.049,1.049,0,0,1,1.048,1.048v2.1a1.05,1.05,0,0,1-1.048,1.048H48.051v16.773a12.579,12.579,0,0,0,25.158,0Zm29.352,6.289a6.29,6.29,0,1,1,6.29-6.289A6.3,6.3,0,0,1,102.561,108.85Zm-41.93,0a6.29,6.29,0,1,1,6.289-6.289A6.3,6.3,0,0,1,60.63,108.85Zm52.414-27.256H94.175V66.919h5.779l13.09,13.09v1.585Z" transform="translate(0.5 0.5)" fill="#fff" />
                        </svg>
                        <h2>Pro</h2>
                        <h3 style={{ color: "var(--text)" }}>$2.50/mo</h3>
                        <ul>
                            <li>Everything in Basic plan</li>
                            <li>Personalized list</li>
                            <li>Favorite shows and movies</li>
                            <li>Continue watching feature</li>
                            <li>Show your love and support for creators by giving a bit extra</li>
                        </ul>
                        <button>Subscribe</button>
                    </div>
                </section>
                <Footer linksInactive></Footer>
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
            },
        }
    } catch (error) {
        if (error.clientVersion) error = {};
        return { props: { error: makeSerializable(error) } }
    }
}