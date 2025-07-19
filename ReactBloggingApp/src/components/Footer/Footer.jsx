import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & Copy */}
        <div className="flex flex-col justify-between">
          <div className="mb-4">
            <Logo width="120px" />
          </div>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} All rights reserved by DevUI.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-gray-500">Company</h3>
          <ul className="space-y-3">
            <li><Link to="/features" className="hover:text-blue-600">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-600">Pricing</Link></li>
            <li><Link to="/affiliate" className="hover:text-blue-600">Affiliate Program</Link></li>
            <li><Link to="/press" className="hover:text-blue-600">Press Kit</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-gray-500">Support</h3>
          <ul className="space-y-3">
            <li><Link to="/account" className="hover:text-blue-600">Account</Link></li>
            <li><Link to="/help" className="hover:text-blue-600">Help</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
            <li><Link to="/support" className="hover:text-blue-600">Customer Support</Link></li>
          </ul>
        </div>

        {/* Legals */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-gray-500">Legal</h3>
          <ul className="space-y-3">
            <li><Link to="/terms" className="hover:text-blue-600">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link to="/licensing" className="hover:text-blue-600">Licensing</Link></li>
          </ul>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer