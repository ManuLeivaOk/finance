'use client'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import RetroLoader from '../../../components/ui/loader'
import { Textarea } from '../../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { fetchCategoriasIngresos } from '../../../services/categorias-ingresos'
import {
  CategoriasDto,
  CategoriasIngresosResponse,
} from '../../../types/categorias-ingresos'
import { IngresosDto, IngresosResponse } from '../../../types/ingresos'
import { fetchIngresos } from '../../../services/ingresos'
import DataTableIngresos from '../../../components/ui/dataTableIngresos'

export default function Ingresos() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoriasDto[]>()
  const [ingresos, setIngresos] = useState<IngresosDto[]>()

  useEffect(() => {
    setLoading(true)
    const fetchCategories = async () => {
      const c: CategoriasIngresosResponse | null =
        await fetchCategoriasIngresos()
      if (c && Array.isArray(c.categories)) {
        setCategories(c.categories)
      } else {
        setCategories([])
      }
    }
    const fetchIng = async () => {
      const i: IngresosResponse | null = await fetchIngresos()
      if (i && Array.isArray(i.ingresos)) {
        setIngresos(i.ingresos)
      } else {
        setIngresos([])
      }
      setLoading(false)
    }
    fetchCategories()
    fetchIng()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    console.log('enviado')
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Gestión de Ingresos</h1>

      {/* Formulario para Agregar Ingresos */}
      <Card className="w-[700px] mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Agregar ingreso</CardTitle>
            <CardDescription>Agrega y gestiona tus ingresos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex justify-between items-center mb-5">
              <div className="flex flex-col space-y-1.5 w-[300px]">
                <Label htmlFor="fecha">Fecha</Label>
                <Input type="date" id="fecha" placeholder="Fecha" />
              </div>
              <div className="flex flex-col space-y-1.5 w-[300px]">
                <Label htmlFor="monto">Monto</Label>
                <Input type="number" id="monto" placeholder="Monto" />
              </div>
            </div>
            <div className="w-full mb-5">
              <Select>
                <SelectTrigger className="w-[300px] bg-white">
                  <SelectValue placeholder="Seleccione una cateogoría" />
                </SelectTrigger>
                {!loading ? (
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      <SelectLabel>Cateogorías</SelectLabel>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                ) : (
                  <RetroLoader />
                )}
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" placeholder="descripcion" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="neutral" className="w-[90px]">
              {loading ? <RetroLoader /> : 'Agregar'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Listado de Ingresos Históricos */}
      <Card className="w-[700px] mx-auto my-10 bg-[#fbfbfb]">
        <CardHeader>
          <CardTitle>Agregar ingreso</CardTitle>
          <CardDescription>Agrega y gestiona tus ingresos</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <RetroLoader />
          ) : (
            <DataTableIngresos data={ingresos ?? []} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
