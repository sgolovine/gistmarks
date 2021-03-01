import React from "react"

type Props = {
  onClick: () => void
  label: string
  danger?: boolean
  additionalClassnames?: string
}

const Button: React.FC<Props> = ({
  label,
  onClick,
  danger,
  additionalClassnames,
}) => {
  const bgColor = danger ? "bg-red-600" : "bg-blue-600"
  return (
    <button
      onClick={onClick}
      className={`${bgColor} px-2 py-1 rounded shadow text-white ${additionalClassnames}`}
    >
      {label}
    </button>
  )
}

export default Button
