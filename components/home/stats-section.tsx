import { Film, Star, Users, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Movies',
    value: '100K+',
    description: 'In our database',
    icon: Film,
  },
  {
    name: 'Ratings',
    value: '4.8',
    description: 'Average user rating',
    icon: Star,
  },
  {
    name: 'Users',
    value: '1M+',
    description: 'Active movie lovers',
    icon: Users,
  },
  {
    name: 'Daily Updates',
    value: '1000+',
    description: 'New movies added',
    icon: TrendingUp,
  },
]

export function StatsSection() {
  return (
    <section className="border-y bg-card/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="text-center">
                <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm font-medium">{stat.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}