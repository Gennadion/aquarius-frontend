export interface DamModel {
  dataDate: Date
  fetchedAt: Date
  dam: {
    name: string
    nameGreek: string
    capacityMcm: number
    storageMcm: number
    percentage: number
    riskLevel: string
    yearOfConstruction: number
    height: number
    lat: number
    lng: number
    imageUrl: string
    wikipediaUrl: string
  }
  comparison: {
    lastYearPercentage: number
    delta: number
  }
  narrative: string
}

