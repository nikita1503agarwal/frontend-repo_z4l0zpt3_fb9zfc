import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NeonModal = ({ open, onClose, children, widthClass = 'max-w-lg' }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`relative w-full ${widthClass}`}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-amber-400/10 blur-xl" />
              <button onClick={onClose} className="absolute top-2 right-2 text-blue-100/80 hover:text-blue-100 px-2 py-1 rounded-lg hover:bg-white/10">✕</button>
              <div className="relative">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NeonModal
