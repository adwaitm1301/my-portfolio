'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const siteStructure = [
  {
    title: 'Home',
    href: '/',
    description: 'Hero, about snapshot, featured work',
  },
  {
    title: 'About',
    href: '/about',
    description: 'Full story, philosophy, journey',
  },
  {
    title: 'Work',
    href: '/work',
    description: 'All projects and case studies',
    children: [
      { title: 'Stock Backtester', href: '/work/stock-backtester' },
      { title: 'Music Genre Classifier', href: '/work/music-genre-classifier' },
      { title: 'AntarYatra', href: '/work/antaryatra' },
    ],
  },
  {
    title: 'Skills',
    href: '/skills',
    description: 'Technical expertise, tools, languages',
  },
  {
    title: 'Impact',
    href: '/impact',
    description: 'Metrics, achievements, learning',
  },
  {
    title: 'Case Studies',
    href: '/case-studies',
    description: 'Deep dives into selected projects',
  },
]

export default function SitemapContent() {
  return (
    <div className="mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-4xl font-normal tracking-[-0.06em] md:text-5xl">
          Sitemap
        </h1>
        <p className="mt-3 text-neutral-400">
          Full structure of the site. Jump to any section.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 space-y-8"
      >
        {siteStructure.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <Link
              href={section.href}
              className="group inline-flex items-center gap-2 text-xl font-display font-normal hover:text-accent transition-colors"
            >
              <span>{section.title}</span>
              <span className="text-neutral-600 group-hover:text-accent/60 transition-colors">
                →
              </span>
            </Link>
            {section.description && (
              <p className="text-sm text-neutral-500">{section.description}</p>
            )}

            {section.children && (
              <div className="ml-4 space-y-2 border-l border-neutral-800 pl-4">
                {section.children.map((child, childIdx) => (
                  <Link
                    key={childIdx}
                    href={child.href}
                    className="block text-sm text-neutral-400 hover:text-accent transition-colors"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 border-t border-neutral-800 pt-8"
      >
        <p className="text-xs text-neutral-600">
          XML sitemap available at{' '}
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            /sitemap.xml
          </a>{' '}
          for search engines.
        </p>
      </motion.div>
    </div>
  )
}
