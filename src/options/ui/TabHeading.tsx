import React, {ReactNode} from 'react'

interface TabHeadingProps {
  children: ReactNode
}

export const TabHeading = ({children}: TabHeadingProps) => {
  return (
    <h1 className=" relative isolate flex w-fit items-center gap-2 text-2xl font-bold underline decoration-mui-gold decoration-2 underline-offset-4">
      {' '}
      {children}{' '}
    </h1>
  )
}
