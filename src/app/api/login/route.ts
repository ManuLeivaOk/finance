import type { NextRequest } from 'next/server'

interface Body {
  email: string
  pass: string
}

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json()
    if (!body.email || !body.pass) {
      return Response.json({
        ok: false,
        msg: 'Email y Contraseña son requeridos',
      })
    }
    if (body.email === 'manuleivaok@gmail.com' && body.pass === '123456') {
      return Response.json({ ok: true, msg: 'Login exitoso' })
    }

    return Response.json({ ok: false, msg: 'Email o Contraseña incorrecto' })
  } catch (e) {
    console.log(e)
  }
}
