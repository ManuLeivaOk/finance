const categories = [
  {
    id: 1,
    name: 'Salario',
    description: 'Ingreso regular por trabajo o empleo',
  },
  { id: 2, name: 'Bonos', description: 'Ingresos extra por metas cumplidas' },
  {
    id: 3,
    name: 'Ventas',
    description: 'Ingresos por la venta de productos o servicios',
  },
  {
    id: 4,
    name: 'Inversiones',
    description: 'Ingresos provenientes de retornos por inversiones',
  },
  { id: 5, name: 'Regalos', description: 'Dinero recibido como regalo' },
  {
    id: 6,
    name: 'Freelance',
    description: 'Ingresos por trabajos independientes',
  },
  {
    id: 7,
    name: 'Alquileres',
    description: 'Ingresos por alquiler de propiedades',
  },
  {
    id: 8,
    name: 'Reembolsos',
    description: 'Dinero devuelto por gastos previos',
  },
  { id: 9, name: 'Otros', description: 'Otros ingresos no especificados' },
]

export async function GET() {
  try {
    return Response.json({
      ok: true,
      msg: 'Consulta de categorias exitosa',
      categories,
    })
  } catch (e) {
    console.log(e)
    return Response.json(
      { ok: false, msg: 'Error interno del servidor' },
      { status: 500 } // Código 500: Internal Server Error
    )
  }
}
