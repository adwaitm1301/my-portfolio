import ScrollColorText from '@/components/shared/ScrollColorText'

const ABOUT_TEXT =
  "I build systems at the intersection of AI and markets. I learn through implementation and value execution over theory. I believe the most innovative ideas emerge through collaboration. I'm drawn to unsolved problems and the technical challenge of bringing complex ideas to production. If you're interested in discussing how markets work, how AI shapes engineering, or building meaningful systems, let's connect."

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
