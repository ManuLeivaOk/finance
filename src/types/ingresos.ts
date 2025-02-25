export interface IngresosDto {
  date: string
  amount: number
  description: string
  category: string
}

export interface IngresosResponse {
  ok: boolean
  msg: string
  ingresos: IngresosDto[]
}
