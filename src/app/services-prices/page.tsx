'use client'

import { PricesServices, columns } from '@/components/prices/columns'
import { DataTable } from '@/components/prices/data-table'
import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { PlusCircle } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from 'recharts'

export default function ServicesPricesPage() {
  const [data, setData] = useState<PricesServices[]>([])
  const { toast } = useToast()
  const [values, setValues] = useState({
    measure: '',
    repair: 0,
    change: 0,
    rotation: 0,
    disassembly: 0,
    assembly: 0,
    vulcanization: 0,
    fineValve: 0,
    thickValve: 0,
  })

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, [key]: e.target.value }))
  }

  const handleReset = () => {
    setValues({
      measure: '',
      repair: 0,
      change: 0,
      rotation: 0,
      disassembly: 0,
      assembly: 0,
      vulcanization: 0,
      fineValve: 0,
      thickValve: 0,
    })
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/services-prices')
      const jsonData = await response.json()
      if (jsonData) {
        setData(jsonData.data)
      }
    }
    getData()
  }, [])

  const handleSaveSevices = async () => {
    try {
      const response = await fetch('/api/services-prices', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
        }),
      })
      const jsonData = await response.json()
      console.log(jsonData)
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      })
    } catch (_e) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar el servicio',
      })
    } finally {
      handleReset()
    }
  }

  return (
    <div className='w-full h-full flex justify-center flex-col items-center gap-5'>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='fixed bottom-8 right-8 rounded-full w-10 h-10'>
            <PlusCircle className='h-10 w-10' />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Agregar nuevo Servicio</SheetTitle>
          </SheetHeader>
          <div className='grid gap-4 py-4'>
            {columns.map((column) => (
              <div
                key={column.accessorKey}
                className='grid grid-cols-4 items-center gap-4'
              >
                <Label className='text-right'>{column.header}</Label>
                <Input
                  onChange={handleChange(column.accessorKey)}
                  id={column.accessorKey}
                  className='col-span-3'
                />
              </div>
            ))}
          </div>
          <SheetFooter className='justify-center'>
            <Button onClick={handleSaveSevices}>Guardar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <DataTable columns={columns} data={data} />
      {/* <div className='grid gap-4 mb-8 w-[70%]'>
        <Card>
          <CardHeader>Análisis de Servicios</CardHeader>
          {chartData.length > 0 && (
            <CardContent className='h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='name'
                    height={60}
                    tick={{ dy: 10 }}
                    tickLine={{ display: 'none' }}
                  />
                  <YAxis
                    width={80}
                    tick={{ dx: -10 }}
                    tickLine={{ display: 'none' }}
                    axisLine={{ display: 'none' }}
                  />
                  <Tooltip />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar
                    dataKey='reparación'
                    fill='hsl(var(--chart-1))'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='cambio'
                    fill='hsl(var(--chart-2))'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='vulcanizacion'
                    fill='hsl(var(--chart-3))'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          )}
        </Card>
      </div> */}
    </div>
  )
}
