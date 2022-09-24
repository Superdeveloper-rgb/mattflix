import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";
import styles from "../styles/auth.module.css"

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [submitted, submit] = useState(false);
  const [error, setError] = useState(false)
  const router = useRouter();
  const loginbtn = useRef(null);
  if (supabase.auth.user()) router.push("/profile");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_OUT') {
        router.push("/login")
      }
    })
    return () => {
      authListener.unsubscribe()
    }
  }, [])
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }
  async function login() {
    setError(false);
    if (!email) return setError("Please enter your email adress")
    if (!/[a-z0-9_\.]+@[a-z]+\.[a-z]{2,5}/.test(email)) return setError("Are you sure that's your email? It seems off...")
    loginbtn.current.disabled = true;
    loginbtn.current.children[0].className = "fas fa-circle-notch";
    const { error, data } = await supabase.auth.signIn({ email }, { redirectTo: "/profile" })
    if (error) {
      loginbtn.current.disabled = false;
      loginbtn.current.children[0].className = "fas fa-arrow-right";
    } else {
      submit(true);
    }
  }

  return !submitted ? (
    <section className={styles.container}>
      <div className={styles.textwrapper}>
        <h1>Sign in to Mattflix</h1>
        <p>Enter your email and we'll send you a one-time link to login or signup, no password needed!</p>
        <br />
        <br />
        <span className={error ? styles.shake : undefined}>
          <input
            onChange={e =>{setEmail(e.target.value); (error && setError(false))}}
            onKeyDown={(e)=>{if (e.key === "Enter")login()}}
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
        <p>A magic link has been sent to {email}, check your inbox to sign in</p>
        <a href="/login" style={{textDecoration: "underline"}}>I didn't receive a link</a>
      </div>
    </section>
  )
}