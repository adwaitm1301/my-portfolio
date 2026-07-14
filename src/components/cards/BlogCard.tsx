import Link from 'next/link'
import { BlogPost } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={post.link} className="group block">
      <div className="mb-4 flex items-center justify-between text-sm text-neutral-400">
        <div>
          <p className="font-display font-medium text-white">{post.author}</p>
          <p className="text-xs">CS Student, BITS Pilani</p>
        </div>
        <p className="text-xs">{post.date}</p>
      </div>
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-display text-xl font-medium leading-snug transition-colors group-hover:text-accent md:text-2xl">
        {post.title}
      </h3>
    </Link>
  )
}
