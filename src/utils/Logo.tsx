import React from 'react'

interface LogoProps {
  size?: number
}

export const Logo = ({size = 40}: LogoProps) => {
  return (
    <div className=" w-min rounded-lg bg-mui-blue-dark p-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 52C7.10122 68.2284 22.2748 80 40.2 80C58.1252 80 73.2988 68.2284 78.4 52H56.2145C52.5627 56.8578 46.7486 60 40.2 60C33.6514 60 27.8373 56.8578 24.1855 52H2Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M78.2081 52.5C79.5007 48.5673 80.2 44.3653 80.2 40C80.2 17.9086 62.2914 0 40.2 0C18.1086 0 0.200012 17.9086 0.200012 40C0.200012 44.3653 0.899277 48.5673 2.1919 52.5H24.5866C21.8418 49.076 20.2 44.7297 20.2 40C20.2 28.9543 29.1543 20 40.2 20C51.2457 20 60.2 28.9543 60.2 40C60.2 44.7297 58.5582 49.076 55.8134 52.5H78.2081Z"
          fill="#FFBE7B"
        />
      </svg>
    </div>
  )
}
