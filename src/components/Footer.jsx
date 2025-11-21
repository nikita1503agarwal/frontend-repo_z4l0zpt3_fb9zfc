import React from 'react'

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-10 lg:px-16 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-200/80 text-sm">© {new Date().getFullYear()} Neon Nexus</p>
          <div className="flex gap-3">
            <a href="#" className="text-blue-200/80 hover:text-blue-200">About</a>
            <a href="#" className="text-blue-200/80 hover:text-blue-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
