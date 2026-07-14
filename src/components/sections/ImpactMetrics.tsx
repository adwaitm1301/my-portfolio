import Reveal from '@/components/shared/Reveal'

const metrics = [
  {
    number: '3',
    label: 'Products Built',
    context: 'Stock backtester, music genre classifier, and AntarYatra. All built end-to-end, and all still evolving',
  },
  {
    number: '94%',
    label: 'Model Test Accuracy',
    context: 'Music genre classifier, measured on audio it never saw during training',
  },
  {
    number: '12+',
    label: 'Languages Supported',
    context: "AntarYatra's AI analyzes journals across Indian languages including Hindi, Tamil, and Bengali",
  },
  {
    number: '$0',
    label: 'Cost to Users',
    context: 'Free, accessible tools in spaces where commercial platforms charge thousands per month',
  },
  {
    number: '100%',
    label: 'Built Solo',
    context: 'Architecture, ML, frontend, backend, deployment. Every layer of every project',
  },
  {
    number: '10',
    label: 'Genres Classified',
    context: 'The classifier tells metal from jazz from classical using learned audio patterns, not hand-written rules',
  },
]

export default function ImpactMetrics() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            By The Numbers
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Impact measured. Not promises, real outcomes.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <Reveal key={metric.label} delay={idx * 0.06}>
              <div className="group relative border border-neutral-800 rounded-lg p-6 hover:border-accent/50 transition-colors bg-black/50 hover:bg-black/70">
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-accent/5 rounded-lg transition-all pointer-events-none" />

                <div className="relative">
                  <p className="font-display text-4xl font-normal text-accent mb-2">
                    {metric.number}
                  </p>
                  <h3 className="font-display text-lg font-medium text-white mb-3">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {metric.context}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Context */}
        <Reveal delay={0.4} className="mt-16">
          <div className="border-t border-neutral-800 pt-12">
            <p className="font-serif italic text-lg text-neutral-300 mb-4">
              No inflated numbers here. These are honest numbers from projects I am actively building and improving.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
