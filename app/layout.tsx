import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TextTools Pro - Professional Text Utilities & AI Content Detector",
    template: "%s | TextTools Pro"
  },
  description: "Professional text utilities for content creators, writers, and developers. AI content detection, grammar checking, plagiarism detection, and intelligent text processing tools.",
  keywords: [
    "text tools",
    "AI content detector",
    "grammar checker",
    "plagiarism checker",
    "text utilities",
    "content analysis",
    "writing tools",
    "text processing",
    "character counter",
    "case converter",
    "text sorter",
    "whitespace remover",
    "text summarizer",
    "AI detection",
    "content humanizer"
  ],
  authors: [{ name: "ParmarRohitK" }],
  creator: "ParmarRohitK",
  publisher: "TextTools Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://texttools-pro.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://texttools-pro.vercel.app',
    siteName: 'TextTools Pro',
    title: 'TextTools Pro - Professional Text Utilities & AI Content Detector',
    description: 'Professional text utilities for content creators, writers, and developers. AI content detection, grammar checking, plagiarism detection, and intelligent text processing tools.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TextTools Pro - Professional Text Utilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextTools Pro - Professional Text Utilities & AI Content Detector',
    description: 'Professional text utilities for content creators, writers, and developers. AI content detection, grammar checking, plagiarism detection, and intelligent text processing tools.',
    images: ['/og-image.png'],
    creator: '@ParmarRohitK',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
