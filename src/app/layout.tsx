import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import React from 'react'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Condor',
  description: 'A modern business website built with Next.js',
  metadataBase: new URL('https://condoroil.uz'),
  openGraph: {
    title: 'Condor',
    description: 'A modern business website built with Next.js',
    url: 'https://condoroil.uz',
    siteName: 'Condor',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Condor',
    description: 'A modern business website built with Next.js',
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    // Add more icon sizes if needed
    // apple: '/apple-icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current path
  const isAdminRoute = React.isValidElement(children) && children.props?.childProp?.segment === 'admin'

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {isAdminRoute ? (
              // Admin layout without Navbar and Footer
              <div>{children}</div>
            ) : (
              // Regular layout with Navbar and Footer
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow p-4 md:p-8">{children}</main> {/* Added padding */}
                <Footer />
              </div>
            )}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
