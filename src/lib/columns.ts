// This type is used to define the shape of our data.

import { access } from 'fs'

// You can use a Zod schema here if you want.
export type PricesServices = {
  id: string
  measure: string
  repair: number
  change: number
  rotation: number
  disassembly: number
  assembly: number
  vulcanization: number
  fineValve: number
  thickValve: number
  createdAt: Date
}

export const columnsPricesServices = [
  {
    accessorKey: 'measure',
    header: 'Medidas',
  },
  {
    accessorKey: 'repair',
    header: 'Reparación $',
  },
  {
    accessorKey: 'change',
    header: 'Cambio $',
  },
  {
    accessorKey: 'rotation',
    header: 'Rotación $',
  },
  {
    accessorKey: 'disassembly',
    header: 'Desmontaje $',
  },
  {
    accessorKey: 'assembly',
    header: 'Montaje $',
  },
  {
    accessorKey: 'vulcanization',
    header: 'Vulcanización $',
  },
  {
    accessorKey: 'fineValve',
    header: 'Válvula Fina $',
  },
  {
    accessorKey: 'thickValve',
    header: 'Válvula Gruesa $',
  },
]

export const columnsRubberRepair = [
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    accessorKey: 'vulcanizationN',
    header: 'Vulcanización N $',
  },
  {
    accessorKey: 'vulcanizationG',
    header: 'Vulcanización G $',
  },
  {
    accessorKey: 'vulcanizationValve',
    header: 'Vulcanización Valvula $',
  },
]

export const columnsPaymentsServices = [
  {
    accessorKey: 'services',
    header: 'Servicio',
  },
  {
    accessorKey: 'price',
    header: 'Precio',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    options: ['Pendiente', 'Pagado'],
  },
  {
    accessorKey: 'clientName',
    header: 'Cliente',
  },
]
