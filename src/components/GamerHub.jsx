import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const GamerHub = () => {
  const [clips, setClips] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/media?kind=clip`)
      const data = await res.json()
      setClips(data.items || [])
    }
    load()
  }, [])

  return (
    <section id="gamer" className="relative px-6 md:px-10 lg:px-16 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-100">Gamer Showcase Hub</h2>
        <a href="#" className="text-sm text-blue-200/80 hover:text-blue-200">Customize Profile →</a>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clips.map(c => (
          <motion.div key={c.id} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="aspect-video bg-black/60">
              <video src={`${API}/media/file/${c.file_id}`} controls className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-blue-100 text-sm font-medium">{c.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default GamerHub
