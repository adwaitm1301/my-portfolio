import type { Metadata } from 'next'
import Script from 'next/script'
import { Funnel_Display, Playfair_Display, Rethink_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'
import { PixelPattern } from '@/components/shared/PixelPattern'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WorldClock from '@/components/shared/WorldClock'
import CursorPet from '@/components/shared/CursorPet'
import PagePreloader from '@/components/shared/PagePreloader'
import CommandPalette from '@/components/shared/CommandPalette'
import EasterEggs from '@/components/shared/EasterEggs'

const funnel = Funnel_Display({
  subsets: ['latin'],
  variable: '--font-funnel',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
  weight: ['400', '500', '600'],
})

const rethink = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink',
  weight: ['400', '500', '600', '700'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Adwait M. | Building at the intersection of AI and Markets',
    template: '%s | Adwait M.',
  },
  description:
    'Undergrad @ BITS Pilani. I build ML systems, trading tools, and full-stack products like a stock backtester, music genre classifier, and AntarYatra.',
  keywords: [
    'Adwait M',
    'machine learning',
    'fintech',
    'stock backtesting',
    'BITS Pilani',
    'full-stack developer',
    'AI portfolio',
  ],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Adwait M.',
    title: 'Adwait M. | Building at the intersection of AI and Markets',
    description:
      'Second-year CS student at BITS Pilani. I build ML systems, trading tools, and full-stack products.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adwait M. | Building at the intersection of AI and Markets',
    description:
      'Second-year CS student at BITS Pilani. I build ML systems, trading tools, and full-stack products.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${funnel.variable} ${playfair.variable} ${rethink.variable} bg-black text-white antialiased`}
      >
        <PagePreloader />
        <PixelPattern />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <div className="hidden md:block fixed right-4 z-50" style={{ top: 'calc(50% - 72px)' }}>
          <WorldClock
            hour12={false}
            showMinutes={true}
            showSeconds={true}
            showLabel={true}
            separator="  ·  "
            color="rgba(255,255,255,0.45)"
            labelColor="rgba(255,255,255,0.2)"
            className="font-display font-normal text-xl tracking-[-0.02em]"
            style={{ lineHeight: '1em' }}
          />
        </div>
        <CursorPet />
        <CommandPalette />
        <EasterEggs />
        <Analytics />
        <SpeedInsights />

        {/* Easter eggs unlocked! Try: Ctrl+Shift+M (matrix mode), Ctrl+Shift+S (stock crash), type "cheat", visit at midnight, or find more... */}
      </body>
    </html>
  )
}
