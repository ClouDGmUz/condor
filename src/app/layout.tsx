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
  title: 'Condor - Premium Motor Oils and Lubricants',
  description: 'Condor is Uzbekistan\'s leading manufacturer of high-quality motor oils, lubricants, and automotive fluids. Discover our premium products that meet international standards.',
  metadataBase: new URL('https://condoroil.uz'),
  openGraph: {
    title: 'Condor - Premium Motor Oils and Lubricants',
    description: 'Condor is Uzbekistan\'s leading manufacturer of high-quality motor oils, lubricants, and automotive fluids. Discover our premium products that meet international standards.',
    url: 'https://condoroil.uz',
    siteName: 'Condor',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Condor - Premium Motor Oils and Lubricants'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Condor - Premium Motor Oils and Lubricants',
    description: 'Discover premium motor oils and lubricants that meet international standards.',
    images: ['/twitter-image.jpg'],
    creator: '@condoroil',
    site: '@condoroil'
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  manifest: '/site.webmanifest',
  keywords: ['motor oil', 'lubricants', 'automotive fluids', 'antifreeze', 'brake fluid', 'Uzbekistan', 'Condor']
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
      <body className={`${inter.className} bg-light-primary dark:bg-dark-primary text-light-muted dark:text-dark-text min-h-screen`}>
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
