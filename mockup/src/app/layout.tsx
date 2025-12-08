import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Factset Audit POC - Financial Document Viewer',
  description: 'Interactive financial document viewer with AI-powered Q&A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
