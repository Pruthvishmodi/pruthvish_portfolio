import { Geist, Merriweather, IBM_Plex_Sans } from 'next/font/google'
import { ThemeProvider } from '@/providers/Theme'
import { InitTheme } from '@/providers/Theme/InitTheme'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-merriweather',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibmPlexSans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${geist.variable} ${merriweather.variable} ${ibmPlexSans.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {/* Load Material Symbols for portfolio stack icons */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {/* Devicon – colored technology brand icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css" />
      </head>
      <body>
        <ThemeProvider>
          {/* Note: Header & Footer are intentionally omitted here to build a clean portfolio container */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
