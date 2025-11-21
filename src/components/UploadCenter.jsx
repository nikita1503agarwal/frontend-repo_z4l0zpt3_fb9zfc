import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const UploadCenter = () => {
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState('image')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const token = localStorage.getItem('token')

  const submit = async (e) => {
    e.preventDefault()
    if (!token) {
      setStatus('Please sign in first.')
      return
    }
    if (!file) {
      setStatus('Select a file to upload.')
      return
    }
    setStatus('Uploading…')
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('kind', kind)
      form.append('description', description)
      form.append('tags', tags)
      form.append('file', file)

      const res = await fetch(`${API}/media/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Upload failed')
      setStatus('Uploaded!')
      setTitle('')
      setDescription('')
      setTags('')
      setFile(null)
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
      <h3 className="text-lg font-semibold text-blue-100 mb-4">Upload Center</h3>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-blue-100/80 text-sm">Title</span>
            <input className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-blue-100/80 text-sm">Type</span>
            <select className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={kind} onChange={e=>setKind(e.target.value)}>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="model">3D Model</option>
              <option value="clip">Game Clip</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-blue-100/80 text-sm">Description</span>
          <textarea rows={3} className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={description} onChange={e=>setDescription(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-blue-100/80 text-sm">Tags (comma separated)</span>
          <input className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 text-blue-50 px-3 py-2" value={tags} onChange={e=>setTags(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-blue-100/80 text-sm">File</span>
          <input type="file" className="mt-1 w-full text-blue-100" onChange={e=>setFile(e.target.files?.[0]||null)} />
        </label>
        <motion.button whileTap={{ scale: 0.98 }} className="px-4 py-2 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-100">Upload</motion.button>
        {status && <p className="text-sm text-amber-200">{status}</p>}
      </form>
    </div>
  )
}

export default UploadCenter
