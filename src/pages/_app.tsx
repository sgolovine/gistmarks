import React from "react"
import { AppProps } from "next/app"
import "~/styles/tailwind.css"
import LayoutContextProvider from "~/components/context/layoutContext"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LayoutContextProvider>
      <Component {...pageProps} />
    </LayoutContextProvider>
  )
}

export default App
