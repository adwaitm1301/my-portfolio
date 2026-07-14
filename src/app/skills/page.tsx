import type { Metadata } from 'next'
import Reveal from '@/components/shared/Reveal'
import SkillRadar from '@/components/sections/SkillRadar'
import TechStack from '@/components/sections/TechStack'
import Expertise from '@/components/sections/Expertise'

export const metadata: Metadata = {
  title: 'Skills & Expertise',
  description:
    'ML, FinTech systems, and full-stack development. An honest map of what I build with, from daily drivers to areas I am actively leveling up.',
}

export default function SkillsPage() {
  return (
    <main>
      <Expertise />

      {/* Skill Radar */}
      <SkillRadar />

      {/* Tech Stack */}
      <TechStack />

      {/* CTA */}
      <section className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="mb-6 text-neutral-400">
              Looking to work together? Let's discuss your project.
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
