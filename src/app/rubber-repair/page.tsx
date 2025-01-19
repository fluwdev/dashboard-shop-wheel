'use client'

import Container from '@/components/container'
import { SheetCreateServices } from '@/components/sheet-create-services'
import { Button } from '@/components/ui/button'
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
import { columnsRubberRepair } from '@/lib/columns'
import {
  deleteRubberRepair,
  getRubberRepair,
  saveRubberRepair,
  updateRubberRepair,
} from '@/services/rubber-services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RotateLoader } from 'react-spinners'

const initialValues = {
  description: '',
  vulcanizationN: 0,
  vulcanizationG: 0,
  vulcanizationValve: 0,
}

export default function RubberRepairPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)

  const { handleChange, handleReset, values } = useForm(initialValues)
  const {
    values: valuesUpdate,
    handleChange: handleChangeUpdate,
    handleReset: handleResetUpdate,
    handleChangeAllValues,
  } = useForm(initialValues)
  const query = useQuery({
    queryKey: ['getRubberRepair'],
    queryFn: getRubberRepair,
    initialData: [],
  })

  const mutation = useMutation({
    mutationKey: ['createRubberRepair'],
    mutationFn: saveRubberRepair,
    onSuccess: () => {
      toast({
        title: 'Servicio guardado',
        description: 'El servicio se guardó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getRubberRepair'],
      })
      handleReset()
    },
    onError: () => {
      toast({
        title: 'Error ',
        description: 'No se pudo guardar el servicio',
      })
    },
  })

  const mutationDelete = useMutation({
    mutationFn: deleteRubberRepair,
    mutationKey: ['deleteServicesPrices'],
    onSuccess: () => {
      toast({
        title: 'Servicio eliminado',
        description: 'El servicio se eliminó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getRubberRepair'],
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

  const mutationUpdate = useMutation({
    mutationFn: updateRubberRepair,
    mutationKey: ['updateServicesPrices'],
    onSuccess: () => {
      toast({
        title: 'Servicio actualizado',
        description: 'El servicio se actualizó correctamente',
      })
      queryClient.invalidateQueries({
        type: 'active',
        queryKey: ['getRubberRepair'],
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

  const handleSubmit = () => {
    mutation.mutate({ ...values })
  }

  const handleSubmitDelete = () => {
    mutationDelete.mutate({ id: valuesUpdate.id })
  }

  const handleSubmitUpdate = () => {
    mutationUpdate.mutate({ id: valuesUpdate.id, ...valuesUpdate })
  }

  return (
    <Container>
      <SheetCreateServices
        columns={columnsRubberRepair}
        title='Reparaciones de Tripas'
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
            {columnsRubberRepair.map((column) => (
              <div
                key={column.accessorKey}
                className='grid grid-cols-4 items-center gap-4'
              >
                <Label className='text-right'>
                  {column.header.replace('$', '')}
                </Label>
                <Input
                  value={valuesUpdate[column.accessorKey]}
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
            handleChangeAllValues(data)
          }}
          columns={columnsRubberRepair}
          data={query.data}
        />
      )}
    </Container>
  )
}
