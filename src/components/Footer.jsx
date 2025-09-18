import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm">
        © {new Date().getFullYear()} DemoSite — Built with React + Vite + Tailwind
      </div>
    </footer>
  )
}
