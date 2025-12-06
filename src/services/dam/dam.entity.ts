export interface DamEntity {
  name: string
  data_date: string
  fetched_at: string
  percentage: number
  last_year_percentage?: number
  delta?: number
  storage_mcm: number
  capacity_mcm: number
}

