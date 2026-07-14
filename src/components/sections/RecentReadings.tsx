import { readings } from '@/data/readings'
import ReadingCard from '@/components/cards/ReadingCard'
import Reveal from '@/components/shared/Reveal'

export default function RecentReadings() {
  return (
    <section id="readings" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-16 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Recent{' '}
            <span className="font-serif italic">/ Readings</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {readings.map((reading, index) => (
            <Reveal key={reading.id} delay={index * 0.12}>
              <ReadingCard reading={reading} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
