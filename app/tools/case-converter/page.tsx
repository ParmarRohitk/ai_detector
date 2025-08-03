'use client';

import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, Copy, Download, Type } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

function CaseConverterContent() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const [convertedText, setConvertedText] = useState('');

  useEffect(() => {
    const urlText = searchParams.get('text');
    if (urlText) {
      const decodedText = decodeURIComponent(urlText);
      setText(decodedText);
    }
  }, [searchParams]);

  const convertCase = (type: string) => {
    let result = '';
    switch (type) {
      case 'uppercase':
        result = text.toUpperCase();
        break;
      case 'lowercase':
        result = text.toLowerCase();
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
        break;
      case 'title':
        result = text.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
        break;
      case 'camel':
        result = text.toLowerCase().replace(/\b\w/g, (letter, index) => 
          index === 0 ? letter : letter.toUpperCase()
        ).replace(/\s+/g, '');
        break;
      case 'snake':
        result = text.toLowerCase().replace(/\s+/g, '_');
        break;
      case 'kebab':
        result = text.toLowerCase().replace(/\s+/g, '-');
        break;
      case 'alternating':
        result = text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        break;
      default:
        result = text;
    }
    setConvertedText(result);
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

  const caseOptions = [
    { name: 'UPPERCASE', type: 'uppercase', description: 'ALL CAPS TEXT' },
    { name: 'lowercase', type: 'lowercase', description: 'all lowercase text' },
    { name: 'Sentence case', type: 'sentence', description: 'First letter capitalized' },
    { name: 'Title Case', type: 'title', description: 'Each Word Capitalized' },
    { name: 'camelCase', type: 'camel', description: 'camelCaseFormat' },
    { name: 'snake_case', type: 'snake', description: 'snake_case_format' },
    { name: 'kebab-case', type: 'kebab', description: 'kebab-case-format' },
    { name: 'aLtErNaTiNg', type: 'alternating', description: 'aLtErNaTiNg CaSe' }
  ];

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
                  <Type className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Case Converter</h1>
                  <p className="text-sm text-gray-600">Convert text to different cases</p>
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
                placeholder="Enter text to convert to different cases..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {text.length} characters
              </span>
              <button
                onClick={() => convertCase('uppercase')}
                disabled={!text.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Convert
              </button>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Case Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {caseOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => convertCase(option.type)}
                  disabled={!text.trim()}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-medium text-sm">{option.name}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              ))}
            </div>

            {convertedText && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Converted Text</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(convertedText)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={() => downloadText(convertedText, 'converted-text.txt')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {convertedText}
                  </div>
                </div>
              </div>
            )}

            {!convertedText && text && (
              <div className="text-center py-8 text-gray-500">
                <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click on a case option above to convert your text</p>
              </div>
            )}

            {!text && (
              <div className="text-center py-8 text-gray-500">
                <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter text to start converting</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CaseConverter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CaseConverterContent />
    </Suspense>
  );
} 