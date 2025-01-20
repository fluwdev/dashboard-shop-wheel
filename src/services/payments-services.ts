import { PaymentData } from '@/types'

export async function getPaymentsServices() {
  const response = await fetch('/api/payments')
  const jsonData = await response.json()
  return jsonData.data
}

export async function savePaymentsServices(values: PaymentData) {
  const response = await fetch('/api/payments', {
    method: 'POST',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function deletePaymentsServices(data: { id: string }) {
  const response = await fetch('/api/payments', {
    method: 'DELETE',
    body: JSON.stringify({
      id: data.id,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function updatePaymentsServices(values: PaymentData) {
  const response = await fetch('/api/payments', {
    method: 'PUT',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}
