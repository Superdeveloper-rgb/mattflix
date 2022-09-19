import '../styles/globals.css'
import Head from 'next/head'
import PageLayout from '../components/PageLayout'
import supabase from '../lib/supabaseClient'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
