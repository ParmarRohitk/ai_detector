'use client';

import { FileText, Shield, FileText as FileTextIcon, Settings, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TextTools Pro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional text utilities for content creators, writers, and developers. Our comprehensive suite of tools helps you enhance, analyze, and optimize your text content with advanced features like AI content detection, grammar checking, and intelligent text processing.
            </p>
          </div>
          
          {/* Basic Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <FileTextIcon className="w-5 h-5 text-blue-400" />
              <span>Basic Tools</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/tools/counter" className="hover:text-white transition-colors">Character Counter</a></li>
              <li><a href="/tools/case-converter" className="hover:text-white transition-colors">Case Converter</a></li>
              <li><a href="/tools/text-sorter" className="hover:text-white transition-colors">Text Sorter</a></li>
              <li><a href="/tools/whitespace-remover" className="hover:text-white transition-colors">Whitespace Remover</a></li>
            </ul>
          </div>
          
          {/* Advanced Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-green-400" />
              <span>Advanced Tools</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/check-content" className="hover:text-white transition-colors">AI Content Detector</a></li>
              <li><a href="/tools/grammar-checker" className="hover:text-white transition-colors">Grammar Checker</a></li>
              <li><a href="/tools/plagiarism-checker" className="hover:text-white transition-colors">Plagiarism Checker</a></li>
              <li><a href="/tools/summarizer" className="hover:text-white transition-colors">Text Summarizer</a></li>
            </ul>
          </div>
          
          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Support</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center space-x-2">
            <span>&copy; {new Date().getFullYear()} TextTools Pro. By</span>
            <a 
              href="https://prk.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
            >
              <span>ParmarRohitK.</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
          </p>
        </div>
      </div>
    </footer>
  );
} 