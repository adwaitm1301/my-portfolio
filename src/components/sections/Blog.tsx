import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import BlogCard from '@/components/cards/BlogCard'
import Reveal from '@/components/shared/Reveal'

export default function Blog() {
  // Duplicate the list to create a seamless infinite ticker, like the live site
  const tickerPosts = [...blogPosts, ...blogPosts, ...blogPosts]

  return (
    <section id="blog" className="overflow-hidden bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="mb-16 flex items-end justify-between">
            <h2 className="font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
              Latest <span className="font-serif italic">/ Blogs</span>
            </h2>
            <Link
              href="/blog"
              className="hidden font-display text-sm text-accent transition-colors hover:text-accent/80 md:block"
            >
              [ ALL ARTICLES ] ↗
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="group/ticker relative">
        <div className="blog-ticker flex w-max gap-8 group-hover/ticker:[animation-play-state:paused]">
          {tickerPosts.map((post, i) => (
            <div key={`${post.id}-${i}`} className="w-[320px] shrink-0 md:w-[420px]">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
