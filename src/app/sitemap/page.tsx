import SitemapContent from '@/components/sections/SitemapContent'

export const metadata = {
  title: 'Sitemap | Adwait M.',
  description: 'Navigate the full structure of the portfolio.',
}

export default function Sitemap() {
  return (
    <main className="min-h-screen px-5 py-20 md:px-10">
      <SitemapContent />
    </main>
  )
}
