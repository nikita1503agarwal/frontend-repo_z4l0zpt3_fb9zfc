import React, { useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const Input = ({ label, type = 'text', value, onChange, placeholder }) => (
  <label className="block">
    <span className="text-blue-100/80 text-sm">{label}</span>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 placeholder-blue-200/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      autoComplete="off"
    />
  </label>
)

const AuthPanel = ({ onAuthed }) => {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let res
      if (mode === 'login') {
        res = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email_or_username: email || username, password })
        })
      } else {
        res = await fetch(`${API}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        })
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Request failed')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onAuthed && onAuthed(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-blue-100">{mode === 'login' ? 'Sign In' : 'Create Account'}</h3>
        <button
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-sm text-amber-200/80 hover:text-amber-200"
        >
          {mode === 'login' ? 'Need an account? Register' : 'Have an account? Sign in'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === 'register' && (
          <Input label="Username" value={username} onChange={setUsername} placeholder="cyber_fox" />
        )}
        <Input label={mode === 'login' ? 'Email or Username' : 'Email'} value={email} onChange={setEmail} type="email" placeholder="you@neon.dev" />
        <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full px-4 py-2 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-100 hover:bg-blue-600/40 disabled:opacity-50"
        >
          {loading ? 'Please wait…' : (mode === 'login' ? 'Sign In' : 'Create Account')}
        </motion.button>
      </form>
    </div>
  )
}

export default AuthPanel
