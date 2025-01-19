import { useState } from 'react'

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues)

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({ ...prevValues, [key]: e.target.value }))
    }

  const handleReset = () => {
    setValues(initialValues)
  }

  return {
    values,
    handleChange,
    handleReset,
  }
}
