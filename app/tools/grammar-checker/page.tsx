'use client';

import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Copy, Download, Edit3 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface GrammarIssue {
  type: 'spelling' | 'grammar' | 'punctuation' | 'style';
  message: string;
  suggestion: string;
  startIndex: number;
  endIndex: number;
}

function GrammarCheckerContent() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [correctedText, setCorrectedText] = useState('');

  useEffect(() => {
    const urlText = searchParams.get('text');
    if (urlText) {
      const decodedText = decodeURIComponent(urlText);
      setText(decodedText);
      analyzeGrammar(decodedText);
    }
  }, [searchParams]);

  const analyzeGrammar = (inputText: string) => {
    setIsAnalyzing(true);
    
    // Simulate grammar analysis
    setTimeout(() => {
      const mockIssues: GrammarIssue[] = [
        {
          type: 'spelling' as const,
          message: 'Possible spelling error',
          suggestion: 'grammar',
          startIndex: inputText.toLowerCase().indexOf('grammer'),
          endIndex: inputText.toLowerCase().indexOf('grammer') + 7
        },
        {
          type: 'punctuation' as const,
          message: 'Missing comma',
          suggestion: 'Add comma after &quot;however&quot;',
          startIndex: inputText.toLowerCase().indexOf('however'),
          endIndex: inputText.toLowerCase().indexOf('however') + 8
        },
        {
          type: 'grammar' as const,
          message: 'Subject-verb agreement',
          suggestion: 'Change &quot;is&quot; to &quot;are&quot;',
          startIndex: inputText.toLowerCase().indexOf('the tools is'),
          endIndex: inputText.toLowerCase().indexOf('the tools is') + 12
        }
      ].filter(issue => issue.startIndex !== -1);

      setIssues(mockIssues);
      
      // Generate corrected text
      let corrected = inputText;
      mockIssues.forEach(issue => {
        if (issue.type === 'spelling' && issue.suggestion) {
          corrected = corrected.replace(/grammer/gi, 'grammar');
        }
      });
      setCorrectedText(corrected);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleAnalyze = () => {
    if (text.trim()) {
      analyzeGrammar(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadReport = () => {
    const content = `Grammar Check Report

Original Text:
${text}

Issues Found:
${issues.map(issue => `- ${issue.type.toUpperCase()}: ${issue.message} → ${issue.suggestion}`).join('\n')}

Corrected Text:
${correctedText}

Total Issues: ${issues.length}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grammar-check-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'spelling': return 'text-red-600 bg-red-50 border-red-200';
      case 'grammar': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'punctuation': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'style': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Grammar Checker</h1>
                  <p className="text-sm text-gray-600">Professional Grammar Analysis</p>
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
                placeholder="Paste your text here for grammar analysis..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {text.length} characters
              </span>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Check Grammar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Grammar Analysis</h2>
              {issues.length > 0 && (
                <button
                  onClick={downloadReport}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download Report
                </button>
              )}
            </div>

            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your text for grammar issues...</p>
              </div>
            ) : issues.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="font-medium text-red-700">
                      {issues.length} issue{issues.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {issues.map((issue, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getIssueColor(issue.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            <span className="font-medium text-sm">
                              {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)} Issue
                            </span>
                          </div>
                          <p className="text-sm mb-2">{issue.message}</p>
                          <p className="text-sm font-medium">Suggestion: {issue.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {correctedText && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Corrected Text</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {correctedText}
                      </div>
                      <button
                        onClick={() => copyToClipboard(correctedText)}
                        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Corrected Text
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : text && !isAnalyzing ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-green-700 font-medium">No grammar issues found!</p>
                <p className="text-gray-600 text-sm mt-2">Your text looks good.</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter text and click &quot;Check Grammar&quot; to analyze</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GrammarChecker() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GrammarCheckerContent />
    </Suspense>
  );
} 