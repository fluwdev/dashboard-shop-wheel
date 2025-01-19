export async function getRubberRepair() {
  const response = await fetch('/api/rubber-repair')
  const jsonData = await response.json()
  return jsonData.data
}

export async function saveRubberRepair(values: Record<string, string>) {
  const response = await fetch('/api/rubber-repair', {
    method: 'POST',
    body: JSON.stringify({ ...values }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function deleteRubberRepair(data: string) {
  const response = await fetch(`/api/rubber-repair`, {
    method: 'DELETE',
    body: JSON.stringify({
      id: data.id,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}

export async function updateRubberRepair(values: Record<string, string>) {
  const response = await fetch(`/api/rubber-repair`, {
    method: 'PUT',
    body: JSON.stringify({
      ...values,
    }),
  })
  const jsonData = await response.json()
  return jsonData
}
