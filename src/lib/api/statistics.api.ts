import type {
  GeneralStatisticsResponse,
  ProjectExecutionSummaryResponse,
  ProjectStatusResponse,
  ProjectTypeResponse,
  QualityControlResponse,
  SectorProject,
} from '@/types/statistics.types'

function buildUrl(path: string, regionId?: string | null) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`)

  if (regionId) {
    url.searchParams.set('regionId', regionId)
  }

  return url.toString()
}

async function fetchWithAuth<T>(url: string, accessToken: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}

export async function fetchProjectExecutionSummary(
  accessToken: string,
  regionId?: string | null
): Promise<ProjectExecutionSummaryResponse> {
  return fetchWithAuth(
    buildUrl('/financial-statistics/project-execution-summary', regionId),
    accessToken
  )
}

export async function fetchGeneralStatistics(
  accessToken: string,
  regionId?: string | null
): Promise<GeneralStatisticsResponse> {
  return fetchWithAuth(
    buildUrl('/project-statistics/general', regionId),
    accessToken
  )
}

export async function fetchSectorProjects(
  accessToken: string,
  regionId?: string | null
): Promise<SectorProject[]> {
  return fetchWithAuth(
    buildUrl('/project-statistics/sector-projects', regionId),
    accessToken
  )
}

export async function fetchProjectStatusCounts(
  accessToken: string,
  regionId?: string | null
): Promise<ProjectStatusResponse> {
  return fetchWithAuth(
    buildUrl('/project-statistics/project-status-counts', regionId),
    accessToken
  )
}

export async function fetchProjectTypeCounts(
  accessToken: string,
  regionId?: string | null
): Promise<ProjectTypeResponse> {
  return fetchWithAuth(
    buildUrl('/project-statistics/count-by-type', regionId),
    accessToken
  )
}

export async function fetchQualityControlStats(
  accessToken: string,
  regionId?: string | null
): Promise<QualityControlResponse> {
  return fetchWithAuth(
    buildUrl('/project-statistics/qc-technical', regionId),
    accessToken
  )
}
