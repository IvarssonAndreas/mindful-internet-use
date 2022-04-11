import React, {ReactNode} from 'react'

interface SectionHeadingProps {
  children: ReactNode
}

export const SectionHeading = ({children}: SectionHeadingProps) => {
  return <h2 className="text-md font-bold text-mui-gold">{children}</h2>
}
