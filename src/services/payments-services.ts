export async function getPaymentsServices() {
  const response = await fetch('/api/payments')
  const jsonData = await response.json()
  return jsonData.data
}

export async function savePaymentsServices<T>(values: T) {
  const response = await fetch('/api/payments', {
    method: 'POST',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function deletePaymentsServices(data) {
  const response = await fetch('/api/payments', {
    method: 'DELETE',
    body: JSON.stringify({
      id: data.id,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function updatePaymentsServices<T>(values: T) {
  const response = await fetch('/api/payments', {
    method: 'PUT',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}
