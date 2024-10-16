import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from 'next/dynamic';
import { I18nProvider } from '../components/I18nProvider';

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
  title: "Condor - Your Trusted Partner",
  description: "Condor provides innovative solutions for your business needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}