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
    <h2 className={` text-lg font-bold text-mui-gold ${className} `}>
      {children}
    </h2>
  )
}
