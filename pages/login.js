import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";
import styles from "../styles/auth.module.css"
import Popup from "../components/Popup";
import Link from "next/link";
export default function LoginPage() {
  const [submitted, submit] = useState();
  const [error, setError] = useState(false);
  const [popup, setpopup] = useState()
  const router = useRouter();
  const loginbtn = useRef(null);
  const emailInput = useRef(null)
  if (supabase.auth.session()) router.replace("/profile");
  useEffect(() => {
    let url = new URL(window.location.href)
    if (url.hash && url.hash.split('&')[2]?.split('=')[0] === "error_description") {
      let error = url.hash?.split('&')[2]?.split('=')[1]?.replaceAll('+', ' ')
      if (error) setpopup(error);
    }
  }, [])

  async function login() {
    setError(false);
    let email = emailInput.current.value;
    if (!email) return setError("Please enter your email adress")
    if (!/[a-z0-9_\.]+@[a-z]+\.[a-z]{2,5}/.test(email)) return setError("Are you sure that's your email? It seems off...")
    loginbtn.current.disabled = true;
    loginbtn.current.children[0].className = "fas fa-circle-notch";
    const { error, data } = await supabase.auth.signIn({ email }, { redirectTo: "http://www.mattflix.pro/login" })
    if (error) {
      setError(error.message);
      loginbtn.current.disabled = false;
      loginbtn.current.children[0].className = "fas fa-arrow-right";
    } else {
      submit({ email });
    }
  }

  return !submitted ? (
    <section className={styles.container}>
      <div className={styles.textwrapper}>
        {popup && <Popup open={true} title={popup} actions={{ close: () => { setpopup(false); router.push("/login") } }} />}
        <h1>Sign in to Mattflix</h1>
        <p>Enter your email and we&apos;ll send you a one-time link to login or signup, no password needed!</p>
        <br />
        <br />
        <span className={error ? styles.shake : undefined}>
          <input
            ref={emailInput}
            onKeyDown={(e) => { if (e.key === "Enter") login() }}
            type="email"
            placeholder="email"
            className={styles.emailInput}
            required />
          <button
            onClick={login}
            ref={loginbtn}
            className={styles.loginbtn}>
            &nbsp;
            <i className="fas fa-arrow-right" />
            &nbsp;
          </button>
        </span>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  ) : (
    <section className={styles.container}>
      <div className={styles.textwrapper}>
        <h1>Almost there!</h1>
        <p>A magic link has been sent to {submitted.email}, check your inbox (and spam/junk folder) for an email from &quot;hello@mattflix.pro&quot;</p>
        <p  style={{ textDecoration: "underline", cursor: "pointer", color: "whitesmoke" }} onClick={()=>router.reload()}>I didn&apos;t receive a link</p>
      </div>
    </section>
  )
}