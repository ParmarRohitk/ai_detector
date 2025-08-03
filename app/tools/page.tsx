import type { Metadata } from "next";
import { 
  Hash, 
  Type, 
  Scissors, 
  BarChart3, 
  RotateCcw, 
  Brain, 
  Edit3, 
  Clock, 
  Search, 
  Filter, 
  Shield, 
  Palette 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Text Tools",
  description: "Explore all professional text tools by TextTools Pro. From basic utilities to advanced AI-powered features for content creators, writers, and developers.",
  keywords: ["text tools", "character counter", "case converter", "grammar checker", "plagiarism checker", "AI detector", "text processing"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Text Tools - TextTools Pro",
    description: "Explore all professional text tools by TextTools Pro. From basic utilities to advanced AI-powered features.",
  },
};

export default function Tools() {
  const tools = [
    {
      name: "Character & Word Counter",
      description: "Count characters, words, paragraphs, and estimate reading time with precision",
      icon: Hash,
      href: "/tools/counter",
      color: "blue",
      features: ["Real-time counting", "Reading time estimation", "Detailed statistics"]
    },
    {
      name: "Text Case Converter",
      description: "Convert text between different cases: UPPERCASE, lowercase, Title Case, and more",
      icon: Type,
      href: "/tools/case-converter",
      color: "green",
      features: ["Multiple case options", "Batch processing", "Preserve formatting"]
    },
    {
      name: "Whitespace Remover",
      description: "Clean up extra spaces, tabs, and line breaks from your text",
      icon: Scissors,
      href: "/tools/whitespace-remover",
      color: "purple",
      features: ["Remove extra spaces", "Clean line breaks", "Format preservation"]
    },
    {
      name: "Text Sorter",
      description: "Alphabetize lines, sort numbers, and organize your content efficiently",
      icon: BarChart3,
      href: "/tools/text-sorter",
      color: "orange",
      features: ["Alphabetical sorting", "Numerical sorting", "Custom separators"]
    },
    {
      name: "Text Reverser",
      description: "Reverse characters, words, or entire text strings with ease",
      icon: RotateCcw,
      href: "/tools/text-reverser",
      color: "red",
      features: ["Character reversal", "Word reversal", "Line reversal"]
    },
    {
      name: "AI Content Humanizer",
      description: "Transform robotic AI-generated text into natural, human-like content",
      icon: Brain,
      href: "/check-content",
      color: "indigo",
      features: ["Style adjustment", "Tone modification", "Natural language"]
    },
    {
      name: "Grammar Checker",
      description: "Identify and fix grammar, spelling, and punctuation errors",
      icon: Edit3,
      href: "/tools/grammar-checker",
      color: "teal",
      features: ["Grammar checking", "Spell checking", "Style suggestions"]
    },
    {
      name: "Text Summarizer",
      description: "Generate concise summaries of long text while preserving key information",
      icon: Clock,
      href: "/tools/summarizer",
      color: "pink",
      features: ["Smart summarization", "Length control", "Key point extraction"]
    },
    {
      name: "Plagiarism Checker",
      description: "Detect copied content and ensure originality of your text",
      icon: Search,
      href: "/tools/plagiarism-checker",
      color: "yellow",
      features: ["Web search", "Similarity detection", "Source identification"]
    },
    {
      name: "Duplicate Remover",
      description: "Remove duplicate lines and clean up repetitive content",
      icon: Filter,
      href: "/tools/duplicate-remover",
      color: "cyan",
      features: ["Duplicate detection", "Case sensitivity", "Line comparison"]
    },
    {
      name: "AI Detection",
      description: "Check if text is AI-generated or human-written with advanced analysis",
      icon: Shield,
      href: "/check-content",
      color: "rose",
      features: ["AI detection", "Confidence scoring", "Detailed analysis"]
    },
    {
      name: "Tone Adjuster",
      description: "Convert text tone between formal, casual, polite, and direct styles",
      icon: Palette,
      href: "/tools/tone-adjuster",
      color: "emerald",
      features: ["Tone conversion", "Style adaptation", "Context awareness"]
    }
  ];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Professional Text Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive suite of text processing utilities designed for content creators, writers, and developers. 
          From basic counting to advanced AI analysis.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <a
              key={index}
              href={tool.href}
              className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {tool.description}
              </p>
              <ul className="space-y-1">
                {tool.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-xs text-gray-500 flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </a>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-xl mb-6 opacity-90">
          Choose any tool above and start processing your text with professional-grade utilities.
        </p>
        <a
          href="/check-content"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Try AI Content Detector
        </a>
      </div>
    </div>
  );
} 