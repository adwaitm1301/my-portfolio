import type { Metadata } from 'next'
import Reveal from '@/components/shared/Reveal'
import CaseStudies from '@/components/sections/CaseStudies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'A deep dive into AntarYatra. The challenge, the solution, and what actually happened.',
}

export default function CaseStudiesPage() {
  return (
    <main>
      <CaseStudies />

      {/* CTA */}
      <section className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-4xl text-center border-t border-neutral-800 pt-12">
          <Reveal>
            <p className="mb-6 text-neutral-400">
              See a project that matches your needs?
            </p>
            <a
              href="https://calendly.com/adwait-m-1301"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent/90 text-black font-display font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              Let's Talk →
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
