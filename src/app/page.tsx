import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import FeaturedWork from '@/components/sections/FeaturedWork'
import CaseStudiesPreview from '@/components/sections/CaseStudiesPreview'
import Philosophy from '@/components/sections/Philosophy'
import FAQ from '@/components/sections/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      <CaseStudiesPreview />
      <Philosophy />
      <FAQ />

      {/* Compact CTA Footer */}
      <section className="px-5 py-20 md:px-10 md:py-28 border-t border-neutral-800">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
                Ready to build something?
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Let's talk about your project, idea, or opportunity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/adwait-m-1301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent/90 text-black font-display font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
              >
                Schedule a Call →
              </a>
              <a
                href="mailto:adwait.m.1301@gmail.com"
                className="inline-block border border-neutral-600 hover:border-accent text-neutral-300 hover:text-accent font-display font-semibold px-8 py-3 rounded-lg transition-all"
              >
                Email Me
              </a>
            </div>

            <div className="pt-8 border-t border-neutral-800">
              <p className="text-sm text-neutral-500 mb-4">
                Want to learn more?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/skills" className="text-accent hover:underline text-sm">
                  Skills
                </a>
                <a href="/impact" className="text-accent hover:underline text-sm">
                  Impact
                </a>
                <a href="/case-studies" className="text-accent hover:underline text-sm">
                  Case Studies
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
