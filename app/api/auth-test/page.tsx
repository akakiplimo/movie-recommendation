'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function AuthTestPage() {
  const { data: session, status } = useSession()
  const [providers, setProviders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Test if NextAuth endpoints are accessible
    fetch('/api/auth/providers')
      .then(res => res.json())
      .then(data => setProviders(data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Session Status:</h2>
          <pre className="bg-secondary p-4 rounded">
            {JSON.stringify({ status, session }, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="font-semibold">Providers:</h2>
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <pre className="bg-secondary p-4 rounded">
              {JSON.stringify(providers, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}