import { prisma } from '@/lib/prisma'
import { schemaPricesServices } from '@/schema/schema-prices-services'

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

  // Parser the values of the request
  const valuesParsed = {
    measure: body.measure,
    repair: parseFloat(body.repair),
    change: parseFloat(body.change),
    rotation: parseFloat(body.rotation),
    disassembly: parseFloat(body.disassembly),
    assembly: parseFloat(body.assembly),
    vulcanization: parseFloat(body.vulcanization),
    fineValve: parseFloat(body.fineValve),
    thickValve: parseFloat(body.thickValve),
  }

  // Validates the request
  try {
    schemaPricesServices.parse(valuesParsed)
  } catch {
    throw new Error('Datos Invalidos')
  }

  //Creates a new price of service
  const result = await prisma.pricesServicesWheel.create({
    data: {
      ...valuesParsed,
    },
  })
  return Response.json({ result })
}

export async function DELETE(request: Request) {
  const body = await request.json()

  const result = await prisma.pricesServicesWheel.delete({
    where: {
      id: body.id,
    },
  })

  if (!result) {
    throw new Error('No se encontró el servicio')
  }

  return Response.json({ result })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const result = await prisma.pricesServicesWheel.update({
    where: {
      id: body.id,
    },
    data: {
      ...body,
    },
  })

  if (!result) {
    throw new Error('No se encontró el servicio')
  }

  return Response.json({ result })
}
