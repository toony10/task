import type { AreaProject } from '@/types/region.types'

export async function fetchAreaProjects(accessToken: string): Promise<AreaProject[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/project-statistics/area-project`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ accessToken }`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch area projects: ${response.status}`)
  }

  return response.json()
}
