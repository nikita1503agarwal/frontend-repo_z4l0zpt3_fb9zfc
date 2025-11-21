import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const ProfileEditor = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (res.ok) setProfile(data.profile)
      } catch {}
      setLoading(false)
    }
    if (token) load()
    else setLoading(false)
  }, [token])

  const save = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ display_name: profile?.display_name || '', bio: profile?.bio || '', theme: profile?.theme || 'electric' })
      })
      if (res.ok) setMsg('Saved!')
    } catch {}
  }

  if (!token) return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-blue-100">Sign in to edit your profile.</p>
    </div>
  )

  if (loading) return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-blue-100/80">Loading…</p>
    </div>
  )

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
      <h3 className="text-lg font-semibold text-blue-100 mb-4">Profile</h3>
      <form onSubmit={save} className="space-y-3">
        <label className="block">
          <span className="text-blue-100/80 text-sm">Display Name</span>
          <input className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={profile?.display_name || ''} onChange={e => setProfile({ ...profile, display_name: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-blue-100/80 text-sm">Bio</span>
          <textarea rows={3} className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={profile?.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-blue-100/80 text-sm">Theme</span>
          <select className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={profile?.theme || 'electric'} onChange={e => setProfile({ ...profile, theme: e.target.value })}>
            <option value="electric">Electric</option>
            <option value="violet">Violet</option>
            <option value="amber">Amber</option>
          </select>
        </label>
        <motion.button whileTap={{ scale: 0.98 }} className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-100">Save</motion.button>
        {msg && <span className="text-green-300 text-sm">{msg}</span>}
      </form>
    </div>
  )
}

export default ProfileEditor
