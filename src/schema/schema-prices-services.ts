import * as zod from 'zod'

export const schemaPricesServices = zod.object({
  measure: zod.string(),
  repair: zod.number(),
  change: zod.number(),
  rotation: zod.number(),
  disassembly: zod.number(),
  assembly: zod.number(),
  vulcanization: zod.number(),
  fineValve: zod.number(),
  thickValve: zod.number(),
})
