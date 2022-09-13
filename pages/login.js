import { useRef, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";
import styles from "../styles/login.module.css"

export default function login() {
  const [email, setEmail] = useState("");
  const [submitted, submit] = useState(false);
  const [error, setError] = useState(false)
  const router = useRouter();
  const loginbtn = useRef(null);
  if (supabase.auth.user()) router.push("/profile");

  async function login() {
    setError(false);
    if (!email) return setError("Please enter your email adress")
    if (!/[a-z0-9_\.]+@[a-z]+\.[a-z]{2,5}/.test(email)) return setError("Are you sure that's your email? It seems off...")
    loginbtn.current.disabled = true;
    loginbtn.current.children[0].className = "fas fa-circle-notch";
    const { error, data } = await supabase.auth.signIn({email}, {redirectTo: "/profile"})
    if(error) {
       loginbtn.current.disabled = false;
    } else {
      submit(true);
    }
  }

  return !submitted ?  (
    <section className={styles.container}>
      <div className={styles.textwrapper}>
        <h1>Sign in to Mattflix</h1>
        <p>Enter your email to get started with passwordless login!</p>
        <br />
        <br />
        <span className={error && styles.shake}>
          <input
            onChange={e => setEmail(e.target.value)}
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
        <p>A magic link has been sent to you, check your email to sign in</p>
      </div>
  </section>
  )
}