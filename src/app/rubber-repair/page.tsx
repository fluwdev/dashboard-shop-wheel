'use client'

import Container from '@/components/container'
import { SheetCreateServices } from '@/components/sheet-create-services'
import { DataTable } from '@/components/ui/data-table'
import { useForm } from '@/hooks/use-form'
import { useToast } from '@/hooks/use-toast'
import { columnsRubberRepair } from '@/lib/columns'
import { getRubberRepair, saveRubberRepair } from '@/services/rubber-services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
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
  const { handleChange, handleReset, values } = useForm(initialValues)
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

  const handleSubmit = () => {
    mutation.mutate({ ...values })
  }

  return (
    <Container>
      <SheetCreateServices
        columns={columnsRubberRepair}
        title='Reparaciones de Tripas'
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div className='w-full flex justify-center items-center'>
        <RotateLoader
          className='mt-10'
          loading={query.isFetching}
          color='#fff'
        />
      </div>
      <DataTable columns={columnsRubberRepair} data={query.data} />
    </Container>
  )
}
