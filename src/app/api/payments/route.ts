import { prisma } from '@/lib/prisma'
import { schemaPaymentsServices } from '@/schema/schema-payments-services'

export async function GET() {
  const data = await prisma.paymentsRepairs.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return Response.json({ data })
}

export async function POST(req: Request) {
  const body = await req.json()

  // Parser the values of the request
  const valuesParsed = {
    services: body.services,
    price: parseFloat(body.price),
    status: body.status === 'Pendiente' ? false : true,
    clientName: body.clientName,
  }

  // Validates the request
  try {
    schemaPaymentsServices.parse(valuesParsed)
  } catch {
    throw new Error('Datos Invalidos')
  }

  const result = await prisma.paymentsRepairs.create({
    data: {
      ...valuesParsed,
    },
  })
  return Response.json({ result })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  const result = await prisma.paymentsRepairs.delete({
    where: {
      id: body.id,
    },
  })

  if (!result) {
    throw new Error('No se encontró el servicio')
  }

  return Response.json({ result })
}

export async function PUT(req: Request) {
  const body = await req.json()
  const result = await prisma.paymentsRepairs.update({
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
