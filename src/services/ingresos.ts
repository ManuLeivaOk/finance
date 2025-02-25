import { IngresosResponse } from '../types/ingresos'

export const fetchIngresos = async () => {
  try {
    const response = await fetch('/api/ingresos', {
      method: 'GET',
    })

    if (!response.ok) {
      return null
    } else {
      const json: IngresosResponse = await response.json()
      return json
    }
  } catch (e) {
    console.log('e', e)
    return null
  }
}
