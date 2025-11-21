import React from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const Hero3D = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Neon gradient glow */}
      <div className="pointer-events-none absolute -inset-32 opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(59,130,246,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(at_50%_50%,rgba(147,51,234,0.2),transparent_30%,rgba(234,179,8,0.15),transparent_60%)] mix-blend-screen" />
      </div>

      <div className="relative grid lg:grid-cols-2 items-center gap-8 px-6 md:px-10 lg:px-16 pt-24">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-blue-400 via-purple-400 to-amber-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            NEON NEXUS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-blue-100/80 text-lg max-w-xl"
          >
            A futuristic hub where artists and gamers collide. Upload portfolios, stream highlights, and craft your holographic profile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#gallery" className="px-6 py-3 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-100 hover:bg-blue-600/30 hover:border-blue-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Explore Gallery
            </a>
            <a href="#gamer" className="px-6 py-3 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-100 hover:bg-purple-600/30 hover:border-purple-400 transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              Gamer Hub
            </a>
          </motion.div>
        </div>

        {/* 3D Scene */}
        <div className="relative h-[60vh] lg:h-[70vh]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-amber-500/10 backdrop-blur-md">
            <Spline scene="https://prod.spline.design/JgzR2oP9qX7b8VnB/scene.splinecode" />
          </div>
          {/* hologram frame */}
          <div className="absolute -inset-2 rounded-[28px] border-2 border-blue-400/40 blur-md" />
        </div>
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-amber-300/70 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 12px rgba(234,179,8,0.8)'
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero3D
