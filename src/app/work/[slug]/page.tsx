import Link from 'next/link'
import { caseStudies } from '@/data/case-studies'
import { projects } from '@/data/projects'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = caseStudies[slug]
  const project = projects.find((p) => p.id === slug)

  if (!caseStudy || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="mb-4 font-display text-4xl font-medium">
            Case Study Not Found
          </h1>
          <Link href="/#work" className="text-accent hover:text-white">
            ← Back to work
          </Link>
        </div>
      </div>
    )
  }

  const index = projects.findIndex((p) => p.id === slug)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-900 to-black px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#work"
            className="mb-8 inline-block font-display text-sm text-accent-red transition-colors hover:text-accent"
          >
            [ ← BACK TO WORK ]
          </Link>

          <p className="mb-4 font-display text-sm text-accent">
            [ {String(index + 1).padStart(2, '0')} ]
          </p>
          <h1 className="mb-6 font-display text-5xl font-normal tracking-tight md:text-8xl">
            {caseStudy.title}
          </h1>
          <p className="mb-4 font-serif text-xl italic text-accent-red md:text-2xl">
            {caseStudy.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              {caseStudy.category}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {caseStudy.status}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl space-y-20">
          {/* Impact Metrics */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {caseStudy.impact.map((item, idx) => (
              <div
                key={idx}
                className="border border-neutral-800 rounded-lg bg-black/50 p-4"
              >
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  {item.metric}
                </p>
                <p className="mt-2 font-display text-2xl font-normal text-accent">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Problem Section */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
              The Problem
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-normal">
                The Challenge
              </h2>
              <p className="leading-relaxed text-neutral-300">
                {caseStudy.problem}
              </p>
            </div>
          </div>

          {/* Solution Section */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
              The Solution
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-normal">
                How We Built It
              </h2>
              <p className="leading-relaxed text-neutral-300">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
              Key Features
            </p>
            <div className="space-y-3">
              {caseStudy.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border-l border-neutral-800 pl-4"
                >
                  <span className="shrink-0 pt-1 text-accent">✓</span>
                  <p className="text-neutral-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="border border-neutral-800 rounded-full px-4 py-2 text-sm font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
              Results & Impact
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-normal">
                What We Achieved
              </h2>
              <p className="leading-relaxed text-neutral-300">
                {caseStudy.results}
              </p>
            </div>
          </div>

          {/* Lessons Learned */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-neutral-400">
              Lessons Learned
            </p>
            <div className="space-y-3">
              {caseStudy.lessonsLearned.map((lesson, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="font-medium text-white">
                    {idx + 1}. {lesson}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-3 gap-4 border-t border-neutral-800 pt-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Timeline
              </p>
              <p className="mt-2 font-display text-lg font-medium">
                {caseStudy.timeline}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Role
              </p>
              <p className="mt-2 font-display text-lg font-medium">
                {caseStudy.role}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Status
              </p>
              <p className="mt-2 font-display text-lg font-medium text-accent">
                {caseStudy.status}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="border border-neutral-800 rounded-lg bg-black/50 p-6 md:p-10 text-center">
            <h3 className="mb-4 font-display text-2xl font-medium">
              Interested in working together?
            </h3>
            <p className="mb-8 text-neutral-400">
              Let's build something meaningful. I'm always excited to discuss new
              projects and collaborate with talented people.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="mailto:adwait.m.1301@gmail.com"
                className="bg-accent px-8 py-3 font-display font-semibold text-black transition-transform hover:scale-105 rounded"
              >
                Get in Touch
              </a>
              <a
                href="/#work"
                className="border-2 border-accent px-8 py-3 font-display font-semibold text-accent transition-colors hover:bg-accent hover:text-black rounded"
              >
                View More Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
