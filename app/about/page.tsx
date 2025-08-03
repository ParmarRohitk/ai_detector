import type { Metadata } from "next";
import { FileText, Brain, Shield, Zap, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about TextTools Pro - Professional text utilities for content creators, writers, and developers. Discover our mission and the team behind the platform.",
  keywords: ["about us", "text tools", "content creators", "writers", "developers", "AI tools", "text processing"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us - TextTools Pro",
    description: "Learn about TextTools Pro - Professional text utilities for content creators, writers, and developers.",
  },
};

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About TextTools Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional text utilities designed for content creators, writers, and developers who demand excellence in their work.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          At TextTools Pro, we believe that great content starts with great tools. Our mission is to provide professional-grade text processing utilities that help creators, writers, and developers work more efficiently and produce higher quality content.
        </p>
        <p className="text-lg text-gray-700">
          We&apos;re committed to privacy, performance, and precision - ensuring that your text processing needs are met with the highest standards of quality and security.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
          <p className="text-gray-600">
            Process text instantly with our optimized algorithms. No waiting, no delays - just immediate results.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy First</h3>
          <p className="text-gray-600">
            Your data stays private. All processing happens locally in your browser for maximum security.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Powered</h3>
          <p className="text-gray-600">
            Advanced AI detection and content analysis for the modern content creator.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Tools</h3>
          <p className="text-gray-600">
            Built for professionals with grammar checking, plagiarism detection, and advanced analysis.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">User Focused</h3>
          <p className="text-gray-600">
            Designed with users in mind - intuitive interfaces that make text processing effortless.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
          <p className="text-gray-600">
            Available worldwide, supporting multiple languages and content types.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">PR</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ParmarRohitK</h3>
            <p className="text-gray-600 mb-4">Founder & Lead Developer</p>
            <p className="text-gray-700">
              Passionate about creating tools that make content creation easier and more efficient. 
              Committed to privacy and user experience.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">AI</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Technology</h3>
            <p className="text-gray-600 mb-4">Advanced AI Systems</p>
            <p className="text-gray-700">
              State-of-the-art AI technology powering our content detection and analysis tools, 
              ensuring accurate and reliable results.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
        <p className="text-xl mb-6 opacity-90">
          Have questions or suggestions? We&apos;d love to hear from you.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
} 