import React from 'react'

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            About this project
          </span>
          <div className="absolute -bottom-4 left-0 w-20 h-1 bg-blue-500"></div>
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            This is a minimal starter multipage website made with React + Vite and styled with Tailwind CSS. 
            It includes client-side routing (react-router) and small animations using Framer Motion.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Key Features:</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Vite for fast dev & build</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Tailwind CSS for utility-first styling</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>React Router for navigation</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
