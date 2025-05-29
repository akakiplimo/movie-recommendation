'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Cast, Crew } from '@/types'
import { getImageUrl } from '@/lib/api/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { User } from 'lucide-react'

interface CastCrewProps {
  cast: Cast[]
  crew: Crew[]
}

export function CastCrew({ cast, crew }: CastCrewProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  // Get key crew members
  const director = crew.find((member) => member.job === 'Director')
  const writers = crew.filter((member) => 
    member.department === 'Writing' || member.job === 'Screenplay' || member.job === 'Writer'
  ).slice(0, 3)
  const producers = crew.filter((member) => 
    member.job === 'Producer' || member.job === 'Executive Producer'
  ).slice(0, 3)

  return (
    <Tabs defaultValue="cast" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cast">Cast ({cast.length})</TabsTrigger>
        <TabsTrigger value="crew">Crew ({crew.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="cast" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {cast.slice(0, 12).map((actor) => (
            <Card key={actor.id} className="overflow-hidden">
              <div className="relative aspect-[2/3] bg-muted">
                {imageErrors[`cast-${actor.id}`] ? (
                  <div className="flex h-full items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={getImageUrl(actor.profile_path, 'medium')}
                    alt={actor.name}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(`cast-${actor.id}`)}
                  />
                )}
              </div>
              <div className="p-3">
                <h4 className="line-clamp-1 text-sm font-medium">{actor.name}</h4>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {actor.character}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {cast.length > 12 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            And {cast.length - 12} more...
          </p>
        )}
      </TabsContent>

      <TabsContent value="crew" className="mt-6 space-y-6">
        {/* Director */}
        {director && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Director</h4>
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                {imageErrors[`crew-${director.id}`] ? (
                  <div className="flex h-full items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={getImageUrl(director.profile_path, 'small')}
                    alt={director.name}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(`crew-${director.id}`)}
                  />
                )}
              </div>
              <div>
                <p className="font-medium">{director.name}</p>
                <p className="text-sm text-muted-foreground">{director.job}</p>
              </div>
            </div>
          </div>
        )}

        {/* Writers */}
        {writers.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Writers</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {writers.map((writer) => (
                <div key={writer.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    {imageErrors[`crew-${writer.id}`] ? (
                      <div className="flex h-full items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ) : (
                      <Image
                        src={getImageUrl(writer.profile_path, 'small')}
                        alt={writer.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(`crew-${writer.id}`)}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{writer.name}</p>
                    <p className="text-xs text-muted-foreground">{writer.job}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Producers */}
        {producers.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Producers</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {producers.map((producer) => (
                <div key={producer.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    {imageErrors[`crew-${producer.id}`] ? (
                      <div className="flex h-full items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ) : (
                      <Image
                        src={getImageUrl(producer.profile_path, 'small')}
                        alt={producer.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(`crew-${producer.id}`)}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{producer.name}</p>
                    <p className="text-xs text-muted-foreground">{producer.job}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}