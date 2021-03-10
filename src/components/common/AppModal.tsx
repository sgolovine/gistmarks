import React, { ReactNode } from "react"
import Modal from "react-modal"
import CloseIcon from "../icons/CloseIcon"

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const modalContentStyle: React.CSSProperties = {
  maxWidth: "700px",
  marginLeft: "auto",
  marginRight: "auto",
  height: "auto",
}

const modalOverlayStyle: React.CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.75)",
}

const AppModal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        content: modalContentStyle,
        overlay: modalOverlayStyle,
      }}
    >
      <div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold">New Collection</p>
          <button onClick={onClose}>
            <CloseIcon size={32} />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  )
}

export default AppModal
