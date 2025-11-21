import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <Link to="/" className="px-4 py-2 text-amber-200 font-semibold tracking-widest">NEXUS</Link>
          <nav className="flex items-center gap-1 p-1">
            {[
              { to: '#gallery', label: 'Artists' },
              { to: '#gamer', label: 'Gamers' },
              { to: '/dashboard', label: 'Dashboard' },
            ].map((i) => (
              i.to.startsWith('#') ? (
                <a key={i.label} href={i.to} className="px-3 py-1.5 rounded-xl text-blue-100/80 hover:text-blue-100 hover:bg-white/5">{i.label}</a>
              ) : (
                <Link key={i.label} to={i.to} className="px-3 py-1.5 rounded-xl text-blue-100/80 hover:text-blue-100 hover:bg-white/5">{i.label}</Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
