import { useState } from 'react'
import supabase from '../lib/supabaseClient'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [authState, setAuthState] = useState()

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({email})
      if (error) setAuthState({error})
      setAuthState({state: "success"})
    } catch (error) {
        setAuthState({error})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
        <p className="description">
          Sign in via magic link with your email below
        </p>
        {authState.error && <p>There was a problem with the server.</p>}
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
      </div>
    </div>
  )
}