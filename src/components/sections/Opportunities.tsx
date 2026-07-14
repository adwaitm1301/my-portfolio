import Reveal from '@/components/shared/Reveal'

const opportunities = [
  {
    type: 'Co-Founder Roles',
    description:
      'Early-stage startups in AI, FinTech, or HealthTech. I think long term, move fast, and actually ship. Looking for problems worth solving, not just ideas.',
  },
  {
    type: 'Technical Consulting',
    description:
      'Help teams architect ML systems, design trading platforms, or scale products. I break down complex problems and turn them into executable plans.',
  },
  {
    type: 'Focused Projects',
    description:
      '3-6 month engagements building specific systems. Stock backtester, Music classifier, AntarYatra. I do deep work on hard problems.',
  },
  {
    type: 'Partnerships',
    description:
      'Collaborating with other builders, researchers, or teams that share the belief that technology should solve real human problems.',
  },
]

const bestFitFor = [
  'Early-stage startups that move fast',
  'Technical challenges that require deep thinking',
  'Product-focused teams that care about outcomes',
  'Problems at the intersection of AI, finance, or wellness',
  'People who value shipping over perfection',
  'Teams building for scale from day one',
]

export default function Opportunities() {
  return (
    <section className="px-5 py-24 bg-neutral-950 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            What's Next
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            I'm actively looking for the right opportunity. Here's what excites me.
          </p>
        </Reveal>

        {/* Opportunities */}
        <div className="mb-20 space-y-6">
          {opportunities.map((opp, idx) => (
            <Reveal key={opp.type} delay={idx * 0.08}>
              <div className="border-l-2 border-accent pl-6">
                <h3 className="font-display text-2xl font-medium mb-3">
                  {opp.type}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {opp.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Best Fit For */}
        <Reveal delay={0.4}>
          <div className="border border-neutral-800 rounded-lg p-8 bg-black/50">
            <h3 className="font-display text-2xl font-medium mb-6">
              I'm Best Fit For
            </h3>
            <ul className="space-y-3">
              {bestFitFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-neutral-300"
                >
                  <span className="text-accent mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.5} className="mt-12">
          <div className="text-center">
            <p className="text-neutral-400 mb-6">
              Ready to build something great together?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:adwait.m.1301@gmail.com?subject=Let's%20work%20together"
                className="inline-block bg-accent hover:bg-accent/90 px-8 py-3 font-display font-semibold text-black rounded-lg transition-all hover:scale-105"
              >
                Email Me →
              </a>
              <a
                href="/#availability"
                className="inline-block bg-neutral-800 hover:bg-neutral-700 px-8 py-3 font-display font-semibold text-white rounded-lg transition-all hover:scale-105"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
