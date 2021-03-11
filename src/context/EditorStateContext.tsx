import { stringify } from "query-string"
import React, { useState, useEffect, createContext } from "react"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"
import { ContextProviderProps } from "~/model/Context"

type Fields = "name" | "href" | "category" | "description"

interface EditorStateContext {
  guid: string | null
  name: string
  href: string
  category: string
  description: string
  setFields: ({
    guid,
    name,
    href,
    category,
    description,
  }: {
    guid: string
    name: string
    href: string
    category: string
    description: string
  }) => void
}

export const EditorStateContext = createContext<EditorStateContext>({
  guid: null,
  name: "",
  href: "",
  category: "",
  description: "",
  setFields: () => null,
})

export const EditorStateContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<{
    guid: string | null
    name: string
    href: string
    category: string
    description: string
  }>({
    guid: null,
    name: "",
    href: "",
    category: "",
    description: "",
  })

  const setFields = ({
    guid,
    name,
    href,
    category,
    description,
  }: {
    guid: string
    name: string
    href: string
    category: string
    description: string
  }) => {
    setState({
      guid,
      name,
      href,
      category,
      description,
    })
  }

  const contextValue: EditorStateContext = {
    guid: state.guid,
    name: state.name,
    href: state.href,
    category: state.category,
    description: state.description,
    setFields,
  }

  return (
    <EditorStateContext.Provider value={contextValue}>
      {children}
      {dev && (
        <ContextDevTool
          context={EditorStateContext}
          id="editorStateContext"
          displayName="Editor State Context"
        />
      )}
    </EditorStateContext.Provider>
  )
}
