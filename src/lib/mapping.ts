export const mappingPaymentsServices = (
  data: Array<Record<string, string>>
) => {
  return data.map((item) => {
    return {
      id: item.id,
      services: item.services,
      price: item.price,
      status: item.status ? 'Pagado' : 'Pendiente',
      clientName: item.clientName,
      date: item.createdAt,
    }
  })
}

export const mappingPricesServices = (data: Array<Record<string, string>>) => {
  return data.map((item) => {
    return {
      id: item.id,
      measure: item.measure,
      repair: item.repair,
      change: item.change,
      rotation: item.rotation,
      disassembly: item.disassembly,
      assembly: item.assembly,
      vulcanization: item.vulcanization,
      fineValve: item.fineValve,
      thickValve: item.thickValve,
      date: item.createdAt,
    }
  })
}

export const mappingRubberRepair = (data: Array<Record<string, string>>) => {
  return data.map((item) => {
    return {
      id: item.id,
      description: item.description,
      vulcanizationN: item.vulcanizationN,
      vulcanizationG: item.vulcanizationG,
      vulcanizationValve: item.vulcanizationValve,
      date: item.createdAt,
    }
  })
}
