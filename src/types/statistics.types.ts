export type ProjectExecutionSummaryResponse = {
  totalProjects: number
  finishedProjects: number
  achievement95Projects: number
  achievement25Projects: number
  finishedPercentage: number
  achievement95Percentage: number
  achievement25Percentage: number
}

export type GeneralStatisticsResponse = {
  projectsCount: number
  totalBudget: number
  paidAmount: number
  inProgressAmount: number
  contractualBudget: number
  remaining: number
}

export type SectorProject = {
  id: string
  regionCode: string | null
  title: string
  count: number
}

export type ProjectStatusKey = 'Good' | 'Finished' | 'Critical'

export type ProjectStatusResponse = {
  values: {
    key: ProjectStatusKey
    value: number
  }[]
}

export type ProjectTypeKey =
  | 'Started'
  | 'Awarded'
  | 'Signed'
  | 'ReviewCommittee'
  | 'Accreditation'
  | 'Finished'
  | 'Tender'

export type ProjectTypeResponse = {
  values: {
    key: ProjectTypeKey
    value: number
  }[]
}

export type QualityControlResponse = {
  category: string
  statementsCount: number
}[]
