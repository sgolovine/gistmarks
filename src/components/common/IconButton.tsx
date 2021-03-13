import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  onClick?: () => void
}

const IconButton: React.FC<Props> = ({ onClick, children }) => {
  const handleClick = () =>
    onClick ? onClick() : console.log("no click handler")

  return (
    <button
      onClick={handleClick}
      className="rounded-lg h-8 w-8 border p-1 mr-2 cursor-pointer active:bg-blue-500"
    >
      {children}
    </button>
  )
}

export default IconButton
