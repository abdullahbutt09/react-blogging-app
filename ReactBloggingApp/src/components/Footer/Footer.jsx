import React from 'react';
// import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// Mock icons for demonstration
const FaGithub = ({ size, className }) => (
  <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FaLinkedin = ({ size, className }) => (
  <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FaTwitter = ({ size, className }) => (
  <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t-2 dark:border-gray-600 mt-16 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
          
          {/* Left Side - Brand Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              React Blogging App
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md">
              Made with <span className="text-red-500 text-xl">💙</span> by{' '}
              <a
                href="https://github.com/abdullahbutt09"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                @abdullahbutt09
              </a>
            </p>
          </div>

          {/* Right Side - CTA and Social */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            
            {/* GitHub CTA Button */}
            <a
            href="https://github.com/abdullahbutt09/react-blogging-app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-md text-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 group"
          >
            <span className="text-base">⭐</span>
            View Code
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Follow me:</span>
              <div className="flex gap-3">
                <FooterIcon 
                  icon={FaGithub} 
                  link="https://github.com/abdullahbutt09"
                  label="GitHub"
                />
                <FooterIcon 
                  icon={FaLinkedin} 
                  link="https://linkedin.com/in/yourprofile"
                  label="LinkedIn"
                />
                <FooterIcon 
                  icon={FaTwitter} 
                  link="https://twitter.com/yourhandle"
                  label="Twitter"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} React Blogging App. All rights reserved.
            </p>
            
            {/* Quick Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterIcon = ({ icon: Icon, link, label }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 transform hover:scale-110"
    aria-label={label}
    title={label}
  >
    <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
  </a>
);

export default Footer;