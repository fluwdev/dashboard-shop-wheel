'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface DailyPaymentsChartProps {
  data: Array<{
    date: string
    price: number
    status: string
  }>
}

export function DailyPaymentsChart({ data }: DailyPaymentsChartProps) {
  const dailyData = data.reduce((acc, curr) => {
    const date = curr.date
    const existingDate = acc.find((item) => item.date === date)

    if (existingDate) {
      if (curr.status === 'Pagado') {
        existingDate.paid += curr.price
      } else {
        existingDate.pending += curr.price
      }
    } else {
      acc.push({
        date,
        paid: curr.status === 'Pagado' ? curr.price : 0,
        pending: curr.status === 'Pendiente' ? curr.price : 0,
      })
    }

    return acc
  }, [] as Array<{ date: string; paid: number; pending: number }>)

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={dailyData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Monto']}
        />
        <Line
          type='monotone'
          dataKey='paid'
          stroke='hsl(var(--chart-4))'
          name='Pagado'
        />
        <Line
          type='monotone'
          dataKey='pending'
          stroke='hsl(var(--chart-5))'
          name='Pendiente'
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
