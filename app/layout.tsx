import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'CNE Venezuela – Consejo Nacional Electoral',
  description: 'Portal oficial del Consejo Nacional Electoral de la República Bolivariana de Venezuela. Consulta resultados electorales, centros de votación y más.',
  keywords: ['CNE', 'Venezuela', 'elecciones', 'Consejo Nacional Electoral', 'resultados electorales'],
  authors: [{ name: 'CNE Venezuela' }],
  openGraph: {
    title: 'CNE Venezuela – Consejo Nacional Electoral',
    description: 'Portal oficial del Consejo Nacional Electoral',
    type: 'website',
    locale: 'es_VE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0A0E1A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#E5E7EB',
              border: '1px solid rgba(201,168,76,0.2)',
              fontFamily: 'DM Sans, sans-serif',
            },
            success: { iconTheme: { primary: '#C9A84C', secondary: '#111827' } },
          }}
        />
      </body>
    </html>
  )
}
