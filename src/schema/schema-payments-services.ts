import * as zod from 'zod'

export const schemaPaymentsServices = zod.object({
  services: zod.string(),
  price: zod.number(),
  status: zod.boolean(),
  clientName: zod.string(),
})
