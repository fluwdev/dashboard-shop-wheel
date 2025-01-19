'use client'
import { columnsPricesServices } from '@/lib/columns'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
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
import { useForm } from '@/hooks/use-form'
import { useToast } from '@/hooks/use-toast'
import {
  getPricesServices,
  savePricesServices,
} from '@/services/prices-services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { RotateLoader } from 'react-spinners'
import { SheetCreateServices } from '@/components/sheet-create-services'

export default function ServicesPricesPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['getPricesServices'],
    queryFn: getPricesServices,
    initialData: [],
  })
  const { values, handleChange, handleReset } = useForm({
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

  return (
    <div className='w-[90%] mx-auto h-full'>
      <SheetCreateServices
        columns={columnsPricesServices}
        title='Agregar nuevo Servicio'
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
      {!query.isFetching && (
        <DataTable columns={columnsPricesServices} data={query.data} />
      )}
    </div>
  )
}
