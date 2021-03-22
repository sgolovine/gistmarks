import React from "react"
import Modal from "react-modal"

interface Props {
  open: boolean
  title: string
  message: string
}

const modalContentStyle: React.CSSProperties = {
  maxWidth: "400px",
  marginLeft: "auto",
  marginRight: "auto",
  height: "200px",
}

const modalOverlayStyle: React.CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.75)",
}

export const ErrorModal: React.FC<Props> = ({ open, title, message }) => {
  return (
    <Modal
      isOpen={open}
      style={{
        content: modalContentStyle,
        overlay: modalOverlayStyle,
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold leading-loose">{title}</h1>
        <p>{message}</p>
      </div>
    </Modal>
  )
}
