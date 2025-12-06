// Proxied through Next.js rewrites (see next.config.js)
const BASE_URL = '/api'

interface RequestOptions {
  params?: Record<string, string | undefined>
}

export async function apiGet<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin)

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value)
      }
    })
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

