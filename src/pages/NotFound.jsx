import React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-5">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 flex items-center justify-center mx-auto text-2xl font-extrabold font-['Space_Grotesk']">
          404
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900 font-['Space_Grotesk']">
            Page Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The requested healthcare portal route does not exist or has been relocated.
          </p>
        </div>

        <Link
          to="/doctor/dashboard"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}
