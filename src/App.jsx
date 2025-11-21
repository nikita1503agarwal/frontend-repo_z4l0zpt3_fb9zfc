import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Hero3D from './components/Hero3D'
import Gallery from './components/Gallery'
import GamerHub from './components/GamerHub'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NeonModal from './components/NeonModal'
import AuthPanel from './components/AuthPanel'
import ProfileEditor from './components/ProfileEditor'
import UploadCenter from './components/UploadCenter'
import ChatWidget from './components/ChatWidget'

function App() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* subtle starfield */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(2,6,23,1),rgba(2,6,23,0.2))]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(59,130,246,0.08),transparent_30%,rgba(147,51,234,0.08),transparent_70%,rgba(234,179,8,0.06))]" />
      </div>

      <Navbar />
      <Hero3D />

      {/* Auth / Profile / Upload */}
      <section className="px-6 md:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <h3 className="text-xl font-semibold text-blue-100 mb-2">Welcome</h3>
              <p className="text-blue-200/80 text-sm">Sign in to personalize your profile and upload media to the gallery.</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setAuthOpen(true)} className="px-4 py-2 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-100">Sign In</button>
                <a href="#gamer" className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-100">Explore</a>
              </div>
            </div>
            <div className="mt-6">
              <ProfileEditor />
            </div>
          </div>
          <div className="lg:col-span-2">
            <UploadCenter />
          </div>
        </div>
      </section>

      <Gallery />
      <GamerHub />

      {/* Social Feed placeholder section */}
      <section className="px-6 md:px-10 lg:px-16 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-100">Social Feed</h2>
          <p className="text-blue-200/80 mt-2">Sign in to post updates and share your latest drops. Real-time chat bubbles appear as users send messages.</p>
        </div>
      </section>

      <Footer />
      <ChatWidget />

      <NeonModal open={authOpen} onClose={() => setAuthOpen(false)}>
        <AuthPanel onAuthed={() => setAuthOpen(false)} />
      </NeonModal>
    </div>
  )
}

export default App
