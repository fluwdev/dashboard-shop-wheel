'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@/hooks/use-form'
import { useAuth } from '@/provider/auth-provider'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { handleChange, handleReset, values } = useForm({
    email: '',
    password: '',
  })
  const { login } = useAuth()

  const handleSubmit = () => {
    login(values.email, values.password)
    handleReset()
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='w-full flex items-center justify-center'>
        <img src='./logo.jpg' className='h-20 w-auto rounded-full' />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Introduzca su correo electrónico para iniciar sesión en su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                </div>
                <Input
                  id='password'
                  value={values.password}
                  onChange={handleChange('password')}
                  type='password'
                  required
                />
              </div>
              <Button onClick={handleSubmit} type='submit' className='w-full'>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
