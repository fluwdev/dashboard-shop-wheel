export interface ServicePriceData {
  id?: string
  measure: string
  repair: number
  change: number
  rotation: number
  disassembly: number
  assembly: number
  vulcanization: number
  fineValve: number
  thickValve: number
  createdAt?: Date
}

export interface RubberRepairData {
  id?: string
  description: string
  vulcanizationN: number
  vulcanizationG: number
  vulcanizationValve: number
  createdAt?: Date
}

export interface PaymentData {
  id?: string
  services: string
  price: number
  status: boolean
  clientName: string
  createdAt?: Date
}
