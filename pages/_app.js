import '../styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import supabase from '../lib/supabaseClient'
import PageLayout from '../components/PageLayout'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        handleAuthChange(event, session, "login")
        if (window.location.pathname === "/login" && supabase.auth.user()) router.push('/profile');
      }
      if (event === 'SIGNED_OUT') {
        handleAuthChange(event, session, "logout")
      }
    })
    return () => {
      authListener.unsubscribe()
    }
  }, [])
  async function handleAuthChange(event, session, action) {
    await fetch(`/api/auth?action=${action}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }
  return (<>
    <Head>
      <meta name="description" content="Matt's personal streaming platform for all his incredible content." />
      <meta property="og:image" content={"/OG_IMG.png"} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  </>)
}

export default MyApp
