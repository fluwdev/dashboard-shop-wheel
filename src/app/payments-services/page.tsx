'use client'

import Container from '@/components/container'
import { DailyPaymentsChart } from '@/components/payments/daily-payments-chart'
import { PaymentStatusChart } from '@/components/payments/payments-status-char'
import { RevenueChart } from '@/components/payments/revenue-chart'
import { SheetCreateServices } from '@/components/sheet-create-services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { useForm } from '@/hooks/use-form'
import { useToast } from '@/hooks/use-toast'
import { columnsPaymentsServices } from '@/lib/columns'
import { mappingPaymentsServices } from '@/lib/mapping'
import {
  getPaymentsServices,
  savePaymentsServices,
} from '@/services/payments-services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'react-day-picker'
import { RotateLoader } from 'react-spinners'

export default function PaymentsServicesPage() {
  const { handleChange, handleReset, values } = useForm({
    services: '',
    price: 0,
    status: false,
    clientName: '',
  })
  const queryClient = useQueryClient()
  const { data, isFetching } = useQuery({
    initialData: [],
    queryKey: ['getPaymentsServices'],
    queryFn: getPaymentsServices,
  })
  const { toast } = useToast()

  const mutation = useMutation({
    mutationKey: ['createPaymentsServices'],
    mutationFn: savePaymentsServices,
    onSuccess: () => {
      handleReset()
      toast({
        title: 'Servicio guardado',
        description: 'El servicio se guardó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getPaymentsServices'],
      })
    },
    onError: () => {
      toast({ title: 'Error', description: 'No se pudo guardar el servicio' })
    },
  })

  const handleSubmit = () => {
    mutation.mutate({ ...values })
  }

  return (
    <Container>
      <SheetCreateServices
        columns={columnsPaymentsServices}
        title='Registros de Reparaciones'
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className='w-full flex justify-center items-center'>
        <RotateLoader className='mt-10' loading={isFetching} color='#fff' />
      </div>
      <DataTable
        data={mappingPaymentsServices(data)}
        columns={columnsPaymentsServices}
      />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10'>
        <Card>
          <CardHeader>
            <CardTitle>Estado de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentStatusChart data={data} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={data} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagos por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <DailyPaymentsChart data={data} />
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
