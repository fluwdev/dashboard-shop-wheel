import { prisma } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  console.log({ email, password })

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  })
  // validar user
  if (!user) {
    return new Response('No se encontro el usuario', {
      status: 404,
    })
  }
  // validar password
  if (user.password !== password) {
    return Response.json({ message: 'Email o password incorrectos' })
  }

  const token = sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    algorithm: 'HS256',
  })

  return Response.json({
    token: token,
    user: user,
  })
}
