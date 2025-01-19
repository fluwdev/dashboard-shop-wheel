'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'

interface PaymentStatusChartProps {
  data: Array<{
    status: string
    price: number
  }>
}

export function PaymentStatusChart({ data }: PaymentStatusChartProps) {
  const statusData = data.reduce((acc, curr) => {
    const status = curr.status
    const existingStatus = acc.find((item) => item.name === status)

    if (existingStatus) {
      existingStatus.value++
    } else {
      acc.push({ name: status, value: 1 })
    }

    return acc
  }, [] as Array<{ name: string; value: number }>)

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))']

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={statusData}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey='value'
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
