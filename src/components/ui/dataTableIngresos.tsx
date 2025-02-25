'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IngresosDto } from '../../types/ingresos'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet'
import { Label } from './label'
import { Filter, MoreHorizontal } from 'lucide-react'
import { CategoriasDto } from '../../types/categorias-ingresos'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'

export const columns: ColumnDef<IngresosDto>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => <div>{row.getValue('category')}</div>,
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const dateValue = row.getValue('date')
      const formattedDate = new Date(
        dateValue as string | number | Date
      ).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const monto = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
      }).format(monto)

      return <div className="text-right font-bold">{formatted}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const ingreso = row.original

      return (
        <div className="w-full flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="noShadow" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(ingreso.id))
                }
              >
                Copy ingreso ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

interface Props {
  data: IngresosDto[]
  categories: CategoriasDto[] | undefined
}

export default function DataTableIngresos({
  data,
  categories,
}: Readonly<Props>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full font-base text-mtext">
      <div className="flex items-center py-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Filter />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Aplica los filtros que necesites.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="from" className="text-right">
                  Fecha desde
                </Label>
                <Input id="from" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="text-right">
                  Fecha desde
                </Label>
                <Input id="to" className="col-span-3" type="date" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="text-right">
                  Categoría
                </Label>
                <Select>
                  <SelectTrigger className="w-[248px] bg-white">
                    <SelectValue placeholder="Seleccione una cateogoría" />
                  </SelectTrigger>
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
                </Select>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Aplicar filtros</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="rounded-md">
        <Table className="bg-[#ffdc58] border-black border-2">
          <TableHeader className="font-heading">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-text flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="noShadow"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previo
          </Button>
          <Button
            variant="noShadow"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
