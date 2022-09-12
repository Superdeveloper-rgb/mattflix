import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient"

export default function Profile({session}) {
    const [email, setEmail] = useState(null);
    useEffect(()=>{
      if(session) setEmail(session.user.email)
    }, [session])
    return <p>Hello {email}</p>
  }