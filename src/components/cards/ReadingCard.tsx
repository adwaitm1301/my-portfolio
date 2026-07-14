import { Reading } from '@/lib/types'

interface ReadingCardProps {
  reading: Reading
}

export default function ReadingCard({ reading }: ReadingCardProps) {
  return (
    <a
      href={reading.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col border border-neutral-800 bg-black p-6 transition-colors duration-300 hover:border-accent"
    >
      <div className="mb-6 flex items-start justify-between">
        <span className="font-display text-xs uppercase tracking-[0.2em] text-accent">
          [ {reading.category} ]
        </span>
        <span className="text-xs text-neutral-500">{reading.date}</span>
      </div>
      <h3 className="mb-1 font-display text-xl font-medium leading-snug transition-colors group-hover:text-accent">
        {reading.title}
      </h3>
      <p className="mb-4 font-serif text-sm italic text-neutral-500">
        {reading.author}
      </p>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-400">
        {reading.insight}
      </p>
      <span className="font-display text-sm text-accent-red transition-colors group-hover:text-accent">
        [ READ SOURCE ] ↗
      </span>
    </a>
  )
}
