import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  bgClassName?: string
}

const IconButton: React.FC<Props> = ({ children, bgClassName }) => {
  return (
    <button className={`${bgClassName} rounded-lg h-8 w-8 border p-1 mr-2`}>
      {children}
    </button>
  )
}

export default IconButton
