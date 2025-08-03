'use client';

import { useState } from 'react';
import { FileText, Menu, X, Brain, Settings, Info } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                TextTools Pro
              </h1>
              <p className="text-sm text-gray-600">Professional Text Utilities</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/tools" 
              className="px-4 py-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Tools</span>
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link 
              href="/check-content" 
              className="px-4 py-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>AI Detector</span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/check-content"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/tools" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Tools</span>
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5" />
                <span>About</span>
              </Link>
              <Link 
                href="/check-content" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain className="w-5 h-5" />
                <span>AI Detector</span>
              </Link>
              <div className="pt-2">
                <Link
                  href="/check-content"
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 