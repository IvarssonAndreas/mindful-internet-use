import React, {ReactNode} from 'react'

interface NavItemProps {
  children: ReactNode
  active?: boolean
  onClick: () => void
}

export const NavItem = ({children, onClick, active = false}: NavItemProps) => {
  return (
    <li className="my-2">
      <button
        onClick={() => onClick()}
        className={`flex w-full items-center gap-2 rounded-r-xl border-4 border-l-0 border-transparent px-4 py-4 text-left text-lg font-bold   text-amber-50 transition-transform duration-500  focus-visible:border-4 focus-visible:border-l-0  focus-visible:border-amber-50  focus-visible:outline-none  ${
          active
            ? 'transitions b- shadow-mui-blue-blue translate-x-1 scale-x-110 rounded-r-xl border-4 border-l-0  border-transparent bg-gradient-to-r from-mui-blue-dark to-mui-blue shadow-sm '
            : 'bg-transparent'
        }`}
      >
        {children}
      </button>
    </li>
  )
}
