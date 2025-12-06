import { TrendEntity } from './trend.entity'
import { TrendModel } from './trend.model'

export function mapTrendEntityToModel(entity: TrendEntity): TrendModel {
  return {
    data: entity.data.map((item) => ({
      date: new Date(item.date),
      percentage: item.percentage,
    })),
  }
}

