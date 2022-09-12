import { useRef, useState } from "react";
import supabase from "../lib/supabaseClient";
import Router, { useRouter } from "next/router";

export default function login() {
  const [email, setEmail] = useState("");
  const [submitted, submit] = useState(false);
  const router = useRouter();
  const loginbtn = useRef(null);
  if(supabase.auth.user()) router.push("/profile");

  async function login() {
    loginbtn.current.disabled = true;
    const { error, data } = await supabase.auth.signIn({email}, {redirectTo: "http://localhost:3000/profile"})
    if(error) {
       loginbtn.current.disabled = false;
    } else {
      submit(true);
    }
  }

  if (submitted) {
    return (<>
      <h1>Almost there!</h1>
      <p>Check your email to sign in</p>
    </>
    )
  }

  return(
    <div style={{position: "absolute", inset: "38%", display: "flex", flexFlow: "column", textAlign: "center"}}>
      <h1>Sign in to Mattflix</h1>
      <input
      onChange={e=>setEmail(e.target.value)}
      style={{margin: "10px"}}
      type="email"
      placeholder="email"/>
      <button onClick={login} ref={loginbtn}>let's go!</button>
    </div>
  )
}