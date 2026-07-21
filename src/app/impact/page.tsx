import type { Metadata } from 'next'
import Reveal from '@/components/shared/Reveal'
import ImpactMetrics from '@/components/sections/ImpactMetrics'

export const metadata: Metadata = {
  title: 'Impact & Proof',
  description:
    'Verifiable outcomes from shipped products: a stock backtester, a 94%-accuracy music genre classifier, and AntarYatra, plus live GitHub activity.',
}

export default function ImpactPage() {
  return (
    <main>
      <ImpactMetrics />

      {/* CTA */}
      <section className="px-5 pb-24 pt-0 md:px-10 md:pb-36">
        <div className="mx-auto max-w-4xl text-center border-t border-neutral-800 pt-12">
          <Reveal>
            <p className="mb-6 text-neutral-400">
              Want to create impact like this together?
            </p>
            <a
              href="https://calendly.com/adwait-m-1301"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent/90 text-black font-display font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              Schedule a Call →
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
