import React from "react"
import { AppProps } from "next/app"
import {
  LayoutContextProvider,
  AuthContextProvider,
  CollectionsContextProvider,
  BookmarkContextProvider,
  EditorStateContextProvider,
} from "~/context"

import "~/styles/tailwind.css"
import "~/styles/button.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <LayoutContextProvider>
        <CollectionsContextProvider>
          <BookmarkContextProvider>
            <EditorStateContextProvider>
              <Component {...pageProps} />
            </EditorStateContextProvider>
          </BookmarkContextProvider>
        </CollectionsContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
  )
}

export default App
