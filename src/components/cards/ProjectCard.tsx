import Link from 'next/link'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={project.link} className="group block">
      <p className="mb-3 font-display text-sm text-accent">
        [ {String(index + 1).padStart(2, '0')} ]
      </p>
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 inline-block font-display text-lg font-medium underline underline-offset-4 transition-colors group-hover:text-accent md:text-xl">
        {project.title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
        {project.description}
      </p>
    </Link>
  )
}
