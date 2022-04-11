import React, {ReactNode} from 'react'

interface StopContentWrapperProps {
  children: ReactNode
}

export const StopContentWrapper = ({children}: StopContentWrapperProps) => {
  return <div className="max-w-[35rem] space-y-10">{children}</div>
}
