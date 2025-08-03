import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for TextTools Pro - Learn how we protect your data and maintain your privacy while using our text processing tools.",
  keywords: ["privacy policy", "data protection", "text tools privacy", "user privacy", "data security"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy - TextTools Pro",
    description: "Privacy Policy for TextTools Pro - Learn how we protect your data and maintain your privacy while using our text processing tools.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              TextTools Pro is committed to protecting your privacy. We do not collect, store, or transmit your text content to our servers. All text processing happens locally in your browser.
            </p>
            <p className="text-gray-700 mb-4">
              We may collect anonymous usage statistics to improve our services, but this data does not include your actual text content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Information</h2>
            <p className="text-gray-700 mb-4">
              Any information we collect is used solely to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Improve our text processing tools</li>
              <li>Analyze website performance</li>
              <li>Provide better user experience</li>
              <li>Ensure service reliability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect any information we may collect. Your text content is processed entirely in your browser and is never sent to our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services for analytics and performance monitoring. These services do not have access to your text content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access any personal information we may have</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics collection</li>
              <li>Contact us with privacy concerns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700">
              Email: privacy@texttools-pro.com<br />
              Website: <a href="https://prk.vercel.app/" className="text-blue-600 hover:text-blue-800">https://prk.vercel.app/</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 