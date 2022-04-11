import React, {ReactNode} from 'react'

interface SectionContainerProps {
  children: ReactNode
}

export const SectionContainer = ({children}: SectionContainerProps) => {
  return (
    <div className="space-y-2 rounded-xl bg-mui-blue p-6 shadow-sm shadow-mui-blue-darkest">
      {children}
    </div>
  )
}
