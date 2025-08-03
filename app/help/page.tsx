import type { Metadata } from "next";
import { HelpCircle, Search, FileText, Brain, Shield, Zap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help and support for TextTools Pro. Find answers to frequently asked questions, tutorials, and troubleshooting guides.",
  keywords: ["help center", "support", "FAQ", "tutorials", "text tools help", "user guide"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Help Center - TextTools Pro",
    description: "Get help and support for TextTools Pro. Find answers to frequently asked questions, tutorials, and troubleshooting guides.",
  },
};

export default function Help() {
  const faqs = [
    {
      question: "How accurate is the AI content detector?",
      answer: "Our AI content detector uses advanced machine learning algorithms and achieves high accuracy rates. However, results should be used as guidance rather than absolute certainty, as AI detection technology continues to evolve."
    },
    {
      question: "Is my text content stored on your servers?",
      answer: "No, we prioritize your privacy. All text processing happens locally in your browser and is never stored on our servers. Your content remains completely private and secure."
    },
    {
      question: "Can I use TextTools Pro for commercial purposes?",
      answer: "Yes, TextTools Pro is available for both personal and commercial use. Please review our Terms and Conditions for detailed usage guidelines and any specific restrictions."
    },
    {
      question: "What browsers are supported?",
      answer: "TextTools Pro works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for optimal performance."
    },
    {
      question: "How do I get the best results from the grammar checker?",
      answer: "For best results, ensure your text is clear and complete. The grammar checker works best with well-structured sentences and will provide more accurate suggestions for properly formatted text."
    },
    {
      question: "Can I process large documents?",
      answer: "Yes, our tools can handle large documents, but for optimal performance, we recommend processing text in chunks of 10,000 words or less for the best user experience."
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with TextTools Pro",
      description: "Learn the basics of using our text processing tools",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Using the AI Content Detector",
      description: "Step-by-step guide to detecting AI-generated content",
      icon: Brain,
      color: "purple"
    },
    {
      title: "Privacy and Security",
      description: "Understanding how we protect your data",
      icon: Shield,
      color: "green"
    },
    {
      title: "Advanced Features",
      description: "Master the advanced capabilities of our tools",
      icon: Zap,
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Help Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to your questions, learn how to use our tools effectively, and get the support you need.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Search for Help</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? Search our help articles and tutorials.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tutorials.map((tutorial, index) => {
          const IconComponent = tutorial.icon;
          return (
            <a
              key={index}
              href="#"
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[tutorial.color as keyof typeof colorClasses]}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 text-sm">{tutorial.description}</p>
            </a>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <div className="text-center mb-8">
          <HelpCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find quick answers to common questions about TextTools Pro
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <Users className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-4">Still Need Help?</h3>
        <p className="text-xl mb-6 opacity-90">
          Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
          <a
            href="mailto:support@texttools-pro.com"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
} 