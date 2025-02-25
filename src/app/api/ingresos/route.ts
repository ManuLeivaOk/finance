const ingresos = [
  {
    date: '2025-01-05',
    amount: 1500,
    description: 'Pago de freelance',
    category: 'Servicios',
    id: 1,
  },
  {
    date: '2025-01-10',
    amount: 2500,
    description: 'Salario mensual',
    category: 'Salario',
    id: 2,
  },
  {
    date: '2025-01-15',
    amount: 800,
    description: 'Venta de producto',
    category: 'Ventas',
    id: 3,
  },
  {
    date: '2025-01-20',
    amount: 500,
    description: 'Devolución de préstamo',
    category: 'Otros',
    id: 4,
  },
]

export async function GET() {
  try {
    return Response.json({
      ok: true,
      msg: 'Consulta de ingresos exitosa',
      ingresos,
    })
  } catch (e) {
    console.log(e)
    return Response.json(
      { ok: false, msg: 'Error interno del servidor' },
      { status: 500 } // Código 500: Internal Server Error
    )
  }
}
