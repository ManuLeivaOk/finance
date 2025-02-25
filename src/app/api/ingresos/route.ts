const ingresos = [
  {
    date: '2025-01-05',
    amount: 1500,
    description: 'Pago de freelance',
    category: 'Servicios',
  },
  {
    date: '2025-01-10',
    amount: 2500,
    description: 'Salario mensual',
    category: 'Salario',
  },
  {
    date: '2025-01-15',
    amount: 800,
    description: 'Venta de producto',
    category: 'Ventas',
  },
  {
    date: '2025-01-20',
    amount: 500,
    description: 'Devolución de préstamo',
    category: 'Otros',
  },
  {
    date: '2025-01-25',
    amount: 1000,
    description: 'Bono por rendimiento',
    category: 'Bonos',
  },
  {
    date: '2025-02-03',
    amount: 1800,
    description: 'Pago de consultoría',
    category: 'Servicios',
  },
  {
    date: '2025-02-07',
    amount: 3000,
    description: 'Salario mensual',
    category: 'Salario',
  },
  {
    date: '2025-02-12',
    amount: 1200,
    description: 'Venta de software',
    category: 'Ventas',
  },
  {
    date: '2025-02-18',
    amount: 400,
    description: 'Intereses bancarios',
    category: 'Otros',
  },
  {
    date: '2025-02-23',
    amount: 900,
    description: 'Pago extra por proyecto',
    category: 'Bonos',
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
