import React, { useContext } from "react"
import Button from "./common/Button"
import IconButton from "./common/IconButton"
import { LayoutContext } from "./context/layoutContext"
import MenuIcon from "./icons/MenuIcon"

const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const buttonText = layoutContext.createPanelOpen
    ? "Close Window"
    : "Create Bookmark"
  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <IconButton onClick={layoutContext.toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <p className="text-lg font-bold">GistMarks</p>
      </div>
      <Button
        onClick={layoutContext.toggleCreatePanel}
        label={buttonText}
        additionalClassnames="w-36"
      />
    </div>
  )
}

export default Header
