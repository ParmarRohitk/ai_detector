'use client';

import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, Copy, Download, Scissors } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

function WhitespaceRemoverContent() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const [cleanedText, setCleanedText] = useState('');


  useEffect(() => {
    const urlText = searchParams.get('text');
    if (urlText) {
      const decodedText = decodeURIComponent(urlText);
      setText(decodedText);
    }
  }, [searchParams]);

  const cleanWhitespace = (type: string) => {
    if (!text.trim()) return;
    

    let result = '';
    
    switch (type) {
      case 'all':
        // Remove all whitespace
        result = text.replace(/\s+/g, '');
        break;
      case 'extra':
        // Remove extra spaces, keep single spaces
        result = text.replace(/\s+/g, ' ').trim();
        break;
      case 'lines':
        // Remove extra line breaks, keep single line breaks
        result = text.replace(/\n\s*\n/g, '\n').trim();
        break;
      case 'tabs':
        // Replace tabs with spaces
        result = text.replace(/\t/g, '    ');
        break;
      case 'start':
        // Remove leading whitespace
        result = text.replace(/^\s+/gm, '');
        break;
      case 'end':
        // Remove trailing whitespace
        result = text.replace(/\s+$/gm, '');
        break;
      case 'both':
        // Remove leading and trailing whitespace
        result = text.replace(/^\s+|\s+$/gm, '');
        break;
      case 'normalize':
        // Normalize all whitespace to single spaces
        result = text.replace(/\s+/g, ' ').trim();
        break;
      default:
        result = text;
    }
    
    setCleanedText(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cleaningOptions = [
    { 
      name: 'Remove All Whitespace', 
      type: 'all', 
      description: 'Remove all spaces, tabs, and line breaks',
      icon: '🗑️'
    },
    { 
      name: 'Remove Extra Spaces', 
      type: 'extra', 
      description: 'Keep single spaces, remove multiple spaces',
      icon: '✂️'
    },
    { 
      name: 'Remove Extra Lines', 
      type: 'lines', 
      description: 'Remove multiple line breaks',
      icon: '📝'
    },
    { 
      name: 'Replace Tabs', 
      type: 'tabs', 
      description: 'Replace tabs with 4 spaces',
      icon: '🔧'
    },
    { 
      name: 'Remove Leading Spaces', 
      type: 'start', 
      description: 'Remove spaces at start of lines',
      icon: '⬅️'
    },
    { 
      name: 'Remove Trailing Spaces', 
      type: 'end', 
      description: 'Remove spaces at end of lines',
      icon: '➡️'
    },
    { 
      name: 'Remove Both Ends', 
      type: 'both', 
      description: 'Remove leading and trailing spaces',
      icon: '↔️'
    },
    { 
      name: 'Normalize Whitespace', 
      type: 'normalize', 
      description: 'Standardize all whitespace',
      icon: '✨'
    }
  ];

  const getStats = () => {
    if (!text || !cleanedText) return null;
    
    const originalSpaces = (text.match(/\s/g) || []).length;
    const cleanedSpaces = (cleanedText.match(/\s/g) || []).length;
    const removedSpaces = originalSpaces - cleanedSpaces;
    const originalLength = text.length;
    const cleanedLength = cleanedText.length;
    const removedChars = originalLength - cleanedLength;
    
    return {
      originalSpaces,
      cleanedSpaces,
      removedSpaces,
      originalLength,
      cleanedLength,
      removedChars
    };
  };

  const stats = getStats();

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
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Whitespace Remover</h1>
                  <p className="text-sm text-gray-600">Clean and format text</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Text Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Your Text</h2>
            <div className="mb-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste text with extra whitespace to clean..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {text.length} characters
              </span>
              <button
                onClick={() => cleanWhitespace('extra')}
                disabled={!text.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Clean
              </button>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cleaning Options</h2>
            
            <div className="grid grid-cols-1 gap-3 mb-6 max-h-96 overflow-y-auto">
              {cleaningOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => cleanWhitespace(option.type)}
                  disabled={!text.trim()}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{option.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{option.name}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {cleanedText ? (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Cleaned Text</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(cleanedText)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={() => downloadText(cleanedText, 'cleaned-text.txt')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {cleanedText}
                  </div>
                </div>
                
                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="font-bold text-blue-700">{stats.removedChars}</div>
                      <div className="text-blue-600">Chars Removed</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="font-bold text-green-700">{stats.removedSpaces}</div>
                      <div className="text-green-600">Spaces Removed</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="font-bold text-purple-700">{stats.originalLength}</div>
                      <div className="text-purple-600">Original</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="font-bold text-orange-700">{stats.cleanedLength}</div>
                      <div className="text-orange-600">Cleaned</div>
                    </div>
                  </div>
                )}
              </div>
            ) : text && !cleanedText ? (
              <div className="text-center py-8 text-gray-500">
                <Scissors className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click on a cleaning option above to process</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Scissors className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter text to start cleaning</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function WhitespaceRemover() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WhitespaceRemoverContent />
    </Suspense>
  );
} 