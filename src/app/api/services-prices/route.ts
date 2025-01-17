import { prisma } from '@/lib/prisma'
import * as zod from 'zod'

const shema = zod.object({
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

export async function GET() {
  // Searchs to all prices of services
  const result = await prisma.pricesServicesWheel.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })
  return Response.json({ data: result })
}

export async function POST(req: Request) {
  // Converts the request to JSON
  const body = await req.json()

  // Validates the request
  const validationData = shema.parse(body)
  if (!validationData) {
    return Response.json({ error: 'Datos invalidos' }, { status: 400 })
  }

  // Creates a new price of service
  const result = await prisma.pricesServicesWheel.create({
    data: {
      ...body,
    },
  })
  return Response.json({ ...result })
}
