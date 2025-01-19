'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RevenueChartProps {
  data: Array<{
    status: string
    price: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  const revenueData = data.reduce((acc, curr) => {
    const status = curr.status
    const existingStatus = acc.find((item) => item.name === status)

    if (existingStatus) {
      existingStatus.value += curr.price
    } else {
      acc.push({ name: status, value: curr.price })
    }

    return acc
  }, [] as Array<{ name: string; value: number }>)

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={revenueData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Monto']}
        />
        <Bar dataKey='value' fill='hsl(var(--chart-2))' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
