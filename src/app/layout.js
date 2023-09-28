import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Papyrus',
  description: 'Copy data between MySQL and MongoDB',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 h-screen w-screen select-none`}>
          <Header /> 
          {children}
          <Footer />
      </body>
    </html>
  )
}
