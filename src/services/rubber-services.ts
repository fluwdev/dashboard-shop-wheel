export async function getRubberRepair() {
  const response = await fetch('/rubber-repair')
  const jsonData = await response.json()
  return jsonData.data
}

export async function saveRubberRepair(values: Record<string, string>) {
  const response = await fetch('/rubber-repair', {
    method: 'POST',
    body: JSON.stringify({ ...values }),
  })
  const jsonData = await response.json()
  return jsonData
}
