import * as zod from 'zod'

export const schemaRubberRepair = zod.object({
  description: zod.string(),
  vulcanizationN: zod.number(),
  vulcanizationG: zod.number(),
  vulcanizationValve: zod.number(),
})
