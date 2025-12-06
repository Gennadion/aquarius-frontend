import { apiGet } from '../api-client'
import { SummaryEntity } from './summary.entity'
import { SummaryModel } from './summary.model'
import { mapSummaryEntityToModel } from './summary.mapper'

export interface GetSummaryParams {
  targetDate?: string // DD.MM.YYYY format
}

export async function getSummary(params?: GetSummaryParams): Promise<SummaryModel> {
  const entity = await apiGet<SummaryEntity>('/summary', {
    params: {
      target_date: params?.targetDate,
    },
  })

  return mapSummaryEntityToModel(entity)
}


