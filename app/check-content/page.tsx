'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Copy, Download } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface AnalysisResult {
  originalText: string;
  humanizedText: string;
  humanizedChanges: Array<{
    original: string;
    replacement: string;
    startIndex: number;
    endIndex: number;
  }>;
  aiScore: number;
  humanScore: number;
  confidence: number;
  suggestions: string[];
  isAIGenerated: boolean;
  detectedAIModel: string;
}

export default function CheckContent() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInputText(text);
        setActiveTab('text');
        toast.success('File uploaded successfully!');
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/markdown': ['.md', '.mdx']
    },
    multiple: false
  });

  const analyzeContent = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    if (inputText.length < 40) {
      toast.error('Text must be at least 40 characters long');
      return;
    }

    if (inputText.length > 2000) {
      toast.error('Text must be less than 2000 characters');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result: AnalysisResult = await response.json();
      setResult(result);
      toast.success('Analysis completed!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };



  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const renderHighlightedText = (text: string, changes: Array<{
    original: string;
    replacement: string;
    startIndex: number;
    endIndex: number;
  }>) => {
    if (changes.length === 0) {
      return <span className="text-gray-700">{text}</span>;
    }

    const elements: React.JSX.Element[] = [];
    let lastIndex = 0;

    changes.forEach((change, index) => {
      // Add text before the change
      if (change.startIndex > lastIndex) {
        elements.push(
          <span key={`text-${index}`} className="text-gray-700">
            {text.slice(lastIndex, change.startIndex)}
          </span>
        );
      }

      // Add the highlighted replacement
      elements.push(
        <span key={`change-${index}`} className="text-orange-600 font-medium bg-orange-100 px-1 rounded">
          {change.replacement}
        </span>
      );

      lastIndex = change.endIndex;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end" className="text-gray-700">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return <>{elements}</>;
  };

  const downloadResult = () => {
    if (!result) return;
    
    const content = `AI Content Analysis Report

Original Text:
${result.originalText}

Humanized Text:
${result.humanizedText}

Changes Made:
${result.humanizedChanges.map(change => 
  `- "${change.original}" → "${change.replacement}"`
).join('\n')}

Analysis Results:
- AI Score: ${result.aiScore}%
- Human Score: ${result.humanScore}%
- Confidence: ${result.confidence}%
- AI Generated: ${result.isAIGenerated ? 'Yes' : 'No'}
- Detected AI Model: ${result.detectedAIModel}

Suggestions:
${result.suggestions.map(s => `- ${s}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-analysis-report.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content Detector & Humanizer
          </h1>
          <p className="text-lg text-gray-600">
            Upload files or paste text to detect AI-generated content and get humanized versions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'text'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="inline w-4 h-4 mr-2" />
              Text Input
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'file'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="inline w-4 h-4 mr-2" />
              File Upload
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {activeTab === 'text' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text (40-2000 characters)
              </label>
                             <textarea
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="Paste your content here to analyze for AI detection and get humanized version..."
                 className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
                 maxLength={2000}
               />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {inputText.length}/2000 characters
                </span>
                <button
                  onClick={analyzeContent}
                  disabled={isAnalyzing || inputText.length < 40}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-blue-600 font-medium">Drop the file here...</p>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drop your file here, or click to select
                    </p>
                                         <p className="text-sm text-gray-500">
                       Supports .txt, .pdf, .doc, .docx, .md, .mdx files
                     </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <button
                onClick={downloadResult}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>

            {/* Score Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-700">AI Score</span>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-red-700">{result.aiScore}%</span>
                </div>
                <div className="mt-2 bg-red-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${result.aiScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">Human Score</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-green-700">{result.humanScore}%</span>
                </div>
                <div className="mt-2 bg-green-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${result.humanScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">Confidence</span>
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-blue-700">{result.confidence}%</span>
                </div>
                <div className="mt-2 bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Text Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Original Text</h3>
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {result.originalText}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(result.originalText)}
                  className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Humanized Text</h3>
                <div className="bg-green-50 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="leading-relaxed">
                    {renderHighlightedText(result.humanizedText, result.humanizedChanges)}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(result.humanizedText)}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvement Suggestions</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Model Detection */}
            {result.isAIGenerated && (
              <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Detected AI Model: {result.detectedAIModel}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Based on writing patterns and language characteristics, this content appears to be generated by {result.detectedAIModel.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Final Verdict */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <div className="flex items-center">
                {result.isAIGenerated ? (
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {result.isAIGenerated ? 'AI-Generated Content Detected' : 'Human-Written Content'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {result.isAIGenerated
                      ? 'This content appears to be generated by AI. Consider humanizing it for better authenticity.'
                      : 'This content appears to be naturally written by a human.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 