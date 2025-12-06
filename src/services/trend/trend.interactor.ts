import { apiGet } from '../api-client'
import { TrendEntity } from './trend.entity'
import { TrendModel } from './trend.model'
import { mapTrendEntityToModel } from './trend.mapper'

export interface GetTrendParams {
  startDate: string // DD.MM.YYYY format
  endDate: string // DD.MM.YYYY format
}

export async function getTrend(params: GetTrendParams): Promise<TrendModel> {
  const entity = await apiGet<TrendEntity>('/trend', {
    params: {
      start_date: params.startDate,
      end_date: params.endDate,
    },
  })

  return mapTrendEntityToModel(entity)
}

