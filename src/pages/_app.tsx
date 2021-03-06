import React from "react"
import { AppProps } from "next/app"
import { LayoutContextProvider, AuthContextProvider } from "~/context"

import "~/styles/tailwind.css"
import "~/styles/button.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <LayoutContextProvider>
        <Component {...pageProps} />
      </LayoutContextProvider>
    </AuthContextProvider>
  )
}

export default App
