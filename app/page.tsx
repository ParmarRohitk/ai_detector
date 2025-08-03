'use client';

import Image from "next/image";
import { useState } from "react";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Download,
  Search,
  Edit3,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Palette,
  Scissors,
  RotateCcw,
  Filter,
  Eye,
  Brain,
  Type,
  Hash
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [text, setText] = useState('');

  const countWords = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const countSentences = (text: string) => {
    if (text.trim() === '') return 0;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    return sentences.length;
  };

  const countCharacters = (text: string) => {
    return text.length;
  };

  const countParagraphs = (text: string) => {
    if (text.trim() === '') return 0;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    return paragraphs.length;
  };

  const calculateReadingTime = (text: string) => {
    const words = countWords(text);
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const tools = [
    {
      name: "Character & Word Counter",
      description: "Count characters, words, paragraphs, reading time",
      icon: Hash,
      href: "/tools/counter",
      color: "blue"
    },
    {
      name: "Text Case Converter",
      description: "Convert text to UPPERCASE, lowercase, Sentence case",
      icon: Type,
      href: "/tools/case-converter",
      color: "green"
    },
    {
      name: "Whitespace Remover",
      description: "Remove extra spaces, tabs, or line breaks",
      icon: Scissors,
      href: "/tools/whitespace-remover",
      color: "purple"
    },
    {
      name: "Text Sorter",
      description: "Alphabetize lines or sort numbers",
      icon: BarChart3,
      href: "/tools/text-sorter",
      color: "orange"
    },
    {
      name: "Text Reverser",
      description: "Reverse characters or words in a string",
      icon: RotateCcw,
      href: "/tools/text-reverser",
      color: "red"
    },
    {
      name: "AI Content Humanizer",
      description: "Rephrase robotic text into natural language",
      icon: Brain,
      href: "/check-content",
      color: "indigo"
    },
    {
      name: "Grammar Checker",
      description: "Highlight and fix grammar/spelling errors",
      icon: Edit3,
      href: "/tools/grammar-checker",
      color: "teal"
    },
    {
      name: "Text Summarizer",
      description: "Generate a short version of long text",
      icon: Clock,
      href: "/tools/summarizer",
      color: "pink"
    },
    {
      name: "Plagiarism Checker",
      description: "Detect copied content using web search",
      icon: Search,
      href: "/tools/plagiarism-checker",
      color: "yellow"
    },
    {
      name: "Duplicate Remover",
      description: "Remove duplicate lines from text",
      icon: Filter,
      href: "/tools/duplicate-remover",
      color: "cyan"
    },
    {
      name: "AI Detection",
      description: "Check if text is AI-generated vs human",
      icon: Shield,
      href: "/check-content",
      color: "rose"
    },
    {
      name: "Tone Adjuster",
      description: "Convert tone: formal ↔ casual, polite ↔ direct",
      icon: Palette,
      href: "/tools/tone-adjuster",
      color: "emerald"
    }
  ];

  const handleToolClick = (toolHref: string) => {
    if (text.trim()) {
      const encodedText = encodeURIComponent(text);
      window.location.href = `${toolHref}?text=${encodedText}`;
    } else {
      toast.error('Please enter some text first!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Text Tools
            <span className="block text-blue-600">for Every Need</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform, analyze, and enhance your text with our comprehensive suite of professional tools. 
            From basic utilities to advanced AI-powered features.
          </p>
          
          {/* Quick Counter Tool */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Text Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Text Input */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here for instant analysis..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
                  />
                </div>

                {/* Counter Display */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">{countCharacters(text)}</div>
                    <div className="text-sm text-blue-600">Characters</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">{countWords(text)}</div>
                    <div className="text-sm text-green-600">Words</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700">{countSentences(text)}</div>
                    <div className="text-sm text-purple-600">Sentences</div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-700">{countParagraphs(text)}</div>
                    <div className="text-sm text-orange-600">Paragraphs</div>
                  </div>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-pink-700">{calculateReadingTime(text)}</div>
                    <div className="text-sm text-pink-600">Min Read</div>
                  </div>
                </div>
              </div>

              {/* Tools Button List */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Text Tools</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {tools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    const colorClasses = {
                      blue: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
                      green: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
                      purple: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100",
                      orange: "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100",
                      red: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
                      indigo: "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100",
                      teal: "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100",
                      pink: "bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100",
                      yellow: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100",
                      cyan: "bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100",
                      rose: "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100",
                      emerald: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    };
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleToolClick(tool.href)}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 flex items-center space-x-3 ${colorClasses[tool.color as keyof typeof colorClasses]}`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs opacity-75">{tool.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div id="tools" className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">All Professional Text Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              const colorClasses = {
                blue: "bg-blue-50 border-blue-200 text-blue-700",
                green: "bg-green-50 border-green-200 text-green-700",
                purple: "bg-purple-50 border-purple-200 text-purple-700",
                orange: "bg-orange-50 border-orange-200 text-orange-700",
                red: "bg-red-50 border-red-200 text-red-700",
                indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
                teal: "bg-teal-50 border-teal-200 text-teal-700",
                pink: "bg-pink-50 border-pink-200 text-pink-700",
                yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
                cyan: "bg-cyan-50 border-cyan-200 text-cyan-700",
                rose: "bg-rose-50 border-rose-200 text-rose-700",
                emerald: "bg-emerald-50 border-emerald-200 text-emerald-700"
              };
              
              return (
                <a
                  key={index}
                  href={tool.href}
                  className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {tool.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose TextTools Pro?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h4>
              <p className="text-gray-600">
                Process text instantly with our optimized algorithms. No waiting, no delays - just immediate results for all your text processing needs.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Privacy First</h4>
              <p className="text-gray-600">
                Your data stays private. We don't store your text content - all processing happens locally in your browser for maximum security.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">AI Powered</h4>
              <p className="text-gray-600">
                Advanced AI detection and content analysis. Identify AI-generated text and enhance your content with intelligent processing.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Edit3 className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Professional Quality</h4>
              <p className="text-gray-600">
                Built for professionals. Grammar checking, plagiarism detection, and advanced text analysis tools for serious content creators.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Time Saving</h4>
              <p className="text-gray-600">
                Automate tedious text tasks. From counting characters to detecting AI content, save hours with our comprehensive toolset.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Easy to Use</h4>
              <p className="text-gray-600">
                Intuitive interface designed for everyone. No learning curve - just paste your text and get instant results with our user-friendly tools.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Text?</h3>
          <p className="text-xl mb-6 opacity-90">
            Access all our professional tools and start enhancing your content today.
          </p>
          <a
            href="/check-content"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Brain className="w-5 h-5 mr-2" />
            Try AI Content Detector
          </a>
        </div>
      </div>
    </div>
  );
}
