export interface CategoriasDto {
  id: number
  description: string
  name: string
}

export interface CategoriasIngresosResponse {
  msg: string
  ok: boolean
  categories: CategoriasDto[]
}
