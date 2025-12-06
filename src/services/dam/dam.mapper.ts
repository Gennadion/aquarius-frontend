import { DamEntity } from './dam.entity'
import { DamModel } from './dam.model'

export function mapDamEntityToModel(entity: DamEntity): DamModel {
  return {
    name: entity.name,
    dataDate: new Date(entity.data_date),
    fetchedAt: new Date(entity.fetched_at),
    percentage: entity.percentage,
    lastYearPercentage: entity.last_year_percentage,
    delta: entity.delta,
    storageMcm: entity.storage_mcm,
    capacityMcm: entity.capacity_mcm,
  }
}

