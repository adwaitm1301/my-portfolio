import Reveal from '@/components/shared/Reveal'

const techCategories = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'AI & ML',
    items: ['TensorFlow', 'PyTorch', 'Hugging Face', 'Librosa', 'Scikit-learn'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'MongoDB', 'Redis', 'PostgreSQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Next.js'],
  },
  {
    category: 'DevOps & Deployment',
    items: ['Docker', 'Vercel', 'Railway', 'GitHub Actions', 'AWS'],
  },
  {
    category: 'Finance & Data',
    items: ['NumPy', 'Pandas', 'Plotly', 'Alpaca API', 'Yahoo Finance'],
  },
]

export default function TechStack() {
  return (
    <section className="px-5 py-24 bg-neutral-950/60 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            The Tools I Use
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Not just buzzwords. These are production tools I actually use.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {techCategories.map((category, idx) => (
            <Reveal key={category.category} delay={idx * 0.08}>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-medium text-white">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-2 bg-black border border-neutral-800 rounded-lg text-sm text-neutral-300 hover:border-accent hover:text-accent transition-colors"
                    >
                      {item}
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
