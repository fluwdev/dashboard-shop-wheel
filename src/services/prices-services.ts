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
