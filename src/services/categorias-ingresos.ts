import { CategoriasIngresosResponse } from '../types/categorias-ingresos'

export const fetchCategoriasIngresos = async () => {
  try {
    const response = await fetch('/api/categorias-ingresos', {
      method: 'GET',
    })

    if (!response.ok) {
      return null
    } else {
      const json: CategoriasIngresosResponse = await response.json()
      return json
    }
  } catch (e) {
    console.log('e', e)
    return null
  }
}
