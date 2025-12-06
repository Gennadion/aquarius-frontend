export interface DamModel {
  name: string
  dataDate: Date
  fetchedAt: Date
  percentage: number
  lastYearPercentage?: number
  delta?: number
  storageMcm: number
  capacityMcm: number
}

