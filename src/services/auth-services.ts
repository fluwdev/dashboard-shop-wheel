export async function signIn(data: { email: string; password: string }) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ ...data }),
  })
  const jsonData = await response.json()

  if (!response.ok) {
    throw new Error(jsonData.message)
  }

  return jsonData
}
