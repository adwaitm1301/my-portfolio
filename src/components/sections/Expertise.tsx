import Reveal from '@/components/shared/Reveal'

const expertiseAreas = [
  {
    title: 'AI & Machine Learning',
    description:
      'I build neural networks that actually learn. From music genre classification to emotion detection in text, I understand how to extract meaning from data. Training pipelines, data augmentation, evaluation, deployment. I\'ve taken models from notebook to production, not just tutorials.',
    focus: ['Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision', 'Model Optimization'],
  },
  {
    title: 'Trading & FinTech Systems',
    description:
      'I think in terms of market mechanics. I built a backtesting engine so traders can validate strategies before risking real money. I understand quantitative analysis, risk management, market microstructure, and how small errors compound into catastrophic losses. Numbers need to be right.',
    focus: ['Quantitative Analysis', 'Backtesting', 'Risk Management', 'Market Data', 'Algorithmic Trading'],
  },
  {
    title: 'Full-Stack Product Development',
    description:
      'I ship products end-to-end. AntarYatra went from idea to a live, deployed platform with real users. I handle architecture decisions, performance trade-offs, and actually think about user experience. React to databases to deployment, I know the whole chain.',
    focus: ['System Design', 'Performance', 'Scalability', 'DevOps', 'User Experience'],
  },
]

export default function Expertise() {
  return (
    <section id="expertise" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            What I Actually Do
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Not a service menu. This is what I build.
          </p>
        </Reveal>

        <div className="space-y-16">
          {expertiseAreas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.1}>
              <div className="border-l-2 border-accent pl-6">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-sm font-bold text-accent uppercase tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-3xl font-normal">
                    {area.title}
                  </h3>
                </div>
                <p className="mb-6 leading-relaxed text-neutral-300">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.focus.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium text-neutral-400 bg-neutral-900/50 px-3 py-1 rounded-full border border-neutral-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
