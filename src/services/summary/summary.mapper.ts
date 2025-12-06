import { SummaryEntity } from './summary.entity'
import { SummaryModel } from './summary.model'

export function mapSummaryEntityToModel(entity: SummaryEntity): SummaryModel {
  return {
    dataDate: new Date(entity.data_date),
    fetchedAt: new Date(entity.fetched_at),
    totalPercentage: entity.total_percentage,
    lastYearPercentage: entity.last_year_percentage,
    delta: entity.delta,
    totalStorageMcm: entity.total_storage_mcm,
    totalCapacityMcm: entity.total_capacity_mcm,
  }
}


