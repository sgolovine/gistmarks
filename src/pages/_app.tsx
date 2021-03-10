import React from "react"
import { AppProps } from "next/app"
import {
  LayoutContextProvider,
  AuthContextProvider,
  CollectionsContextProvider,
  BookmarkContextProvider,
  EditorStateContextProvider,
} from "~/context"
import { Provider } from "react-redux"
import { store } from "~/redux"

import "~/styles/tailwind.css"
import "~/styles/button.css"
import "~/styles/form.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <LayoutContextProvider>
        <CollectionsContextProvider>
          <BookmarkContextProvider>
            <EditorStateContextProvider>
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </EditorStateContextProvider>
          </BookmarkContextProvider>
        </CollectionsContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
  )
}

export default App
