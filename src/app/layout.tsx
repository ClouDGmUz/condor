import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from 'next/dynamic';
import { I18nProvider } from '../components/I18nProvider';
import TestModeBar from '../components/TestModeBar';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Condor - Ishonchli Hamkoringiz",
  description: "Condor biznesingiz ehtiyojlari uchun innovatsion yechimlar taqdim etadi.",
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          <TestModeBar />
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
