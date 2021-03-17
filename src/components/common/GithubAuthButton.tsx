import React, { useContext } from "react"
import { AuthContext } from "~/context"
import GithubIcon from "../icons/Github"

export const GithubAuthButton: React.FC = () => {
  const authContext = useContext(AuthContext)

  const buttonText = authContext.isLoggedIn ? "Log out" : "Log in with Github"

  const handleAuth = () =>
    authContext.isLoggedIn ? authContext.logout() : authContext.login()

  return (
    <button
      className="border rounded shadow px-2 py-1 mx-2 bg-github"
      onClick={handleAuth}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="h-6 w-6 mx-2">
          <GithubIcon fill="#fff" />
        </div>
        <p className="text-gray-200 text-sm font-bold">{buttonText}</p>
      </div>
    </button>
  )
}
