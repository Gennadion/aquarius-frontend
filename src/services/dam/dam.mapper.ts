import { DamEntity } from './dam.entity'
import { DamModel } from './dam.model'

export function mapDamEntityToModel(entity: DamEntity): DamModel {
  return {
    dataDate: new Date(entity.data_date),
    fetchedAt: new Date(entity.fetched_at),
    dam: {
      name: entity.dam.name,
      nameGreek: entity.dam.name_greek,
      capacityMcm: entity.dam.capacity_mcm,
      storageMcm: entity.dam.storage_mcm,
      percentage: entity.dam.percentage,
      riskLevel: entity.dam.risk_level,
      yearOfConstruction: entity.dam.year_of_construction,
      height: entity.dam.height,
      lat: entity.dam.lat,
      lng: entity.dam.lng,
      imageUrl: entity.dam.image_url,
      wikipediaUrl: entity.dam.wikipedia_url,
    },
    comparison: {
      lastYearPercentage: entity.comparison.last_year_percentage,
      delta: entity.comparison.delta,
    },
    narrative: entity.narrative,
  }
}

