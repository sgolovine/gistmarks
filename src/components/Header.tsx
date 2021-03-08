import React, { useContext } from "react"
import Button, { LinkButton } from "./common/Button"
import IconButton from "./common/IconButton"
import MenuIcon from "./icons/MenuIcon"
import { buildAuthUrl } from "~/helpers"
import { AuthContext, LayoutContext } from "~/context"
import { useRouter } from "next/router"

const authUrl = buildAuthUrl()

const Header: React.FC = () => {
  const router = useRouter()
  const layoutContext = useContext(LayoutContext)
  const authContext = useContext(AuthContext)
  const buttonText = layoutContext.createPanelOpen
    ? "Close Window"
    : "Create Bookmark"

  const handleAuth = () => {
    if (authContext.isLoggedIn) {
      authContext.logout()
    } else {
      router.push(authUrl)
    }
  }

  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <IconButton onClick={layoutContext.toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <p className="text-lg font-bold">GistMarks</p>
      </div>
      <div>
        <Button
          onClick={handleAuth}
          label={authContext.isLoggedIn ? "Log Out" : "Log In"}
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
