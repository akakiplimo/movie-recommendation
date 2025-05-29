import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MovieFlix - Discover Amazing Movies',
  description: 'Your ultimate destination for discovering and exploring movies from around the world.',
  keywords: 'movies, films, cinema, movie database, movie recommendations',
  authors: [{ name: 'MovieFlix Team' }],
  openGraph: {
    title: 'MovieFlix',
    description: 'Discover amazing movies from around the world',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}