import { useState } from 'react'

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues)

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof e === 'string') {
        setValues((prevValues) => ({ ...prevValues, [key]: e }))
      } else {
        setValues((prevValues) => ({ ...prevValues, [key]: e.target.value }))
      }
    }

  const handleChangeAllValues = (values: T) => {
    setValues(values)
  }

  const handleReset = () => {
    setValues(initialValues)
  }

  return {
    values,
    handleChange,
    handleReset,
    handleChangeAllValues,
  }
}
