import React from 'react'

export default function Contact(){
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <p className="mb-6 text-gray-700">Want to reach out? Use the form below (demo only — no backend).</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea className="mt-1 block w-full border rounded px-3 py-2" rows="4" placeholder="Hi there..." />
        </div>
        <button type="button" className="inline-block px-4 py-2 rounded border">Send (demo)</button>
      </form>
    </section>
  )
}
