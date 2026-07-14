import { projects } from '@/data/projects'
import ProjectCard from '@/components/cards/ProjectCard'
import Reveal from '@/components/shared/Reveal'

export default function FeaturedWork() {
  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-16 text-center font-display text-5xl font-normal tracking-[-0.04em] text-neutral-200 md:text-7xl">
            Featured Work
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 2) * 0.15}
              className={index % 2 === 1 ? 'md:mt-24' : ''}
            >
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
