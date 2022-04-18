import React, {ReactNode} from 'react'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

export const SectionHeading = ({
  children,
  className = '',
}: SectionHeadingProps) => {
  return (
    <h2 className={` text-xl font-bold text-mui-gold ${className} `}>
      {children}
    </h2>
  )
}
