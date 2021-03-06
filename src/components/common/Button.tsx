import React from "react"

type Props = {
  label: string
  danger?: boolean
  href?: string
  onClick?: () => void
  additionalClassnames?: string
}

const Button: React.FC<Props> = ({
  label,
  onClick,
  danger = false,
  additionalClassnames = "",
}) => {
  const bgColor = danger ? "bg-red-600" : "bg-blue-600"

  const handleClick = () => !!onClick && onClick()

  return (
    <button
      onClick={handleClick}
      className={`${bgColor} px-2 py-1 rounded shadow text-white ${additionalClassnames}`}
    >
      {label}
    </button>
  )
}

export const LinkButton: React.FC<Props> = ({
  label,
  danger = false,
  additionalClassnames = "",
  href = "#",
}) => {
  const bgColor = danger ? "bg-red-600" : "bg-blue-600"

  return (
    <a
      href={href}
      className={`link-button ${bgColor} px-2 py-1 rounded shadow text-white ${additionalClassnames} text-center`}
    >
      {label}
    </a>
  )
}

export default Button
