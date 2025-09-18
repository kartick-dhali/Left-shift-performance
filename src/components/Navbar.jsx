import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({to, children})=>{
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link to={to} className={active ? 'font-semibold underline' : 'hover:underline'}>
      {children}
    </Link>
  )
}

export default function Navbar(){
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">DemoSite</div>
        <nav className="space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
