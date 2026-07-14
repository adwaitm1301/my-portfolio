import { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-colors group">
      <p className="text-accent-red font-bold mb-3 text-lg">
        {String(index + 1).padStart(3, '0')}
      </p>
      <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-green transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-400">
        {service.description}
      </p>
    </div>
  )
}
