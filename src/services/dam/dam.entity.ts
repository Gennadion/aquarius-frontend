export interface DamEntity {
  data_date: string
  fetched_at: string
  dam: {
    name: string
    name_greek: string
    capacity_mcm: number
    storage_mcm: number
    percentage: number
    risk_level: string
    year_of_construction: number
    height: number
    lat: number
    lng: number
    image_url: string
    wikipedia_url: string
  }
  comparison: {
    last_year_percentage: number
    delta: number
  }
  narrative: string
}

