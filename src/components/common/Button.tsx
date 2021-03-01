import React from "react"

type Props = {
  onClick: () => void
  label: string
}

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 px-2 py-1 rounded shadow text-white"
    >
      {label}
    </button>
  )
}

export default Button
