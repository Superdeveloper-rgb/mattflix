import styles from "../styles/landing.module.css";
import Link from "next/link";

export default function Footer(props) {
  return (
    <footer
      style={{
        width: "100%",
        padding: "100px 100px 10px 100px",
        display: "flex",
        flexFlow: "row wrap",
        backgroundColor: "rgb(22, 22, 22)",
      }}
    >
      {/* <div style={{width: "10vw", position: "relative"}}>
        <img src="/mattflix.png" style={{ width: (width > 500 ? "10vw" : "40vw") }}></img>
    </div> */}
      <section
        className={styles.threeColumnLayout}
        style={{ margin: 0, padding: 0 }}
      >
        <div className={styles.threeColumn}>
          <h2>Browse</h2>
          <ul>
            <li>
              <Link href="/browse">
                <a>Browse</a>
              </Link>
            </li>
            <li>
              <Link href="/new">
                <a>New</a>
              </Link>
            </li>
            <li>
              <Link href="/documentaries">
                <a>Documentaries</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.threeColumn}>
          <h2>Account</h2>
          <ul>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.threeColumn}>
          <h2>Pricing</h2>
          <ul>
            <li>
              <Link href="/#pricing" scroll={false}>
                <a>Plans</a>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <h3 style={{ width: "100%", textAlign: "center", marginTop: "100px" }}>
        © Mattflix 2023
      </h3>
    </footer>
  );
}
