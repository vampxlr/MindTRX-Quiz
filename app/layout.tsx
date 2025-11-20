import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MINDTRX - Inner Mind Integration Inventory',
  description: 'Discover your relationship with your inner mind through the MINDTRX IMII v2 assessment.',
  keywords: ['mindfulness', 'inner mind', 'self-assessment', 'personal growth', 'consciousness'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('mindtrx-theme') || 'bright';
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <div className="watermark">MINDTRX</div>
            <Header />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

