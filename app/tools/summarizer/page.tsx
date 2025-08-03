'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Download, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Summarizer() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryType, setSummaryType] = useState('short');

  useEffect(() => {
    const urlText = searchParams.get('text');
    if (urlText) {
      const decodedText = decodeURIComponent(urlText);
      setText(decodedText);
    }
  }, [searchParams]);

  const generateSummary = (type: string) => {
    if (!text.trim()) return;
    
    setIsSummarizing(true);
    setSummaryType(type);
    
    // Simulate summarization
    setTimeout(() => {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      let result = '';
      
      switch (type) {
        case 'short':
          // Take first 2-3 sentences
          result = sentences.slice(0, Math.min(3, sentences.length)).join('. ') + '.';
          break;
        case 'medium':
          // Take first 4-5 sentences
          result = sentences.slice(0, Math.min(5, sentences.length)).join('. ') + '.';
          break;
        case 'long':
          // Take first 6-8 sentences
          result = sentences.slice(0, Math.min(8, sentences.length)).join('. ') + '.';
          break;
        case 'bullet':
          // Create bullet points from key sentences
          const keySentences = sentences.slice(0, Math.min(6, sentences.length));
          result = keySentences.map(sentence => `• ${sentence.trim()}`).join('\n');
          break;
        case 'extract':
          // Extract key phrases
          const words = text.split(/\s+/);
          const keyWords = words.filter(word => word.length > 5).slice(0, 10);
          result = keyWords.join(', ');
          break;
        default:
          result = sentences.slice(0, 3).join('. ') + '.';
      }
      
      setSummary(result);
      setIsSummarizing(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadSummary = () => {
    const content = `Text Summary Report

Original Text:
${text}

Summary Type: ${summaryType}
Summary:
${summary}

Original Length: ${text.length} characters
Summary Length: ${summary.length} characters
Compression: ${Math.round((1 - summary.length / text.length) * 100)}% reduction
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const summaryOptions = [
    { 
      name: 'Short Summary', 
      type: 'short', 
      description: '2-3 sentences',
      icon: '📝'
    },
    { 
      name: 'Medium Summary', 
      type: 'medium', 
      description: '4-5 sentences',
      icon: '📄'
    },
    { 
      name: 'Long Summary', 
      type: 'long', 
      description: '6-8 sentences',
      icon: '📖'
    },
    { 
      name: 'Bullet Points', 
      type: 'bullet', 
      description: 'Key points list',
      icon: '📋'
    },
    { 
      name: 'Key Words', 
      type: 'extract', 
      description: 'Important terms',
      icon: '🔑'
    }
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
              <a href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Text Summarizer</h1>
                  <p className="text-sm text-gray-600">Generate concise summaries</p>
                </div>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
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
                placeholder="Paste your long text here to generate a summary..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {text.length} characters
              </span>
              <button
                onClick={() => generateSummary('short')}
                disabled={isSummarizing || !text.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Summarize
              </button>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary Options</h2>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              {summaryOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => generateSummary(option.type)}
                  disabled={isSummarizing || !text.trim()}
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

            {isSummarizing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating summary...</p>
              </div>
            ) : summary ? (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(summary)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={downloadSummary}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {summary}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="font-bold text-blue-700">{text.length}</div>
                    <div className="text-blue-600">Original</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="font-bold text-green-700">{summary.length}</div>
                    <div className="text-green-600">Summary</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="font-bold text-purple-700">{Math.round((1 - summary.length / text.length) * 100)}%</div>
                    <div className="text-purple-600">Reduction</div>
                  </div>
                </div>
              </div>
            ) : text && !isSummarizing ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click on a summary option above to generate</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter text to start summarizing</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 