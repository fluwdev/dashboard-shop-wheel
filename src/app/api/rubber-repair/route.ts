import { prisma } from '@/lib/prisma'
import { schemaRubberRepair } from '@/schema/schema-rubber-repair'

export async function GET() {
  const data = await prisma.rubberGutsRepair.findMany()
  return Response.json({ data })
}

export async function POST(req: Request) {
  const body = await req.json()

  // Parser the values of the request
  const valuesParsed = {
    description: body.description,
    vulcanizationN: parseFloat(body.vulcanizationN),
    vulcanizationG: parseFloat(body.vulcanizationG),
    vulcanizationValve: parseFloat(body.vulcanizationValve),
  }

  // Validates the request
  try {
    schemaRubberRepair.parse(valuesParsed)
  } catch {
    throw new Error('Datos Invalidos')
  }

  const result = await prisma.rubberGutsRepair.create({
    data: {
      ...valuesParsed,
    },
  })
  return Response.json({ result })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  const result = await prisma.rubberGutsRepair.delete({
    where: {
      id: body.id,
    },
  })
  return Response.json({ result })
}

export async function PUT(req: Request) {
  const body = await req.json()
  const result = await prisma.rubberGutsRepair.update({
    where: {
      id: body.id,
    },
    data: {
      ...body,
    },
  })
  return Response.json({ result })
}
