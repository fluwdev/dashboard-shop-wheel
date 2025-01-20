'use client'
import { columnsPricesServices } from '@/lib/columns'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useForm } from '@/hooks/use-form'
import { useToast } from '@/hooks/use-toast'
import {
  deletePricesServices,
  getPricesServices,
  savePricesServices,
  updatePricesServices,
} from '@/services/prices-services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RotateLoader } from 'react-spinners'
import { SheetCreateServices } from '@/components/sheet-create-services'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ServicePriceData } from '@/types'
import { mappingPricesServices } from '@/lib/mapping'

const initialValues = {
  measure: '',
  repair: 0,
  change: 0,
  rotation: 0,
  disassembly: 0,
  assembly: 0,
  vulcanization: 0,
  fineValve: 0,
  thickValve: 0,
}

export default function ServicesPricesPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const query = useQuery({
    queryKey: ['getPricesServices'],
    queryFn: getPricesServices,
    initialData: [],
  })
  const { values, handleChange, handleReset } =
    useForm<ServicePriceData>(initialValues)
  const {
    values: valuesUpdate,
    handleChange: handleChangeUpdate,
    handleReset: handleResetUpdate,
    handleChangeAllValues,
  } = useForm<ServicePriceData>(initialValues)

  const mutationDelete = useMutation({
    mutationFn: deletePricesServices,
    mutationKey: ['deleteServicesPrices'],
    onSuccess: () => {
      handleReset()
      toast({
        title: 'Servicio eliminado',
        description: 'El servicio se eliminó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getPricesServices'],
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el servicio',
      })
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: updatePricesServices,
    mutationKey: ['updateServicesPrices'],
    onSuccess: () => {
      handleResetUpdate()
      toast({
        title: 'Servicio actualizado',
        description: 'El servicio se actualizó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getPricesServices'],
      })
      setIsOpenUpdate(false)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el servicio',
      })
    },
  })

  const mutation = useMutation({
    mutationFn: savePricesServices,
    mutationKey: ['createServicesPrices'],
    onSuccess: () => {
      handleReset()
      toast({
        title: 'Servicio guardado',
        description: 'El servicio se guardó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getPricesServices'],
      })
      setIsOpenUpdate(false)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo guardar el servicio',
      })
    },
  })

  const handleSubmit = () => {
    mutation.mutate({ ...values })
  }

  const handleSubmitDelete = () => {
    mutationDelete.mutate({ id: valuesUpdate.id ?? '' })
  }

  const handleSubmitUpdate = () => {
    mutationUpdate.mutate({ id: valuesUpdate.id, ...valuesUpdate })
  }

  return (
    <div className='w-[90%] mx-auto h-full'>
      <SheetCreateServices
        columns={columnsPricesServices}
        title='Agregar nuevo Servicio'
        onSubmit={handleSubmit}
        handleChange={handleChange}
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
            {columnsPricesServices.map((column) => (
              <div
                key={column.accessorKey}
                className='grid grid-cols-4 items-center gap-4'
              >
                <Label className='text-right'>
                  {column.header.replace('$', '')}
                </Label>
                <Input
                  value={
                    valuesUpdate[
                      column.accessorKey as keyof ServicePriceData
                    ] !== undefined
                      ? String(
                          valuesUpdate[
                            column.accessorKey as keyof ServicePriceData
                          ]
                        )
                      : undefined
                  }
                  onChange={handleChangeUpdate(column.accessorKey)}
                  id={column.accessorKey}
                  className='col-span-3'
                />
              </div>
            ))}
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
        <RotateLoader
          className='mt-10'
          loading={query.isFetching}
          color='#fff'
        />
      </div>
      {!query.isFetching && (
        <DataTable
          onClickRow={(data) => {
            setIsOpenUpdate(true)
            handleChangeAllValues({
              id: data.id,
              measure: data.measure,
              repair: parseFloat(data.repair),
              change: parseFloat(data.change),
              rotation: parseFloat(data.rotation),
              disassembly: parseFloat(data.disassembly),
              assembly: parseFloat(data.assembly),
              vulcanization: parseFloat(data.vulcanization),
              fineValve: parseFloat(data.fineValve),
              thickValve: parseFloat(data.thickValve),
            })
          }}
          columns={columnsPricesServices}
          data={mappingPricesServices(query.data)}
        />
      )}
    </div>
  )
}
