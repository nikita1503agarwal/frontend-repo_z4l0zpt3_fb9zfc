import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const MediaCard = ({ item }) => {
  const glow = item.kind === 'image' ? 'shadow-[0_0_24px_rgba(59,130,246,0.45)]' : item.kind === 'video' ? 'shadow-[0_0_24px_rgba(147,51,234,0.45)]' : 'shadow-[0_0_24px_rgba(234,179,8,0.45)]'
  return (
    <motion.a
      href={`${API}/media/file/${item.file_id}`}
      target="_blank"
      rel="noreferrer"
      className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md ${glow}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img src={`${API}/media/file/${item.file_id}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 p-3">
        <p className="text-sm text-blue-100 font-medium drop-shadow">{item.title}</p>
      </div>
    </motion.a>
  )
}

const Gallery = () => {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const load = async () => {
      const q = filter === 'all' ? '' : `?kind=${filter}`
      const res = await fetch(`${API}/media${q}`)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [filter])

  return (
    <section id="gallery" className="relative px-6 md:px-10 lg:px-16 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-100">Artist Portfolio Hub</h2>
        <div className="flex gap-2">
          {['all','image','video','model'].map(k => (
            <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-xl border ${filter===k?'border-amber-300/70 text-amber-200 bg-amber-300/10':'border-white/10 text-blue-100/80 hover:text-blue-100'}`}>
              {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {items.map(it => (
            <MediaCard key={it.id} item={it} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
