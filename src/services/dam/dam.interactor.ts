import { apiGet } from '../api-client'
import { DamEntity } from './dam.entity'
import { DamModel } from './dam.model'
import { mapDamEntityToModel } from './dam.mapper'

export type DamName = 'Asprokremmos' | 'Evretou' | 'Mavrokolympos'

export interface GetDamParams {
  name: DamName
  targetDate?: string // DD.MM.YYYY format
}

export async function getDam(params: GetDamParams): Promise<DamModel> {
  const entity = await apiGet<DamEntity>('/dam', {
    params: {
      name: params.name,
      target_date: params.targetDate,
    },
  })

  return mapDamEntityToModel(entity)
}

