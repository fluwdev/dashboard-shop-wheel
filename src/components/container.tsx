import { cn } from '@/lib/utils'
import React from 'react'

interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn('w-[90%] mx-auto h-full', className)} {...props}>
      {children}
    </div>
  )
}
