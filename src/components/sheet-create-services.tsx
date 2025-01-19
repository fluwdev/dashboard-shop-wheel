import { PlusCircle } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Label } from './ui/label'
import { Input } from './ui/input'

type SheetCreateServicesProps = {
  title: string
  onSubmit: () => void
  handleChange: (
    key: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  columns: Array<{ accessorKey: string; header: string }>
}

export function SheetCreateServices({
  title,
  handleChange,
  onSubmit: handleSubmit,
  columns,
}: SheetCreateServicesProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='fixed bottom-8 right-8 z-50 rounded-full w-10 h-10'>
          <PlusCircle className='h-10 w-10' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          {columns.map((column) => (
            <div
              key={column.accessorKey}
              className='grid grid-cols-4 items-center gap-4'
            >
              <Label className='text-right'>
                {column.header.replace('$', '')}
              </Label>
              <Input
                onChange={handleChange(column.accessorKey)}
                id={column.accessorKey}
                className='col-span-3'
              />
            </div>
          ))}
        </div>
        <SheetFooter className='justify-center'>
          <Button onClick={handleSubmit}>Guardar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
