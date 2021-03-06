import React, { useContext } from "react"
import Button, { LinkButton } from "./common/Button"
import IconButton from "./common/IconButton"
import { LayoutContext } from "../context/LayoutContext"
import MenuIcon from "./icons/MenuIcon"
import { buildAuthUrl } from "~/helpers"

const authUrl = buildAuthUrl()

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
      <div>
        <LinkButton
          href={authUrl}
          label="Login"
          additionalClassnames="w-36 mx-2"
        />
        <Button
          onClick={layoutContext.toggleCreatePanel}
          label={buttonText}
          additionalClassnames="w-36"
        />
      </div>
    </div>
  )
}

export default Header
