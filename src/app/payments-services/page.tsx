'use client'

import Container from '@/components/container'
import { DailyPaymentsChart } from '@/components/payments/daily-payments-chart'
import { PaymentStatusChart } from '@/components/payments/payments-status-char'
import { RevenueChart } from '@/components/payments/revenue-chart'
import { SheetCreateServices } from '@/components/sheet-create-services'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useForm } from '@/hooks/use-form'
import { useToast } from '@/hooks/use-toast'
import { columnsPaymentsServices } from '@/lib/columns'
import { mappingPaymentsServices } from '@/lib/mapping'
import {
  deletePaymentsServices,
  getPaymentsServices,
  savePaymentsServices,
  updatePaymentsServices,
} from '@/services/payments-services'
import { PaymentData } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { RotateLoader } from 'react-spinners'

const initialValues = {
  services: '',
  price: 0,
  status: false,
  clientName: '',
}

export default function PaymentsServicesPage() {
  const { handleChange, handleReset, values } =
    useForm<PaymentData>(initialValues)
  const {
    values: valuesUpdate,
    handleChange: handleChangeUpdate,
    handleReset: handleResetUpdate,
    handleChangeAllValues,
  } = useForm<PaymentData>(initialValues)
  const queryClient = useQueryClient()
  const { data, isFetching } = useQuery({
    initialData: [],
    queryKey: ['getPaymentsServices'],
    queryFn: getPaymentsServices,
  })
  const { toast } = useToast()
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)

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

  const mutationUpdate = useMutation({
    mutationFn: updatePaymentsServices,
    mutationKey: ['updateServicesPrices'],
    onSuccess: () => {
      toast({
        title: 'Servicio actualizado',
        description: 'El servicio se actualizó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getPaymentsServices'],
      })
      handleResetUpdate()
      setIsOpenUpdate(false)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el servicio',
      })
    },
  })

  const mutationDelete = useMutation({
    mutationFn: deletePaymentsServices,
    mutationKey: ['deleteServicesPrices'],
    onSuccess: () => {
      toast({
        title: 'Servicio eliminado',
        description: 'El servicio se eliminó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getPaymentsServices'],
      })
      handleResetUpdate()
      setIsOpenUpdate(false)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el servicio',
      })
    },
  })

  const handleSubmit = () => {
    mutation.mutate({ ...values })
  }

  const handleSubmitUpdate = () => {
    mutationUpdate.mutate({ id: valuesUpdate.id, ...valuesUpdate })
  }

  const handleSubmitDelete = () => {
    mutationDelete.mutate({ id: valuesUpdate.id ?? '' })
  }

  return (
    <Container>
      <SheetCreateServices
        columns={columnsPaymentsServices}
        title='Registros de Reparaciones'
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Sheet
        open={isOpenUpdate}
        onOpenChange={(value) => {
          setIsOpenUpdate(value)
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Servicio</SheetTitle>
          </SheetHeader>
          <div className='grid gap-4 py-4'>
            {columnsPaymentsServices.map((column) =>
              column.accessorKey === 'date' ? (
                <></>
              ) : (
                <div
                  key={column.accessorKey}
                  className='grid grid-cols-4 items-center gap-4'
                >
                  <Label className='text-right'>
                    {column.header.replace('$', '')}
                  </Label>
                  {column?.options ? (
                    <Select
                      value={
                        valuesUpdate[
                          column.accessorKey as keyof PaymentData
                        ] !== undefined
                          ? String(
                              valuesUpdate[
                                column.accessorKey as keyof PaymentData
                              ]
                            )
                          : undefined
                      }
                      onValueChange={(value) => {
                        handleChangeUpdate(
                          column.accessorKey as keyof PaymentData
                        )(value)
                      }}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Seleccione un estado' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Estado de Servicio</SelectLabel>
                          {column.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={
                        valuesUpdate[
                          column.accessorKey as keyof PaymentData
                        ] !== undefined
                          ? String(
                              valuesUpdate[
                                column.accessorKey as keyof PaymentData
                              ]
                            )
                          : undefined
                      }
                      onChange={handleChangeUpdate(column.accessorKey)}
                      id={column.accessorKey}
                      className='col-span-3'
                    />
                  )}
                </div>
              )
            )}
          </div>
          <SheetFooter>
            <Button onClick={handleSubmitUpdate}>Actualizar</Button>
            <Button variant={'outline'} onClick={handleSubmitDelete}>
              Eliminar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className='w-full flex justify-center items-center'>
        <RotateLoader className='mt-10' loading={isFetching} color='#fff' />
      </div>
      {!isFetching && (
        <DataTable
          onClickRow={(data) => {
            setIsOpenUpdate(true)
            handleChangeAllValues({
              id: data.id,
              clientName: data.clientName,
              price: parseFloat(data.price),
              services: data.services,
              status: data.status === 'Pendiente' ? false : true,
            })
          }}
          data={mappingPaymentsServices(data)}
          columns={columnsPaymentsServices}
        />
      )}

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
