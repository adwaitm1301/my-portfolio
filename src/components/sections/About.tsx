import ScrollColorText from '@/components/shared/ScrollColorText'

const ABOUT_TEXT =
  "I build things at the intersection of AI and markets. I learn by doing, and I get frustrated when there's talk without action. I believe the best ideas come from collaboration, not isolation. I'm drawn to problems nobody's quite solved yet and the challenge of turning raw ideas into reality. If you're curious about how markets work, how AI changes the game, or just looking to build something meaningful, let's talk."

export default function About() {
  return (
    <section id="about" className="bg-surface px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:gap-20">
          <p className="shrink-0 font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
            About ME
          </p>
          <ScrollColorText
            text={ABOUT_TEXT}
            className="max-w-4xl font-display font-normal leading-[1.05] tracking-[-1px] text-[clamp(28px,4.5vw,60px)]"
          />
        </div>
      </div>
    </section>
  )
}
