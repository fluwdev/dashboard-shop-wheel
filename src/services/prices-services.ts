export async function getPricesServices() {
  const response = await fetch('/api/services-prices')
  const jsonData = await response.json()
  return jsonData.data
}

export async function savePricesServices<T>(values: T) {
  const response = await fetch('/api/services-prices', {
    method: 'POST',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function deletePricesServices(data: string) {
  const response = await fetch(`/api/services-prices`, {
    method: 'DELETE',
    body: JSON.stringify({
      id: data.id,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function updatePricesServices<T>(values: T) {
  const response = await fetch(`/api/services-prices`, {
    method: 'PUT',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}
