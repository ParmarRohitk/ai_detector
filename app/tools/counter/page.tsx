'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Download, Hash } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CharacterCounter() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');

  useEffect(() => {
    const urlText = searchParams.get('text');
    if (urlText) {
      const decodedText = decodeURIComponent(urlText);
      setText(decodedText);
    }
  }, [searchParams]);

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

  const countCharactersNoSpaces = (text: string) => {
    return text.replace(/\s/g, '').length;
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

  const calculateSpeakingTime = (text: string) => {
    const words = countWords(text);
    const wordsPerMinute = 150;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const getWordFrequency = (text: string) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency: { [key: string]: number } = {};
    
    words.forEach(word => {
      if (word.length > 2) { // Only count words longer than 2 characters
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  };

  const getTextStats = () => {
    const words = countWords(text);
    const sentences = countSentences(text);
    const characters = countCharacters(text);
    const charactersNoSpaces = countCharactersNoSpaces(text);
    const paragraphs = countParagraphs(text);
    const readingTime = calculateReadingTime(text);
    const speakingTime = calculateSpeakingTime(text);
    const wordFrequency = getWordFrequency(text);
    
    return {
      words,
      sentences,
      characters,
      charactersNoSpaces,
      paragraphs,
      readingTime,
      speakingTime,
      wordFrequency
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadReport = () => {
    const stats = getTextStats();
    const content = `Text Analysis Report

Original Text:
${text}

Statistics:
- Characters (with spaces): ${stats.characters}
- Characters (without spaces): ${stats.charactersNoSpaces}
- Words: ${stats.words}
- Sentences: ${stats.sentences}
- Paragraphs: ${stats.paragraphs}
- Reading time: ${stats.readingTime} minutes
- Speaking time: ${stats.speakingTime} minutes

Most Common Words:
${stats.wordFrequency.map(item => `- "${item.word}": ${item.count} times`).join('\n')}

Average word length: ${stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0} characters
Average sentence length: ${stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0} words
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-analysis-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = getTextStats();

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
                  <Hash className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Character Counter</h1>
                  <p className="text-sm text-gray-600">Comprehensive text analysis</p>
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
                placeholder="Paste your text here for detailed analysis..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {text.length} characters
              </span>
              {text && (
                <button
                  onClick={downloadReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Text Analysis</h2>
            
            {text ? (
              <div className="space-y-6">
                {/* Basic Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700">{stats.characters}</div>
                      <div className="text-sm text-blue-600">Characters</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-700">{stats.charactersNoSpaces}</div>
                      <div className="text-sm text-green-600">No Spaces</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-700">{stats.words}</div>
                      <div className="text-sm text-purple-600">Words</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-700">{stats.sentences}</div>
                      <div className="text-sm text-orange-600">Sentences</div>
                    </div>
                  </div>
                </div>

                {/* Advanced Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-pink-700">{stats.paragraphs}</div>
                      <div className="text-sm text-pink-600">Paragraphs</div>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-700">{stats.readingTime}</div>
                      <div className="text-sm text-indigo-600">Min Read</div>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-teal-700">{stats.speakingTime}</div>
                      <div className="text-sm text-teal-600">Min Speak</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-700">
                        {stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}
                      </div>
                      <div className="text-sm text-yellow-600">Avg Word Length</div>
                    </div>
                  </div>
                </div>

                {/* Word Frequency */}
                {stats.wordFrequency.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Most Common Words</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {stats.wordFrequency.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                            <span className="font-medium text-gray-700">"{item.word}"</span>
                            <span className="text-sm text-gray-500">{item.count} times</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Copy Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => copyToClipboard(text)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Text
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter text to see detailed analysis</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 