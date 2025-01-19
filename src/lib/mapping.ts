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
